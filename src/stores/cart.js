import { defineStore } from "pinia"
import { ref, computed, watchEffect } from "vue"

export const useCartStore = defineStore('cart', () => {

    const items = ref([])
    const subtotal = ref(0)
    const taxes = ref(0)
    const total = ref(0)


    const MAX_PRODUCTS = 5
    const TAX_RATE = 21


    
    function addItem(item){
        const index = isItemInCart(item.id)
        
        if(index >= 0){
            if(isProductAvailable(item, index)) {
                items.value[index].quantity++
            } else {
                alert('Has alcanzado el limite')
            }
            
        } else {
            items.value.push({...item, quantity: 1, id: item.id})
        }
    }
    

    function updateQuantity(id, quantity){
        items.value = items.value.map(item => item.id === id ? {...item, quantity}: item)
    }

    const isEmpty = computed(() => items.value.length === 0)

    const isProductAvailable = (item, index) => {
        return items.value[index].quantity < item.availability && items.value[index].quantity < MAX_PRODUCTS
    }

    const isItemInCart = (id) => items.value.findIndex( item => item.id === id)

    const checkProductAvailability = computed(() => {
        return (product) => product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS 
    })

    watchEffect(() => {
        subtotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0)
        taxes.value = subtotal.value * TAX_RATE / 100
        total.value = subtotal.value + taxes.value
    })



    return {
        addItem,
        isEmpty,
        items,
        checkProductAvailability,
        updateQuantity,
        subtotal,
        taxes,
        total

    }
})