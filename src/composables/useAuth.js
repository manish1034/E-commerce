// src/composables/useAuth.js
import { ref } from 'vue';
import { login, logout, getUser, isAuthenticated, setCart, getCart } from '../utils/auth';

const user = ref(getUser());
const cart = ref(getCart());

const useAuth = () => {
  const loginUser = (email, password) => {
    login(email, password);
    user.value = getUser();
    cart.value = [];
  };

  const logoutUser = () => {
    logout();
    user.value = null;
    cart.value = [];
  };

  const addToCart = (product) => {
    const cartItem = cart.value.find((item) => item.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
    setCart(cart.value);
  };

  const clearCart = () => {
    cart.value = [];
    setCart([]);
  };

  return { user, loginUser, logoutUser, isAuthenticated, cart, addToCart, clearCart };
};

export default useAuth;
