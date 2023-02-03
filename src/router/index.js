import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    component: () => import('@/views/ProductList.vue'),
    name: 'ProductList'
  },
  {
    path: '/products/:id',
    component: () => import('@/views/Product.vue'),
    name: 'Product'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
