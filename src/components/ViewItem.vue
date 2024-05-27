<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "ViewItem",
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
  props: {
    selectedProduct: {
      type: Object,
      required: true,
    },
    currentImage: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeProductDetails() {
      this.$emit("close-product-details");
    },
    updateMainImage(image) {
      this.$emit("update-main-image", image);
    },
    addToCart(product) {
      this.$emit("add-to-cart", product);
    },
  },
};
</script>

<template>
  <div
    v-if="selectedProduct"
    class="fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center"
  >
    <div
      class="bg-white p-6 rounded-lg shadow-lg lg:w-[45rem] md:w-[35rem] sm:w-[32rem] ss:w-[32rem] xs:w-[28rem] relative flex gap-10"
    >
      <button
        @click="closeProductDetails"
        class="absolute top-0 right-4 text-[28px] text-gray-600 hover:text-gray-800"
      >
        &times;
      </button>
      <div class="flex flex-col justify-center items-center mr-6">
        <img
          :src="currentImage"
          alt="Product Image"
          class="w-[30rem] h-[12rem] object-contain rounded-lg mb-9"
        />
        <div class="flex gap-2">
          <img
            v-for="image in selectedProduct.images"
            :key="image"
            :src="image"
            @click="updateMainImage(image)"
            alt="Product Image"
            class="w-16 h-16 object-cover rounded-lg cursor-pointer"
          />
        </div>
      </div>
      <div class="flex flex-col justify-start">
        <h1
          class="lg:text-2xl md:text-[20px] sm:text-[16px] ss:text-[14px] xs:text-[12px] font-semibold mb-2"
        >
          {{ selectedProduct.title }}
        </h1>
        <p
          class="text-gray-600 mb-2 lg:text-lg md:text-[16px] sm:text-[14px] ss:text-[12px] xs:text-[10px]"
        >
          {{ selectedProduct.brand }}
        </p>
        <p
          class="lg:text-lg md:text-[16px] sm:text-[14px] ss:text-[12px] xs:text-[10px] mb-2 font-semibold"
        >
          ${{ selectedProduct.price }}
        </p>
        <p
          class="text-gray-700 lg:text-lg md:text-[14px] sm:text-[13px] ss:text-[12px] xs:text-[10px]"
        >
          {{ selectedProduct.description }}
        </p>
        <div class="flex flex-row justify-end">
          <button
            @click="addToCart(selectedProduct)"
            class="lg:w-[9rem] md:w-[8rem] sm:w-[6rem] xs:w-[5.5rem] lg:h-10 md:h-9 sm:h-8 ss:h-6 xs:h-6 bg-black text-white lg:text-[16px] md:text-[14px] sm:text-[12px] ss:text-[10px] xs:text-[10px] rounded-lg mt-8"
          >
            <font-awesome-icon
              :icon="['fas', 'bag-shopping']"
              class="rounded-lg text-[14px] text-white mr-2 cursor-pointer"
            />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
