<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faShoppingCart,
  faHouse,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faStumbleupon } from "@fortawesome/free-brands-svg-icons";

// Add the icons to the library
library.add(faShoppingCart, faHouse, faRightFromBracket, faStumbleupon);

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
};
</script>

<template>
  <div
    class="h-[95vh] w-[5vw] bg-white ml-[1rem] mt-[1rem] rounded-xl shadow-md shadow-[#e7e5e5]"
  >
    <div class="flex flex-col gap-6 items-center">
      <router-link to="/">
        <font-awesome-icon
          :icon="['fab', 'stumbleupon']"
          class="text-[1.9rem] text-black mt-10 cursor-pointer"
        ></font-awesome-icon>
      </router-link>
      <router-link to="/" exact-active-class="text-[#084eb8]">
        <font-awesome-icon
          :icon="['fas', 'house']"
          class="text-[1.45rem] text-[#a0a3a7] mt-5 hover:text-black cursor-pointer"
        ></font-awesome-icon>
      </router-link>
      <router-link to="cart" active-class=" text-[#084db8] ">
        <font-awesome-icon
          :icon="['fas', 'shopping-cart']"
          class="text-[1.45rem] text-[#a0a3a7] hover:text-black cursor-pointer"
        ></font-awesome-icon>
      </router-link>
      <router-link to="/login">
        <font-awesome-icon
          :icon="['fas', 'right-from-bracket']"
          class="text-[1.5rem] text-[#ea96a0] -ml-2 absolute bottom-16 hover:text-[#d65060] cursor-pointer"
        ></font-awesome-icon>
      </router-link>
    </div>
  </div>
</template>
