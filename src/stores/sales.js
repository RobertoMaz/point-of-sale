import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { query, collection, where  } from "firebase/firestore"
import { useFirestore, useCollection } from "vuefire"

export const useSalesStore = defineStore('sales', () => {

    const date = ref('')

    const db = useFirestore()

    const salesSource = computed(() => {
        if(date.value) {
            const q = query(
                collection(db, 'sales'),
                where('date', '==', date.value)
            )

            return q
        }
    })

    const salesCollection = useCollection(salesSource)

    const isDateSelected = computed(() => date.value)

    return {
        date,
        isDateSelected,
        salesCollection
    }
})