<script setup>
    import VueTailwindDatePicker from 'vue-tailwind-datepicker'
    import { ref } from 'vue'
    import { useSalesStore } from '@/stores/sales'
    import SaleDetails from '@/components/SaleDetails.vue'

    const sales = useSalesStore()
    const formatter = ref({
        date: 'DD/MM/YYYY',
        month: 'MMMM'
    })
</script>

<template>
    <h1 class="text-4xl font-black my-5">Resumen de Ventas</h1>
    <div class="md:flex md:items-start gap-5">
        <div class="md:w-1/2 lg:w-\1/3 bg-white flex justify-center p-5">
            <VueTailwindDatePicker 
                i18n="es-mx"
                as-single
                no-input
                v-model="sales.date"
                :formatter="formatter"
            />
        </div>
        <div 
            class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-32">
            <p
                v-if="sales.isDateSelected"
                class="text-center text-lg"
            >Ventas de la fecha: <span class="font-black">{{ sales.date }}</span></p>
            <p
                v-else
                class="text-center text-lg"
            >No hay fecha seleccionada</p>
            <div class="space-y-5">
                <SaleDetails 
                    v-for="sale in sales.salesCollection"
                    :key="sale.id"
                    :sale="sale"
                />
            </div>
        </div>
    </div>
</template>