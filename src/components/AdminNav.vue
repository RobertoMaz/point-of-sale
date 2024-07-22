<script setup>
    import Link from './Link.vue'
    import Logo from './Logo.vue'
    import { RouterLink } from 'vue-router'
</script>

<template>
    <header class="px-5 lg:px-10 py-5 bg-gray-700 
        flex flex-col lg:flex-row gap-5 items-center lg:justify-between 
        absolute top-0 w-full z-10">
        <div>
            <Logo class="flex lg:justify-start justify-center"/>
        </div>
        <nav class="pt-1 space-x-2 lg:space-x-0">
            <RouterLink
                :to="{name: 'products'}"
                class="rounded text-white font-bold p-2"
            >
                Productos
            </RouterLink>
            <RouterLink
                :to="{name: 'sales'}"
                class="rounded text-white font-bold p-2"
            >
                Ventas
            </RouterLink>
            <Link
                to="shop"
            >
                Ir a Tienda
            </Link>   
        </nav>
    </header>
</template>