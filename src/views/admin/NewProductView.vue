<script setup>
    import Link from '@/components/Link.vue'
    import useImage from '@/composables/useImage'
    import { useProductsStore } from '@/stores/products'
    import { reactive } from 'vue'
    import { useRouter } from 'vue-router'

    const { onFileChange, url, isImageUploaded } = useImage()
    const products = useProductsStore()
    const router = useRouter()
    const formData = reactive({
        name: '',
        category: '',
        price: '',
        availability: '',
        image: ''
    })

    const submitHandler = async (data) => {
        const { image, ...values} = data
        try {
            await products.createProduct({
                ...values,
                image: url.value
            })
            router.push({name: 'products'})
        } catch (error) {
            console.log(error)
        }
    }
</script>

<template>
    <div class="p-2 pt-10 lg:p-0">
        <Link to="products">
            Volver
        </Link>
        <h1 class="text-4xl font-black my-5">Nuevo Producto</h1>
        <div class="flex justify-center bg-white shadow">
            <div class="mt-2 lg:mt-10 p-2 lg:p-10 w-full 2xl:w-2/4">
                <FormKit 
                    type="form"
                    submit-label="Agregar Producto"
                    incomplete-message="No se pudo agregar el producto"
                    @submit="submitHandler"
                >
                    <FormKit 
                        type="text"
                        label="Nombre"
                        name="name"
                        placeholder="Nombre de Producto *"
                        validation="required"
                        :validation-messages="{required: 'El Nombre del Producto es Obligatorio'}"
                        v-model.trim="formData.name"
                    />
                    <FormKit 
                        type="file"
                        label="Imagen Producto"
                        name="image"
                        validation="required"
                        :validation-messages="{required: 'La imagen es obligatoria'}"
                        accept=".jpg"
                        @change="onFileChange"
                        v-model.trim="formData.image"
                    />
                    <div v-if="isImageUploaded">
                        <p class="font-black">Imagen Producto: </p>
                        <img 
                            :src="url" 
                            alt="Nueva imagen producto"
                            class="w-32"    
                        >
                    </div>
                    <FormKit 
                        type="select"
                        label="Categoría"
                        name="category"
                        validation="required"
                        :validation-messages="{required: 'La Categoría es Obligatoria'}"
                        :options="products.categoryOptions"
                        v-model.number="formData.category"
                    />
                    <FormKit 
                        type="number"
                        label="Precio"
                        name="price"
                        placeholder="Precio de Producto *"
                        validation="required"
                        :validation-messages="{required: 'El precio es obligatoria'}"
                        min='1'
                        step="1"
                        v-model.number="formData.price"
                    />
                    <FormKit 
                        type="number"
                        label="Disponibles"
                        name="availability"
                        placeholder="Productos Disponibles *"
                        validation="required"
                        :validation-messages="{required: 'La cantidad disponible es obligatoria'}"
                        step="1"
                        min="1"
                        v-model.number="formData.availability"
                    />
                </FormKit>
            </div>
        </div>
    </div>
</template>
