import { defineStore } from "pinia"
import { ref, computed, watch } from "vue"

export const useCartStore = defineStore('cart', () => {

    const items = ref([])
    const subtotal = ref(0)
    const taxes = ref(0)


    const MAX_PRODUCTS = 5
    const TAX_RATE = 21


    
    function addItem(item){
        items.value.push({...item, quantity: 1, id: item.id})
        subtotal.value = item.price + subtotal.value
        taxes.value = subtotal.value * TAX_RATE / 100

    }
    

    function updateQuantity(id, quantity){
        items.value = items.value.map(item => item.id === id ? {...item, quantity}: item)
    }

    const isEmpty = computed(() => items.value.length === 0)

    const checkProductAvailability = computed(() => {
        return (product) => product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS 
    })

    watch(items, () => {
        subtotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0)
        taxes.value = subtotal.value * TAX_RATE / 100
    })



    return {
        addItem,
        isEmpty,
        items,
        checkProductAvailability,
        updateQuantity,
        subtotal,
        taxes

    }
})