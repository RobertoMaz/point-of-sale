<script setup>
    import { formatCurrency } from '@/helpers'
    import PlusButton from './PlusButton.vue'
    import { useCartStore } from '@/stores/cart'

    defineProps({
        product: {
            type: Object
        }
    })

    const cart = useCartStore()
</script>

<template>
    <div
        class="rounded bg-white shadow relative"
    >
        <img 
            :src="product.image"
            :alt="'Imagen de ' + product.name"
        >
        <div class="p-2 lg:p-3 lg:space-y-2">
            <h3 class="text-xl font-black text-gray-500">{{ product.name }}</h3>
            <p class="text-gray-500 font-bold">Stock: {{ product.availability }}</p>
            <p class="text-gray-900 text-xl font-extrabold">{{ formatCurrency(product.price) }}</p>
        </div>
        <button
            type="button"
            class="absolute top-2 right-2 lg:top-5 lg:right-5"
            @click="cart.addItem(product)"
        >
            <PlusButton />
        </button>
    </div>
</template>
