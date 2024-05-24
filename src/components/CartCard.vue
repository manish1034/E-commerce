<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash);
export default {
  name: "Card",
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    cart: {
      type: Array,
      required: true,
    },
  },
  methods: {
    increaseQuantity() {
      const product = this.cart.find((p) => p.id === this.item.id);
      if (product) {
        product.quantity += 1;
        this.updateCartInLocalStorage();
      }
    },

    decreaseQuantity() {
      const product = this.cart.find((p) => p.id === this.item.id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        this.updateCartInLocalStorage();
      }
    },

    updateCartInLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    deleteItem() {
      const index = this.cart.findIndex((p) => p.id === this.item.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
        this.updateCartInLocalStorage(); // Make sure to call with 'this.'
      }
    },
  },
};
</script>

<template>
  <div
    class="bg-white h-full flex items-start gap-10 mb-4 w-full p-4 rounded-lg shadow-xl"
  >
    <img
      :src="item.thumbnail"
      alt="Product Image"
      class="w-[15rem] h-[15rem] object-cover"
    />
    <div class="flex-1">
      <div class="text-[25px] font-semibold mt-5">{{ item.title }}</div>
      <div class="text-[15px] text-gray-500 mb-5">{{ item.category }}</div>
      <div class="text-[15px] text-gray-700 mb-5">{{ item.description }}</div>
      <div class="flex justify-between">
        <div class="font-semibold">Price: ${{ item.price }}</div>
        <div class="flex items-center pr-10">
          <button
            @click="decreaseQuantity"
            class="px-2 py-1 font-semibold rounded hover:text-red-600"
          >
            -
          </button>
          <div class="px-2">{{ item.quantity }}</div>
          <button
            @click="increaseQuantity"
            class="px-2 py-1 font-semibold rounded hover:text-green-600"
          >
            +
          </button>
          <button @click="deleteItem" class="ml-4 text-red-600 hover:text-red-800">
            <font-awesome-icon :icon="['fas', 'trash']" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
