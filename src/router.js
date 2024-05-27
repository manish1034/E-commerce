// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import useAuth from './composables/useAuth';

const Home = () => import('./pages/Home.vue');
const Login = () => import('./pages/Login.vue');
const Cart = () => import('./pages/Cart.vue');
const Checkout = () => import('./pages/Checkout.vue');

const { isAuthenticated } = useAuth();

const routes = [
  { path: '', component: Home },
  { path: '/login', component: Login },
  { path: '/cart',
    component: Cart,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next('/login');
      } else {
        next();
      }
    },
  },
  { path: '/checkout',
    component: Checkout,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next('/login');
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
