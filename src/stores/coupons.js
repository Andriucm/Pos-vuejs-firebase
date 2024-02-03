import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";
import { useCartStore } from "./cart";

export const useCouponStore = defineStore("coupon", () => {
  const cartStore = useCartStore();

  const couponInput = ref("");
  const couponValidationMessage = ref("");
  const discountPercentage = ref(0);
  const discount = ref(0);

  const VALID_COUPONS = [
    { name: "10DESCUENTO", discount: 0.1 },
    { name: "20DESCUENTO", discount: 0.2 },
  ];

  watch(discountPercentage, () => {
    discount.value = (cartStore.total * discountPercentage.value).toFixed(2);
  });

  function applyCoupon() {
    if (VALID_COUPONS.some((coupon) => coupon.name === couponInput.value)) {
      couponValidationMessage.value = "Aplicando...";
      setTimeout(() => {
        discountPercentage.value = VALID_COUPONS.find(
          (coupon) => coupon.name === couponInput.value
        ).discount;
        couponValidationMessage.value = "¡Cupón aplicado!";
      }, 2000);
    } else {
      couponValidationMessage.value = "Cupón no válido";
    }
    setTimeout(() => {
      couponValidationMessage.value = "";
    }, 6000);
    }
    function $reset() {
      couponInput.value = "";
      couponValidationMessage.value = "";
      discountPercentage.value = 0;
      discount.value = 0;
    }

    //*Composables

  const isValidCoupon = computed(() => discountPercentage.value > 0);

  return {
    couponInput,
    couponValidationMessage,
    discount,
    isValidCoupon,
    applyCoupon,
    $reset,
  };
});
