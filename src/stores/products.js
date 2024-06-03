import { defineStore } from "pinia"
import { computed } from "vue"
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire"
import { collection, addDoc, where, query, limit, orderBy, updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore"
import { ref as storageRef, deleteObject } from "firebase/storage"

export const useProductsStore = defineStore('products', () => {

    const db = useFirestore()
    const storage = useFirebaseStorage()

    const categories = [
        {id: 1, name: 'Buzos' },
        {id: 2, name: 'Zapatillas' },
        {id: 3, name: 'Lentes' }
    ]

    const q = query(
        collection(db, 'products')    
    )
    const productsCollection = useCollection(q)


    async function createProduct(product){
        await addDoc(collection(db, 'products'), product)
    }

    async function deleteProduct(id){
        if(confirm('¿Deseas Eliminar el Producto?')){
            const docRef = doc(db, 'products', id)
            const docSnap = await getDoc(docRef)
            const {image} = docSnap.data()
            const imageRef = storageRef(storage, image)

            await Promise.all([
                deleteObject(imageRef),
                deleteDoc(docRef)

            ])
        }
    }

    async function updateProduct(docRef, product){
        const { image, url, ...values } = product

        if(image.length){
            await updateDoc(docRef, {
                ...values,
                image: url.value
            })            
            
        } else {
            await updateDoc(docRef, values)            
        }

    }

    const categoryOptions = computed(() => {
        const options = [
            {label: 'Seleccione', value: '', attrs: {disabled: true}},
            ...categories.map(category => ({label: category.name, value: category.id}))
        ]
        return options
    })

    const noResults = computed(() => productsCollection.value.length === 0)

    return {
        createProduct,
        updateProduct,
        deleteProduct,
        productsCollection,
        categoryOptions,
        noResults,

    }
})