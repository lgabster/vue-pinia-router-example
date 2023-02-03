<template>
  <h1>{{ product.title }}</h1>
  <div>
    <router-link :to="{ name: 'ProductList' }">
      &lt;-- Product List</router-link
    >
  </div>
  <img width="300" :src="product.image" :alt="product.title" />
</template>

<script setup>
import { useProductStore } from '../store/product';
import { useRoute } from 'vue-router';

const route = useRoute();
const productStore = useProductStore();

const product = await productStore.getProduct(route.params.id);
console.log(product);
</script>
