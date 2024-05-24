import { createRouter, createWebHistory } from 'vue-router';
const Home = () => import('./pages/Home.vue');
const Login = () => import('./pages/Login.vue')
const Signup = () => import('./pages/Signup.vue');
const Cart = () => import('./pages/Cart.vue')
const routes = [
    { path: '', component: Home },
    { path: '/login', component: Login},
    { path: '/signup', component: Signup},
    { path: '/cart', component: Cart},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;