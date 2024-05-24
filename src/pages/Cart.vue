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
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    });

    onMounted(() => {
      loadCartFromLocalStorage();
    });

    return { cart, loadCartFromLocalStorage, totalPrice };
  },
};
</script>

<template>
  <div class="w-full h-full flex flex-row gap-10 items-start">
    <div
      class="flex flex-col gap-5 w-[70%] h-[92vh] border-r-[1px] border-[#bab8b8] mt-8"
    >
      <div class="flex flex-col items-center gap-2">
        <h1 class="text-[#6b6b6b] text-center text-[32px]">Check Your Bag Items</h1>
      </div>
      <div class="flex flex-row justify-between gap-2 flex-wrap px-14 overflow-y-auto">
        <CartCard v-for="item in cart" :key="item.id" :item="item" :cart="cart" />
      </div>
    </div>

    <div class="h-full w-[25vw] flex flex-col justify-start items-center">
      <h1 class="text-[28px] mt-14 -ml-8 mb-5">Bag</h1>
      <div v-if="cart && cart.length > 0" class="w-full max-h-[60vh] overflow-y-auto">
        <div v-for="item in cart" :key="item.id" class="flex items-center gap-4 mb-4">
          <img :src="item.thumbnail" alt="Product Image" class="w-16 h-16 object-cover" />
          <div>
            <div>{{ item.title }}</div>
            <div>Quantity: {{ item.quantity }}</div>
          </div>
        </div>
      </div>
      <div v-else class="text-[19px] text-[#8d8b8b]">Add Something...</div>
      <div class="font-semibold text-[16px]">Bag total: ${{ totalPrice }}</div>
      <router-link to="/cart">
        <button class="w-[9rem] bg-black text-white h-10 rounded-lg mt-5">
          <font-awesome-icon
            :icon="['fas', 'bag-shopping']"
            class="rounded-lg text-[14px] text-white mr-2 cursor-pointer"
          />Checkout
        </button>
      </router-link>
    </div>
  </div>
</template>
