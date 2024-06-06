import { defineStore } from "pinia"
import { computed, ref, watch } from "vue"
import { useCartStore } from "./cart"

export const useCouponStore = defineStore('coupon', () => {

    const couponInput = ref('')
    const couponValidationMessage = ref('')
    const discountPercentage = ref(0)
    const discount = ref(0)

    const cart = useCartStore()

    const VALID_COUPONS = [
        {name: '10DESCUENTO', discount: 10},
        {name: '15DESCUENTO', discount: 15},
        {name: '20DESCUENTO', discount: 20}
    ]

    watch(discountPercentage, () => {      
        discount.value = (cart.total * discountPercentage.value / 100).toFixed(2)
    })

    watch(() => cart.total, () => {
        discount.value = (cart.total * discountPercentage.value / 100).toFixed(2)
    })

    function applyCoupon() {
        if(VALID_COUPONS.some(coupon => coupon.name === couponInput.value)){
            discountPercentage.value = VALID_COUPONS.find(coupon => coupon.name === couponInput.value).discount
        } else {
            couponValidationMessage.value =  'El cupón no existe'
        }

        setTimeout(() => {
            couponValidationMessage.value = ''
        }, 5000)
    }

    const isValidCoupon = computed(() => discountPercentage.value > 0)

    function $reset(){
        couponInput.value = ''
        couponValidationMessage.value = ''
        discountPercentage.value = 0
        discount.value = 0
    }

    return {
        couponInput,
        couponValidationMessage,
        discount,
        isValidCoupon,
        applyCoupon,
        $reset
    }
})