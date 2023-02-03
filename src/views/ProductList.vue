<template>
  <h1>Product List</h1>

  <div v-for="product in products" :key="product.id">
    <router-link :to="{ name: 'Product', params: { id: product.id } }">{{
      product.title
    }}</router-link>
  </div>
</template>

<script setup>
import { useProductStore } from '../store/product';

const productStore = useProductStore();

const products = await productStore.fetchProducts();
console.log(products);
</script>
