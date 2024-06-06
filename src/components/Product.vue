<script setup>
    import { formatCurrency } from '@/helpers'
    import EditButton from '@/components/EditButton.vue'
    import DeleteButton from '@/components/DeleteButton.vue'
    import { useProductsStore } from '@/stores/products'
    import { computed } from 'vue'

    const products = useProductsStore()

    const props = defineProps({
        product: {
            type: Object
        }
    })

    const isProductNotAvailable = computed(() => props.product.availability === 0)
</script>

<template>
    <li 
        :class="{'opacity-30': isProductNotAvailable}"
        class="flex items-center space-x-6 border border-gray-200 p-6 bg-white shadow"
    >
        <img
            :src="product.image"
            :alt="`imagen ${product.name}`"
            class="h-24 w-24"
        >
        <div class="space-y-2 flex-auto">
            <h3 class="text-gray-900">{{ product.name }}</h3>
            <p class="font-extrabold">{{ formatCurrency(product.price) }}</p>
            <p>{{ product.availability }} en Stock</p>
        </div>
        <div>
            <RouterLink
                :to="{name: 'edit-product', params: {id: product.id}}"
            >
                <EditButton />
            </RouterLink>
            <button
                type="button"
                @click="products.deleteProduct(product.id)"
            >
                <DeleteButton />
            </button>
        </div>
    </li>
</template>