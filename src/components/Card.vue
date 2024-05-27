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
  <div
    class="bg-inherit flex flex-col justify-between h-[38vh] lg:w-[16vw] md:w-[16vw] sm:w-[16vw] ss:w-[30vw] xs:w-[27vw] mt-10"
  >
    <img
      @click="viewProduct"
      :src="product.thumbnail"
      alt="Product Image"
      class="lg:w-[22rem] md:w-[29rem] sm:w-[29rem] ss:w-[28rem] h-[10rem] object-cover rounded-xl cursor-pointer"
    />
    <div class="font-semibold mt-2 lg:text-[16px] sm:text-[14px] xs:text-[13px] px-2">
      {{ product.title }}
    </div>
    <div class="text-black/70 px-2 mt-1 lg:text-[14px] sm:text-[12px] xs:text-[11px]">
      {{ product.brand }}
    </div>
    <div class="flex flex-row justify-between px-2 pt-1">
      <div
        class="font-bold lg:text-[16px] md:text-[16px] sm:text-[14px] ss:text-[12px] xs:text-[12px]"
      >
        ${{ product.price }}
      </div>
      <div class="flex flex-row gap-2 items-center">
        <h1 class="text-[12px] md:hidden lg:block sm:hidden xs:hidden">Add to cart</h1>
        <font-awesome-icon
          @click.stop="addToCart"
          :icon="['fas', 'bag-shopping']"
          class="bg-black rounded-lg lg:text-[14px] md:text-[14px] sm:text-[12px] ss:text-[10px] xs:text-[10px] text-white p-2 -mt-1 cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>
