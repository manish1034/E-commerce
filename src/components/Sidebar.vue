<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBars,
  faShoppingCart,
  faHouse,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faStumbleupon } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "vue-router";
import useAuth from "../composables/useAuth";
import { ref } from "vue";

// Add the icons to the library
library.add(faShoppingCart, faHouse, faBars, faRightFromBracket, faStumbleupon);

export default {
  name: "Sidebar",
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
  data() {
    return {
      iconColor: "blue",
    };
  },
  setup() {
    const { logoutUser, isAuthenticated } = useAuth(); // Access the logout function from the composable
    const router = useRouter();
    const isSidebarOpen = ref(false);

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const logout = () => {
      logoutUser();
      router.push("/login");
      toggleSidebar(); // Close the sidebar on logout
    };

    return {
      logout,
      isAuthenticated,
      toggleSidebar,
      isSidebarOpen,
    };
  },
};
</script>

<template>
  <div class="sm:hidden">
    <font-awesome-icon
      :icon="['fas', 'bars']"
      class="text-xl p-4 mt-2 cursor-pointer"
      @click="toggleSidebar"
    />
    <div
      v-if="isSidebarOpen"
      class="w-12 absolute bg-white h-48 flex flex-col justify-around items-center rounded-lg"
    >
      <router-link to="/" exact-active-class="text-[#084eb8]">
        <font-awesome-icon
          :icon="['fas', 'house']"
          class="text-lg text-[#a0a3a7] mt-5 hover:text-black cursor-pointer"
        ></font-awesome-icon>
      </router-link>
      <router-link to="cart" active-class=" text-[#084db8] ">
        <font-awesome-icon
          :icon="['fas', 'shopping-cart']"
          class="text-lg text-[#a0a3a7] hover:text-black cursor-pointer"
        ></font-awesome-icon>
      </router-link>
      <font-awesome-icon
        v-if="isAuthenticated"
        @click="logout"
        :icon="['fas', 'right-from-bracket']"
        class="text-lg text-red-600 hover:text-[#d38a92] cursor-pointer"
      ></font-awesome-icon>
    </div>
  </div>
  <div
    class="h-[95vh] w-[5vw] bg-white ml-[1rem] mt-[1rem] rounded-xl shadow-md shadow-[#e7e5e5] hidden sm:block"
  >
    <div class="flex flex-col gap-6 items-center">
      <router-link to="/">
        <font-awesome-icon
          :icon="['fab', 'stumbleupon']"
          class="lg:text-[1.9rem] md:text-15.9remsmlg:text-9rem]ssg:text-[1.9rem] xs:text-[1.9rem] text-black mt-10 cursor-pointer"
        ></font-awesome-icon>
      </router-link>
      <router-link to="/" exact-active-class="text-[#084eb8]">
        <font-awesome-icon
          :icon="['fas', 'house']"
          class="lg:text-[1.45rem] md:text-[1.15rem] sm:text-[1rem] ss:text-[1.45rem] xs:text-[1.45rem] text-[#a0a3a7] mt-5 hover:text-black cursor-pointer"
        ></font-awesome-icon>
      </router-link>
      <router-link to="cart" active-class=" text-[#084db8] ">
        <font-awesome-icon
          :icon="['fas', 'shopping-cart']"
          class="lg:text-[1.45rem] md:text-[1.15rem] sm:text-[1rem] ss:text-[1.45rem] xs:text-[1.45rem] text-[#a0a3a7] hover:text-black cursor-pointer"
        ></font-awesome-icon>
      </router-link>
      <font-awesome-icon
        v-if="isAuthenticated"
        @click="logout"
        :icon="['fas', 'right-from-bracket']"
        class="lg:text-[1.5rem] md:text-[1.515m] lgsmext-[1.5] lg:ssxt-[1.5rem] lg:txst-[1.5rem] text-red-600 absolute bottom-16 hover:text-[#d38a92] cursor-pointer"
      ></font-awesome-icon>
    </div>
  </div>
</template>
