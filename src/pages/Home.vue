<script setup>
import { ref, onMounted, reactive } from 'vue';
import Toolbar from '../components/Toolbar.vue';

const products = ref([]);
onMounted(async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        products.value = data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
</script>
<template>
    <Toolbar />
    <div class=" py-8 lg:max-h-[130rem] mx-auto my-3 mt-5 grid gap-2 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none">
      <div v-for="product in products" :key="product.id" class="cards rounded-xl">
        <router-link :to="'/product-detail/' + product.id">
          <div>
            <img :src="product.image" alt="Product Image">
  
            <h2 class="charcoal-text line-clamp-2 pl-1 pr-1 font-bold text-lg ml-2 mr-2 text-center">
              {{ product.title }}
            </h2>
            <p class="text-gray-500 pl-1 pr-1 font-bold text-lg ml-2 mr-2">
              R{{ product.price }}
            </p>
            <p class="border-sky-500 border-2 rounded-md text-white bg-sky-500 font-semibold p-1 hover:bg-sky-600 hover:border-sky-600">
              {{ product.category }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </template>
<style>
.cards {
    max-width: 30rem;
    min-width: 15rem;
    height: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    background-color: white;


}

.charcoal-text {
    color: #333333
}

img {
    width: max-content;
    height: 10rem;
    padding: 1rem;
}
</style>