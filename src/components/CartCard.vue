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
    class="bg-white flex lg:flex-row md:flex-row ss:flex-col xs:flex-col justify-start items-start lg:gap-10 md:gap-2 sm:gap-2 ss:gap-3 xs:gap-2 mb-4 pb-5 w-full rounded-lg shadow-xl"
  >
    <img
      :src="item.thumbnail"
      alt="Product Image"
      class="lg:w-[15rem] md:w-[11rem] sm:w-[8rem] ss:w-[6rem] xs:w-[8rem] lg:h-[15rem] md:h-[11rem] sm:h-[8rem] ss:h-[6rem] xs:h-[8rem] object-cover"
    />
    <div class="flex-1 lg:mx-0 md:mx-0 ss:mx-5 xs:mx-2">
      <div
        class="lg:text-[25px] md:text-[20px] sm:text-[18px] ss:text-[16px] xs:text-[12px] font-semibold mt-5"
      >
        {{ item.title }}
      </div>
      <div class="text-[15px] text-gray-500 mb-5">{{ item.category }}</div>
      <div
        class="lg:text-[13px] md:text-[12px] sm:text-[12px] ss:text-[12px] xs:text-[10px] text-gray-700 mb-5 pr-3"
      >
        {{ item.description }}
      </div>
      <div class="flex justify-between">
        <div
          class="font-semibold lg:text-[16px] md:text-[15px] sm:text-[14px] ss:text-[12px] xs:text-[10px]"
        >
          Price: ${{ item.price }}
        </div>
        <div class="flex items-center pr-10">
          <button
            @click="decreaseQuantity"
            class="px-2 lg:text-[16px] md:text-[15px] sm:text-[14px] ss:text-[12px] xs:text-[10px] font-semibold rounded hover:text-red-600"
          >
            -
          </button>
          <div
            class="px-2 lg:text-[16px] md:text-[15px] sm:text-[14px] ss:text-[12px] xs:text-[10px]"
          >
            {{ item.quantity }}
          </div>
          <button
            @click="increaseQuantity"
            class="px-2 lg:text-[16px] md:text-[15px] sm:text-[14px] ss:text-[12px] xs:text-[10px] font-semibold rounded hover:text-green-600"
          >
            +
          </button>
          <button @click="deleteItem" class="ml-4 text-red-600 hover:text-red-800">
            <font-awesome-icon
              :icon="['fas', 'trash']"
              class="lg:text-[16px] md:text-[15px] sm:text-[14px] ss:text-[12px] xs:text-[10px]"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
