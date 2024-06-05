<script setup>
    import { formatCurrency } from '@/helpers'
    import { useCartStore } from '@/stores/cart'
    import DeleteButton from './DeleteButton.vue'

    const cart = useCartStore()

    defineProps({
        item: {
            type: Object
        }
    })
</script>

<template>
    <li class="flex space-x-6 py-6">
        <img
            class="h-24 w-24 flex-none rounded-md"
            :src="item.image"
            :alt="'imagen de ' + item.name"
        >
        <div class="flex-auto space-y-2">
            <h3 class="text-gray-900">{{ item.name }}</h3>
            <p>{{ formatCurrency(item.price) }}</p>
            <select
                class="w-20 text-center p-2 rounded-lg bg-white"
                @change="cart.updateQuantity(item.id, +$event.target.value)"
                :value="item.quantity"
            >
                <option 
                    v-for="n in cart.checkProductAvailability(item)"
                    :value="n"
                >{{ n }}</option>
            </select>
        </div>
        <div>
            <button 
                type="button"
                @click="cart.removeItem(item.id)"
            >
                <DeleteButton />
            </button>
        </div>
    </li>
</template>
