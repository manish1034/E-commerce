<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
library.add(faBagShopping);

export default {
  name: "Card",
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.product);
    },
    viewProduct() {
      this.$emit("show-product", this.product);
    },
  },
};
</script>

<template>
  <div class="bg-inherit h-[38vh] w-[16vw] mt-5">
    <img
      @click="viewProduct"
      :src="product.thumbnail"
      alt="Product Image"
      class="w-[22rem] h-[10rem] object-cover rounded-xl cursor-pointer"
    />
    <div class="font-semibold mt-2 text-[16px] px-2">{{ product.title }}</div>
    <div class="text-gray/600 px-2 text-[14px]">{{ product.brand }}</div>
    <div class="flex flex-row justify-between px-2 pt-1">
      <div class="font-bold text-[16px]">${{ product.price }}</div>
      <div class="flex flex-row gap-2 items-center">
        <h1 class="text-[12px]">Add to cart</h1>
        <font-awesome-icon
          @click.stop="addToCart"
          :icon="['fas', 'bag-shopping']"
          class="bg-black rounded-lg text-[14px] text-white p-2 -mt-1 cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>
