<script setup>
    import { useCouponStore } from '@/stores/coupons'

    const couponStore = useCouponStore()
</script>

<template>
    <!-- border-t border-gray-300 -->
    <p class="mt-5 py-5 font-bold">¿Tienes un cupón de descuento?</p>
    <div class="flex">
        <input 
            type="text"
            placeholder="Ingresa un cupón"
            class="p-2 bg-white border-gray-300 w-full rounded"
            v-model="couponStore.couponInput"
        />
        <button
            type="button"
            class="p-3 bg-green-400 font-bold rounded disabled:opacity-30"
            @click="couponStore.applyCoupon"
            :disabled="couponStore.isValidCoupon"
        >
            Canjear
        </button>
    </div>
    <p 
        v-if="couponStore.couponValidationMessage"
        class="font-bold text-red-500 p-1"    
    >{{ couponStore.couponValidationMessage }}</p>

</template>
