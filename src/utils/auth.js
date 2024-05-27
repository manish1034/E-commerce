// src/utils/auth.js
import { ref } from 'vue';

const user = ref(null);
const cart = ref([]);

const setToken = (token) => {
  localStorage.setItem('token', token);
};

const getToken = () => {
  return localStorage.getItem('token');
};

const setUser = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
  user.value = userData;
};

const getUser = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }
  return user.value;
};

const generateToken = () => {
  return Math.random().toString(36).substr(2);
};

const login = (email, password) => {
  const token = generateToken();
  setToken(token);
  setUser({ email, password });
  setCart([]); // Clear cart on login
  return token;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('cart');
  user.value = null;
  cart.value = [];
};

const isAuthenticated = () => {
  return !!getToken();
};

const setCart = (cartData) => {
  localStorage.setItem('cart', JSON.stringify(cartData));
  cart.value = cartData;
};

const getCart = () => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart.value = JSON.parse(storedCart);
  }
  return cart.value;
};

export { login, logout, getUser, isAuthenticated, setCart, getCart, cart };
