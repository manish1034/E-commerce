<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { computed, onMounted, reactive } from "vue";
import CartCard from "../components/CartCard.vue";
library.add(faBagShopping);
export default {
  name: "Cart",
  components: {
    CartCard,
    "font-awesome-icon": FontAwesomeIcon,
  },
  setup() {
    const cart = reactive([]);

    const loadCartFromLocalStorage = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      if (storedCart) {
        cart.push(...storedCart);
      }
    };

    const totalPrice = computed(() => {
      const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
      return Math.round(total * 100) / 100;
    });

    onMounted(() => {
      loadCartFromLocalStorage();
    });

    return { cart, loadCartFromLocalStorage, totalPrice };
  },
};
</script>

<template>
  <div
    class="w-full h-full flex flex-row lg:gap-10 md:gap-5 sm:gap-14 ss:gap-10 xs:gap-14 items-start"
  >
    <div
      class="flex flex-col gap-5 lg:w-[70%] md:w-[70%] ss:w-[60%] xs:w-[58%] h-[92vh] border-r-[1px] border-[#bab8b8] mt-8"
    >
      <div class="flex flex-col items-center gap-2">
        <h1
          class="text-[#6b6b6b] text-center lg:text-[32px] md:text-[28px] sm:text-[24px] ss:text-[20px] xs:text-[18px]"
        >
          Check Your Bag Items
        </h1>
      </div>
      <div
        v-if="cart.length > 0"
        class="flex flex-row justify-between gap-2 flex-wrap lg:px-14 md:px-14 sm:px-14 ss:px-10 xs:px-4 overflow-y-auto"
      >
        <CartCard v-for="item in cart" :key="item.id" :item="item" :cart="cart" />
      </div>
      <div
        v-else
        class="text-center text-[19px] text-[#4f4e4e] tracking-[0.2rem] mt-10 ml-5"
      >
        No Item within your cart...
      </div>
    </div>

    <div
      class="h-full lg:w-[25vw] md:w-[20vw] sm:w-[20vw] ss:w-[18vw] xs:w-[10vw] flex flex-col justify-start items-center"
    >
      <h1 class="text-[28px] mt-14 lg:-ml-8 md:ml-8 mb-5">Bag</h1>
      <div
        v-if="cart.length > 0"
        class="lg:w-[25vw] md:w-[24vw] sm:w-[25vw] ss:w-[25vw] xs:w-[32vw] max-h-[60vh] overflow-y-auto"
      >
        <div v-for="item in cart" :key="item.id" class="flex items-center gap-4 mb-4">
          <img :src="item.thumbnail" alt="Product Image" class="w-16 h-16 object-cover" />
          <div>
            <div class="lg:text-[16px] md:text-[14px] sm:text-[12px] xs:text-[10px]">
              {{ item.title }}
            </div>
            <div class="lg:text-[16px] md:text-[14px] sm:text-[12px] xs:text-[10px]">
              Quantity: {{ item.quantity }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-[19px] text-[#8d8b8b]">Add Something...</div>
      <router-link to="/checkout">
        <button
          class="lg:w-[9rem] md:w-[7rem] sm:w-[6rem] xs:w-[5.5rem] lg:h-10 md:h-8 sm:h-8 ss:h-6 xs:h-6 bg-black text-white lg:text-[16px] md:text-[14px] sm:text-[12px] ss:text-[10px] xs:text-[10px] rounded-lg mt-8"
        >
          <font-awesome-icon
            :icon="['fas', 'bag-shopping']"
            class="rounded-lg text-white mr-2 cursor-pointer"
          />Checkout
        </button>
      </router-link>
    </div>
  </div>
</template>
