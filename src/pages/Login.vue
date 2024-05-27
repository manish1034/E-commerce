// src/pages/Login.vue
<script>
import { ref } from "vue";
import useAuth from "../composables/useAuth";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref(null);
    const { loginUser } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
      try {
        loginUser(email.value, password.value);
        router.push("/");
      } catch (err) {
        error.value = err.message;
      }
    };

    return { email, password, handleLogin, error };
  },
};
</script>

<template>
  <div class="w-full flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6">Login</h2>
      <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full p-3 border rounded mb-4"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full p-3 border rounded mb-4"
      />
      <button
        @click="handleLogin"
        class="w-full bg-black text-white hover:text-black hover:bg-white hover:border-[1px] hover:border-black/40 p-3 rounded"
      >
        Login
      </button>
    </div>
  </div>
</template>

<style scoped></style>
