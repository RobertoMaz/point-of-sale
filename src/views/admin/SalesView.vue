<script setup>
    import VueTailwindDatePicker from 'vue-tailwind-datepicker'
    import { ref } from 'vue'
    import { useSalesStore } from '@/stores/sales'
    import SaleDetails from '@/components/SaleDetails.vue'
    import { formatCurrency } from '@/helpers'

    const sales = useSalesStore()
    const formatter = ref({
        date: 'DD/MM/YYYY',
        month: 'MMMM'
    })
</script>

<template>
    <h1 class="pt-4 my-5 lg:my-0 lg:mb-4 lg:pt-0 text-3xl text-center lg:text-start lg:text-4xl font-black">Resumen de Ventas</h1>
    <div class="md:flex md:items-start gap-5">
        <div class="md:w-1/2 lg:w-\1/3 bg-white flex flex-col justify-center p-5">
            <p class="pl-1 text-sm">selecciona una fecha *</p>
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
            <div v-if="sales.salesCollection.length > 0" class="space-y-5">
                <SaleDetails 
                    v-for="sale in sales.salesCollection"
                    :key="sale.id"
                    :sale="sale"
                />
                <p class="text-right text-2xl">
                    Total del dia: <span class="font-black">{{ formatCurrency(sales.totalSalesOfDay) }}</span>
                </p>
            </div>
            <div v-else-if="sales.noSales">
                <p class="text-center text-lg">No hubo ventas</p>
            </div>
        </div>
    </div>
</template>