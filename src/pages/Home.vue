<script>
import axios from "axios";
import { ref, reactive, onMounted, computed } from "vue";
import Card from "../components/Card.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
library.add(faBagShopping);

export default {
  name: "home",
  components: {
    Card,
    "font-awesome-icon": FontAwesomeIcon,
  },
  setup() {
    const products = ref([]);
    const searchQuery = ref([]);
    const cart = reactive([]);
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

    const addToCart = (product) => {
      const existingProduct = cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      saveCartToLocalStorage();
    };

    const saveCartToLocalStorage = () => {
      localStorage.setItem("cart", JSON.stringify(cart));
    };

    const loadCartFromLocalStorage = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      if (storedCart) {
        cart.push(...storedCart);
      }
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
      loadCartFromLocalStorage();
    });

    return {
      products,
      filteredProducts,
      searchQuery,
      cart,
      selectedProduct,
      addToCart,
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
  <div class="w-full h-full flex flex-row gap-10 items-start">
    <div
      class="flex flex-col gap-5 w-[70%] h-[92vh] border-r-[1px] border-[#bab8b8] mt-8"
    >
      <div class="flex flex-col items-center gap-2">
        <h1 class="text-[#6b6b6b] text-center">Search Items</h1>
        <input
          v-model="searchQuery"
          placeholder="Apple Watch, MAC, Samsung S23..."
          class="w-[18rem] h-[2.2rem] rounded-lg placeholder:px-2 shadow-lg focus:outline-none px-2 focus:text-gray-600"
        />
      </div>
      <div
        class="flex flex-row h-full justify-between gap-2 flex-wrap px-14 overflow-y-auto"
      >
        <div v-for="product in filteredProducts" :key="product.id" class="">
          <Card
            :product="product"
            @add-to-cart="addToCart"
            @show-product="showProductDetails"
          />
        </div>
      </div>

      <!-- pagination -->
      <div class="flex justify-center mt-1">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 mx-2 bg-gray-300 rounded hover:bg-black hover:text-white"
        >
          Previous
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-4 py-2 mx-1 rounded hover:bg-black hover:text-white',
            {
              'bg-black text-white': currentPage === page,
              'bg-gray-300': currentPage !== page,
            },
          ]"
        >
          {{ page }}
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 mx-2 bg-gray-300 rounded hover:bg-black hover:text-white"
        >
          Next
        </button>
      </div>
    </div>

    <div class="h-full w-[25vw] flex flex-col justify-start items-center">
      <h1 class="text-[28px] mt-14 -ml-8 mb-5">Bag</h1>
      <div v-if="cart.length > 0" class="w-full max-h-[60vh] overflow-y-auto">
        <div v-for="item in cart" :key="item.id" class="flex items-center gap-4 mb-4">
          <img :src="item.thumbnail" alt="Product Image" class="w-16 h-16 object-cover" />
          <div>
            <div>{{ item.title }}</div>
            <div>Quantity: {{ item.quantity }}</div>
          </div>
        </div>
      </div>
      <div v-else class="text-[19px] text-[#8d8b8b]">Add Something...</div>
      <router-link to="/cart">
        <button class="w-[9rem] bg-black text-white h-10 rounded-lg mt-8">
          <font-awesome-icon
            :icon="['fas', 'bag-shopping']"
            class="rounded-lg text-[14px] text-white mr-2 cursor-pointer"
          />View Bag
        </button>
      </router-link>
    </div>

    <!-- ViewItems Modal -->
    <div
      v-if="selectedProduct"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-[50rem] relative flex gap-10">
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
            class="w-full h-64 object-contain rounded-lg mb-9"
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
          <h1 class="text-2xl font-semibold mb-2">{{ selectedProduct.title }}</h1>
          <p class="text-gray-600 mb-2">{{ selectedProduct.brand }}</p>
          <p class="text-lg mb-2">${{ selectedProduct.price }}</p>
          <p class="text-gray-700">{{ selectedProduct.description }}</p>
          <button
            @click="addToCart(selectedProduct)"
            class="w-[9rem] bg-black text-white h-10 rounded-lg mt-8"
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
