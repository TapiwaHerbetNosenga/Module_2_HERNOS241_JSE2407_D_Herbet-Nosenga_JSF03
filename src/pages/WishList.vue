<script setup>
import { getList, updateList } from '../../localstorage';
import { ref, onMounted } from 'vue';

/**
 * Indicates if the data is still loading.
 * @type {Ref<boolean>}
 */
let loading = ref(true);

/**
 * List of items fetched from the API.
 * @type {Ref<Array<Object>>}
 */
const items = ref([]);

/**
 * Fetches items from the API based on IDs stored in local storage.
 * Updates the `items` ref with the fetched data and sets `loading` to false.
 */
const fetchListItems = async () => {
    const listSet = getList('list');
    const listArr = Array.from(listSet);
    for (let itemId of listArr) {
        try {
            const url = `https://fakestoreapi.com/products/${itemId}`;
            const response = await fetch(url);
            const data = await response.json();
            items.value.push(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    loading.value = false;
};

/**
 * Removes an item from the list and updates the local storage.
 * @param {number} id - The ID of the item to remove.
 */
const removeItem = (id) => {
    let listSet = getList('list');
    let listArr = Array.from(listSet);
    listArr = listArr.filter(item => item !== id);
    listSet = new Set(listArr);
    updateList('list', listSet);
    items.value = items.value.filter(item => item.id !== id);
}

onMounted(() => {
    fetchListItems();
});
</script>

<template>
    <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
    </div>
    <div v-else class="sm:py-8 lg:max-h-[130rem] mx-auto my-6 pt-20 sm:my-3 sm:mt-5 grid gap-2 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none">
        <div v-for="item in items" :key="item.id" class="cards rounded-xl">
            <div class="flex flex-col justify-center items-center">
                <router-link :to="'/product-detail/' + item.id">
                    <img :src="item.image" alt="Product Image">
                    <h2 class="charcoal-text line-clamp-2 pl-1 pr-1 font-bold text-lg ml-2 mr-2 text-center">
                        {{ item.title }}
                    </h2>
                    <p class="text-gray-500 pl-1 pr-1 font-bold text-lg ml-2 mr-2">
                        R{{ item.price }}
                    </p>
                    <p class="border-sky-500 border-2 rounded-md text-white bg-sky-500 font-semibold p-1 hover:bg-sky-600 hover:border-sky-600">
                        {{ item.category }}
                    </p>
                </router-link>
                <button @click="removeItem(item.id)"
                        class="remove font-bold flex items-center justify-center text-sm m-2">Remove</button>
            </div>
        </div>
    </div>
</template>

<style>
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
