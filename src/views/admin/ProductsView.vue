<script setup>
   import Link from '@/components/Link.vue'
   import { useProductsStore } from '@/stores/products'
   import Product from '@/components/Product.vue'

   const products = useProductsStore()
</script>
<template>
    <div class="p-2 pt-10 lg:p-0">
        <Link to="new-product">
            Nuevo Producto
        </Link>
        <h1 class="text-4xl font-black my-4 lg:my-5">Productos</h1>
        <p v-if="products.noResults">No hay resultados</p>
        <ul
            role="list"
            class="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-2 lg:gap-5"
        >
            <Product 
                v-for="product in products.productsCollection"
                :key="product.id"
                :product="product"
            />
        </ul>
    </div>
</template>
