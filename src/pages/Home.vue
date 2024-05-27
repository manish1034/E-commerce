<script>
import axios from "axios";
import useAuth from "../composables/useAuth";
import { ref, reactive, onMounted, computed } from "vue";
import Card from "../components/Card.vue";
import ViewItem from "../components/ViewItem.vue"; // Import the new component
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "vue-router";
library.add(faBagShopping);

export default {
  name: "home",
  components: {
    Card,
    ViewItem, // Register the component
    "font-awesome-icon": FontAwesomeIcon,
  },
  setup() {
    const router = useRouter();
    const { isAuthenticated, cart, addToCart } = useAuth();
    const products = ref([]);
    const searchQuery = ref("");
    const selectedProduct = ref(null);
    const currentImage = ref("");
    const currentPage = ref(1);
    const totalProducts = ref(0);
    const itemsPerPage = 30;
    const totalPages = ref(0);

    const fetchProducts = async (page = 1) => {
      try {
        const skip = (page - 1) * itemsPerPage;
        const response = await axios.get(
          `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`
        );
        products.value = response.data.products;
        totalProducts.value = response.data.total;
        totalPages.value = Math.ceil(totalProducts.value / itemsPerPage);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    const filteredProducts = computed(() => {
      if (!searchQuery.value || typeof searchQuery.value !== "string") {
        return products.value; // return all products if searchQuery is not a valid string
      }
      return products.value.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const addToCartHandler = (product) => {
      if (!isAuthenticated()) {
        router.push("/login");
        return;
      }
      addToCart(product);
    };

    const showProductDetails = (product) => {
      selectedProduct.value = product;
      currentImage.value = product.images[0];
    };

    const closeProductDetails = () => {
      selectedProduct.value = null;
    };

    const updateMainImage = (image) => {
      currentImage.value = image;
    };

    const nextPage = () => {
      if (currentPage.value < Math.ceil(totalProducts.value / itemsPerPage)) {
        currentPage.value++;
        fetchProducts(currentPage.value);
      }
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        fetchProducts(currentPage.value);
      }
    };

    const goToPage = (page) => {
      currentPage.value = page;
      fetchProducts(page);
    };

    onMounted(() => {
      fetchProducts();
    });

    return {
      products,
      filteredProducts,
      searchQuery,
      cart,
      selectedProduct,
      addToCartHandler,
      showProductDetails,
      closeProductDetails,
      currentImage,
      updateMainImage,
      currentPage,
      nextPage,
      previousPage,
      goToPage,
      totalPages,
    };
  },
};
</script>

<template>
  <div
    class="w-full h-full xs:h-[100vh] flex flex-row lg:gap-10 md:gap-10 sm:gap-10 ss:gap-10 xs:gap-2 items-start"
  >
    <div
      class="flex flex-col gap-5 lg:w-[70%] md:w-[70%] ss:w-[60%] xs:w-[58%] h-[92vh] border-r-[1px] border-[#bab8b8] mt-8"
    >
      <div class="flex flex-col items-center gap-2">
        <h1 class="text-[#6b6b6b] text-center">Search Items</h1>
        <input
          v-model="searchQuery"
          placeholder="Apple Watch, MAC, Samsung S23..."
          class="lg:w-[18rem] sm:w-[15rem] lg:h-[2.2rem] sm:h-[2rem] rounded-lg placeholder:px-2 shadow-lg focus:outline-none px-2 focus:text-gray-600 focus:text-[24px] xs:text-[12px]"
        />
      </div>
      <div
        class="flex flex-row gap-2 justify-around lg:gap-2 md:gap-[1.5rem] sm:gap-[1.3rem] flex-wrap lg:px-14 md:px-14 ss:px-12 xs:px-6 overflow-y-auto"
      >
        <div v-for="product in filteredProducts" :key="product.id" class="">
          <Card
            :product="product"
            @add-to-cart="addToCartHandler"
            @show-product="showProductDetails"
          />
        </div>
      </div>

      <!-- pagination -->
      <div class="flex justify-center mt-1">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="lg:px-4 lg:py-2 mx-2 bg-gray-300 lg:text-[16px] md:text-[12px] ss:text-[11px] xs:text-[11px] lg:h-10 md:h-8 sm:h-7 ss:h-6 xs:h-6 lg:w-[5rem] md:w-[5rem] sm:w-[4rem] ss:w-[3rem] xs:w-[3rem] rounded hover:bg-black hover:text-white"
        >
          Prev
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'lg:px-4 lg:py-2 lg:mx-1 md:mx-1 sm:mx-1 ss:mx-3 xs:mx-[0.4rem] rounded lg:text-[16px] md:text-[12px] ss:text-[11px] xs:text-[11px] lg:h-10 md:h-8 sm:h-7 xs:h-6 lg:w-[3rem] md:w-[2rem] sm:w-[1.5rem] ss:w-[0rem] xs:w-[0rem] hover:bg-black hover:text-white',
            {
              'bg-black lg:text-white md:text-white sm:text-red-600 xs:text-red-600 ss:text-red-600':
                currentPage === page,
              'bg-gray-300': currentPage !== page,
            },
          ]"
        >
          {{ page }}
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="lg:px-4 lg:py-2 mx-2 bg-gray-300 lg:text-[16px] md:text-[12px] ss:text-[11px] xs:text-[11px] lg:h-10 md:h-8 sm:h-7 xs:h-6 lg:w-[5rem] md:w-[5rem] sm:w-[4rem] ss:w-[4rem] xs:w-[3rem] rounded hover:bg-black hover:text-white"
        >
          Next
        </button>
      </div>
    </div>

    <div
      class="h-full lg:w-[25vw] md:w-[20vw] sm:w-[20vw] ss:w-[18vw] xs:w-[32vw] flex flex-col justify-start items-center"
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
      <router-link to="/cart">
        <button
          class="lg:w-[9rem] md:w-[7rem] sm:w-[6rem] xs:w-[5.5rem] lg:h-10 md:h-8 sm:h-8 ss:h-6 xs:h-6 bg-black text-white lg:text-[16px] md:text-[14px] sm:text-[12px] ss:text-[10px] xs:text-[10px] rounded-lg mt-8"
        >
          <font-awesome-icon
            :icon="['fas', 'bag-shopping']"
            class="rounded-lg text-white mr-2 cursor-pointer"
          />View Bag
        </button>
      </router-link>
    </div>

    <!-- ViewItems Modal -->
    <ViewItem
      v-if="selectedProduct"
      :selectedProduct="selectedProduct"
      :currentImage="currentImage"
      @close-product-details="closeProductDetails"
      @update-main-image="updateMainImage"
      @add-to-cart="addToCartHandler"
    />
  </div>
</template>
