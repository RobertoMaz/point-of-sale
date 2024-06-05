import { defineStore } from "pinia"
import { ref, computed, watchEffect } from "vue"
import { useCouponStore } from "./coupons"
import { collection, addDoc, runTransaction, doc } from "firebase/firestore"
import { useFirestore } from "vuefire"
import { getCurrentDate } from "@/helpers"

export const useCartStore = defineStore('cart', () => {

    const items = ref([])
    const subtotal = ref(0)
    const taxes = ref(0)
    const total = ref(0)

    const coupon = useCouponStore()
    const db = useFirestore()


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

    function removeItem(id) {
        items.value = items.value.filter(item => item.id !== id)
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

    async function checkout() {
        try {
            await addDoc(collection(db, 'sales'), {
                items: items.value.map(item => {
                    const { availability, category, ...data} = item
                    return data
                }),
                subtotal: subtotal.value,
                taxes: taxes.value,
                discount: coupon.discount,
                total: total.value,
                date: getCurrentDate()
            })


            // Reduce the available quantity
            items.value.forEach( async (item) => {
                const productRef = doc(db, 'products', item.id)
                await runTransaction(db, async (transaction) => {
                    const currentProduct = await transaction.get(productRef)
                    const availability = currentProduct.data().availability - item.quantity
                    transaction.update(productRef, { availability })
                })
            })

            // Reset state
            $reset()

        } catch (error) {
            console.log(error)
        }
    }

    watchEffect(() => {
        subtotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0)
        taxes.value = Number((subtotal.value * TAX_RATE / 100).toFixed(2))
        total.value = (subtotal.value + taxes.value) - coupon.discount
    })

    function $reset(){
        items.value = []
        subtotal.value = 0
        taxes.value = 0
        total.value = 0 
        coupon.$reset() 
    }



    return {
        isEmpty,
        items,
        checkProductAvailability,
        subtotal,
        taxes,
        total,
        checkout,
        addItem,
        updateQuantity,
        removeItem

    }
})