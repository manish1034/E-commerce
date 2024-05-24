<script>
import Sidebar from "./components/Sidebar.vue";

export default {
  name: "app",
  components: {
    Sidebar,
  },
};
</script>

<template>
  <div class="bg-[#ededed] flex h-[100vh] w-full">
    <Sidebar />
    <router-view></router-view>
  </div>
</template>
