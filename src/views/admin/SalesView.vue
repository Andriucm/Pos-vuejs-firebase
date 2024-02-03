<script setup>
import { ref } from 'vue';
import Calendario from 'vue-tailwind-datepicker';
import { useSalesStore } from '@/stores/sales';
import salesDetails from '@/components/SalesDetails.vue';
import { formatCurrency } from '@/helpers/currency';

const sales = useSalesStore();

const formatter = ref({
    date: 'DD/MM/YYYY',
    month: 'MMMM',
})
</script>
 
<template>
    <h1 class="text-4xl font-black my-10">Resumen de Ventas</h1>
    <div class="md:flex md:items-start gap-5 ">
        <div class="md:w-1/2 lg:w-1/3  flex justify-center  p-5">
            <Calendario v-model="sales.date" :formatter="formatter" i18n="es" as-single no-input />
        </div>
        <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p5 pb-32">
            <p v-if="sales.isDateSelected" class="text-center text-lg">Ventas de la Fecha: <span class="font-black">{{
                sales.date }}</span></p>
            <p v-else class="text-center text-lg"> Selecciona una Fecha </p>

            <div v-if="sales.salesCollection.length" class="space-y-5">
                <p class="text-right text-2xl ">Total del dia
                    <span class="font-black">{{ formatCurrency(sales.totalSalesOfDay) }}</span>
                </p>
                <salesDetails :key="sale.id" v-for="sale in sales.salesCollection" :sale="sale" />
            </div>
            <p v-else-if="sales.noSales" class="text-lg text-center">No hay ventas
                en este día</p>

        </div>
    </div>
</template>
