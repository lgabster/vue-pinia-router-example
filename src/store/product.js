import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', () => {
  const products = ref([]);

  const fetchProducts = async () => {
    if (products.value.length) {
      console.log('return stored');
      return products.value;
    } else {
      return await axios
        .get('https://fakestoreapi.com/products')
        .then(res => {
          products.value = res.data;
          return res.data;
        })
        .catch(err => {
          console.error(err);
          return err;
        });
    }
  };

  const getProduct = async id => {
    const storedProduct = products.value.find(
      prod => prod.id === parseInt(id, 10)
    );
    if (storedProduct) {
      console.log('return stored');
      return storedProduct;
    } else {
      return await axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .then(res => {
          return res.data;
        })
        .catch(err => {
          console.error(err);
          return err;
        });
    }
  };

  return { products, fetchProducts, getProduct };
});
