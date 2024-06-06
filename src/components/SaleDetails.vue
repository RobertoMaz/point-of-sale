<script setup>
    import { formatCurrency } from '@/helpers'
    import Amount from './Amount.vue'

    defineProps({
        sale: {
            type: Object
        }
    })
</script>

<template>
    <div class="border-t border-gray-300 space-y-6 py-6">
        <h2 class="text-2xl font-black text-center">Detalle Venta:</h2>
        <p class="text-xl font-black text-gray-500">Productos vendidos</p>
        <ul
            role="list"
            class="mt-6 text-sm font-medium text-gray-500 grid grid-cols-1 md:grid-cols-2"
        >
            <li
                v-for="item in sale.items"
                class="flex space-x-6 py-6"
            >            
                <img  
                    :src="item.image"
                    :alt="`imagen de ${item.name}`"
                    class="w-24 h-24 flex-none rounded-lg"
                >
                <div class="space-y-2 flex-auto">
                    <h3 class="text-gray-900">{{ item.name }}</h3>
                    <p class="font-extrabold">{{ formatCurrency(item.price) }}</p>
                    <p>Cantidad: {{ item.quantity}}</p>
                </div>
            </li>
        </ul>
        <dl class="space-y-6 border-b border-gray-300 py-6 text-sm font-medium text-gray-500">
            <Amount>
                <template #label>Subtotal:</template>
                {{ formatCurrency(sale.subtotal) }}
            </Amount>
            <Amount>
                <template #label>Impuestos:</template>
                {{ formatCurrency(sale.taxes) }}
            </Amount>
            <Amount v-if="sale.discount > 0" class="bg-green-200 p-2">
                <template #label>Descuento:</template>
                -{{ formatCurrency(sale.discount) }}
            </Amount>
            <Amount>
                <template #label>Total Pagado:</template>
                {{ formatCurrency(sale.total) }}
            </Amount>
        </dl>
    </div>
</template>
