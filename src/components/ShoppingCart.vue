<script setup>
    import { useCartStore } from '@/stores/cart'
    import { useCouponStore } from '@/stores/coupons'
    import ShoppingCartItem from '@/components/ShoppingCartItem.vue'
    import Amount from '@/components/Amount.vue'
    import { formatCurrency } from '@/helpers'
    import CouponForm from '@/components/CouponForm.vue'

    const cart = useCartStore()
    const coupon = useCouponStore()
</script>

<template>
    <p 
        v-if="cart.isEmpty"
        class="text-4xl text-center text-gray-900"    
    >El carrito esta vacio</p>
    <div v-else>
        <p class="text-4xl font-bold text-gray-900">Resumen de Venta</p>
        <ul
            role="list"
            class="mt-6 divide-y divide-gray-300 border-b border-gray-300"
        >
            <ShoppingCartItem 
                v-for="item in cart.items"
                :key="item.id"
                :item="item"
            />
        </ul>
        <dl class="space-y-6 border-b border-gray-300 py-6 text-sm font-medium text-gray-500">
            <Amount>
                <template #label>Subtotal:</template>
                {{ formatCurrency(cart.subtotal) }}
            </Amount>
            <Amount>
                <template #label>Impuestos:</template>
                {{ formatCurrency(cart.taxes) }}
            </Amount>
            <Amount v-if="coupon.isValidCoupon">
                <template #label>Descuento:</template>
                {{ formatCurrency(coupon.discount) }}
            </Amount>
            <Amount>
                <template #label>Total a pagar:</template>
                {{ formatCurrency(cart.total) }}
            </Amount>
        </dl>
        <CouponForm />
        <button 
            type="button"
            class="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3"
            @click="cart.checkout"
        >
            Confirmar compra
        </button>
    </div>
</template>