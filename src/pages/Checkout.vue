<script>
import { onMounted, reactive } from "vue";
import CartCard from "../components/CartCard.vue";
export default {
  name: "Checkout",
  components: {
    CartCard,
    // "font-awesome-icon": FontAwesomeIcon,
  },
  setup() {
    const cart = reactive([]);

    const loadCartFromLocalStorage = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      if (storedCart) {
        cart.push(...storedCart);
      }
    };

    onMounted(() => {
      loadCartFromLocalStorage();
    });

    return { cart, loadCartFromLocalStorage };
  },
};
</script>

<template>
  <div class="w-full flex flex-row items-start mt-10">
    <div class="flex-1 flex flex-col items-center h-full gap-10 overflow-y-scroll">
      <div class="w-[85%] max-h-[35vh] bg-white items-center rounded-lg p-5 shadow-lg">
        <h1
          class="tracking-[0.5rem] lg:text-[22px] md:text-[20px] sm:text-[16px] ss:text-[14px] xs:text-[12px] mb-5"
        >
          SHIPPING ADDRESS
        </h1>
        <p
          class="font-myweight lg:text-[14px] md:text-[12px] sm:text-[11px] ss:text-[10px] xs:text-[10px]"
        >
          John Maker<br />
          123 Palace Ground Street<br />
          Vermont, California<br />
          United States of America
        </p>
      </div>
      <div class="w-[85%] max-h-[35vh] bg-white items-center rounded-lg p-5 shadow-lg">
        <h1
          class="tracking-[0.5rem] lg:text-[22px] md:text-[20px] sm:text-[16px] ss:text-[14px] xs:text-[12px] mb-5"
        >
          PAYMENT METHOD
        </h1>
        <p
          class="font-myweight lg:text-[14px] md:text-[12px] sm:text-[11px] ss:text-[10px] xs:text-[10px]"
        >
          Mastercard ending in 1252<br />
          $ 53.21 gift card balance<br />
          Billing address same as Shipping Address Change Billing Address
        </p>
      </div>
      <div class="w-[85%] bg-white items-center rounded-lg pt-5 shadow-lg">
        <h1
          class="tracking-[0.5rem] lg:text-[22px] md:text-[20px] sm:text-[16px] ss:text-[14px] xs:text-[12px] mb-5 px-5"
        >
          REVIEW YOUR BAG
        </h1>
        <div v-if="cart.length > 0">
          <CartCard v-for="item in cart" :key="item.id" :item="item" :cart="cart" />
        </div>
        <div v-else class="text-center text-[16px] text-[#4f4e4e] tracking-[0.2rem]">
          No Item Within your cart...
        </div>
      </div>
    </div>
    <div class="flex-2 flex flex-col items-start h-full mr-5">
      <div
        class="min-h-[28vh] max-w-[45vw] bg-white items-start rounded-lg p-5 shadow-lg"
      >
        <h1
          class="lg:text-[22px] md:text-[20px] sm:text-[16px] ss:text-[14px] xs:text-[12px] text-thin mb-5"
        >
          Order Summary
        </h1>
        <div
          class="flex flex-col lg:text-[14px] md:text-[14px] sm:text-[12px] ss:text-[10px] xs:text-[10px] text-[#525252]"
        >
          <div class="flex flex-row justify-between gap-[1rem]">
            <h1>Items:</h1>
            <h1>$ 898.08</h1>
          </div>
          <div class="flex flex-row justify-between gap-[1rem] pt-1">
            <h1>Shipping:</h1>
            <h1>$ 8.18</h1>
          </div>
          <div class="flex flex-row justify-between gap-[1rem] pt-1">
            <h1>Estimated GST:</h1>
            <h1>$ 170.08</h1>
          </div>
          <div class="flex flex-row justify-between gap-[1rem] pt-1">
            <h1>Gift Card:</h1>
            <h1>$ 0.00</h1>
          </div>
          <hr class="mt-2" />
          <div
            class="flex flex-row justify-between gap-[1rem] pt-1 lg:text-[16px] md:text-[16px] sm:text-[14px] ss:text-[11px] xs:text-[11px] font-semibold text-red-600"
          >
            <h1>Order Total:</h1>
            <h1>$ 6098.78</h1>
          </div>
          <hr class="mt-2" />
          <button
            class="lg:w-[10rem] md:w-[10rem] sm:w-[8rem] ss:w-[6rem] xs:w-[6rem] bg-black text-white h-10 rounded-lg mt-5"
          >
            Place your order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
