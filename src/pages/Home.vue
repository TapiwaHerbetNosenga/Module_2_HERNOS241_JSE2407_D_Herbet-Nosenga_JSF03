<script setup>
import { ref, onMounted, watch } from 'vue';
import { useStore } from '../../store';
import Toolbar from '../components/Toolbar.vue';

const store = useStore();
const filter = ref(store.filter);
const sort = ref(store.sort);

const products = ref([]);
const loading = ref(true); 

const fetchProducts = async () => {
    loading.value = true; 
    try {
        let url = 'https://fakestoreapi.com/products';
        if (filter.value && filter.value !== 'All') {
            url = `${url}/category/${filter.value}`;
            console.log(url);
        }
        const response = await fetch(url);
        const data = await response.json();
        products.value = data;
        sortProducts(); 
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        loading.value = false; 
    }
};

const sortProducts = () => {
    if (sort.value === 'asc') {
        products.value.sort((a, b) => a.price - b.price);
    } else if (sort.value === 'desc') {
        products.value.sort((a, b) => b.price - a.price);
    }
};

onMounted(fetchProducts);

watch(
    [() => store.filter, () => store.sort], 
    () => {
        filter.value = store.filter;
        sort.value = store.sort;
        fetchProducts(); 
    }
);
</script>

<template>
    <Toolbar />
    <div v-if="loading" class="loading-container">
        <!-- Add a spinner or loading indicator here -->
        <div class="spinner"></div>
    </div>
    <div v-else class="py-8 lg:max-h-[130rem] mx-auto my-3 mt-5 grid gap-2 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none">
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
    color: #333333;
}

img {
    width: max-content;
    height: 10rem;
    padding: 1rem;
}

.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
}

.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
