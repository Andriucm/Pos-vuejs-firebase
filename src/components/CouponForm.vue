<script setup>
import { useCouponStore } from '@/stores/coupons';
 const store = useCouponStore();
</script>
 
<template>
<p class="mt-5 font-bold py-5 border-t border-gray-200">¿Tienes un Cupón?</p>
<div class="flex">
    <input v-model="store.couponInput" type="text" placeholder="Ingresa un cupón" class="bg-white border-gray-300 w-full">
    <button :disabled="store.isValidCoupon" @click="store.applyCoupon" type="button" class="p-3 bg-green-400 font-bold disabled:opacity-30">Canjear</button>
</div>
<p class="py-2 text-center text-sm font-extrabold" >{{store.couponValidationMessage }}</p>
</template>
