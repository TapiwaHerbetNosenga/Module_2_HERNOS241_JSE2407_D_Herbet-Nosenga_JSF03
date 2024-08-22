<script setup>
import { getComparison, updateComparison } from '../../localstorage';
import { ref, onMounted } from 'vue';

/** Indicates whether the comparison items are currently being loaded. */
let loading = ref(true);

/** The list of comparison items fetched from the API. */
const items = ref([]);

/**
 * Fetches items from the API based on the IDs stored in the comparison set.
 * Updates the `items` ref with the fetched data and sets `loading` to false once done.
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when all items have been fetched.
 */
const fetchComparisonsItems = async () => {
    const comparisonSet = getComparison('compare');
    const comparisonArr = Array.from(comparisonSet);
    for (let itemId of comparisonArr) {
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
 * Removes an item from the comparison set and updates the local list of items.
 * @param {number} id - The ID of the item to be removed.
 */
const removeItem = (id) => {
    let comparisonSet = getComparison('comparison');
    let comparisonArr = Array.from(comparisonSet);
    comparisonArr = comparisonArr.filter(item => item !== id);
    comparisonSet = new Set(comparisonArr);
    updateComparison('comparison', comparisonSet);
    items.value = items.value.filter(item => item.id !== id);
}

/** Fetches comparison items when the component is mounted. */
onMounted(() => {
    fetchComparisonsItems();
});

/** Keeps track of which items should display their full text. */
const showFullText = ref({});

/**
 * Toggles the display of full text for a given item.
 * @param {number} id - The ID of the item whose text display is being toggled.
 */
const toggleText = (id) => {
    showFullText.value[id] = !showFullText.value[id];
};
</script>

<template>
    <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
    </div>
    <div v-else>
        <table class="comparison-table w-full border-collapse bg-white rounded-lg shadow-md">
            <thead>
                <tr>
                    <th class="text-left p-4 charcoal">Properties</th>
                    <th v-for="item in items" :key="item.id" class="text-left charcoal p-4">{{ item.title }}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="font-bold p-4 charcoal">Image</td>
                    <td v-for="item in items" :key="item.id" class="text-center p-4">
                        <img :src="item.image" alt="Product Image" class="max-w-xs max-h-40">
                    </td>
                </tr>
                <tr>
                    <td class="font-bold p-4 charcoal">Price</td>
                    <td v-for="item in items" :key="item.id" class="charcoal p-4">R{{ item.price }}</td>
                </tr>
                <tr>
                    <td class="font-bold p-4 charcoal">Category</td>
                    <td v-for="item in items" :key="item.id" class="text-center p-4">
                        <p class="border-sky-500 border-2 rounded-md charcoal bg-sky-500 font-semibold p-1 hover:bg-sky-600 hover:border-sky-600">
                            {{ item.category }}
                        </p>
                    </td>
                </tr>
                <tr>
                    <td class="font-bold p-4 charcoal">Description</td>
                    <td v-for="item in items" :key="item.id" class="p-4 charcoal">
                        {{ showFullText[item.id] ? item.description : item.description.substring(0, 100) + '...' }}
                        <button @click="toggleText(item.id)" class="text-blue-500">
                            {{ showFullText[item.id] ? 'Show less' : 'Show more' }}
                        </button>
                    </td>
                </tr>
                <tr>
                    <td class="font-bold p-4 "></td>
                    <td v-for="item in items" :key="item.id" class="text-center p-4">
                        <button @click="removeItem(item.id)" class="remove font-bold text-sm m-2">Remove</button>
                    </td>
                </tr>
            </tbody>
        </table>
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

.comparison-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.comparison-table th, .comparison-table td {
    border: 1px solid #ddd;
    padding: 1rem;
}

.comparison-table th {
    background-color: #f2f2f2;
    font-weight: bold;
}

.remove {
    background-color: #8A2BE2;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
}

.text-blue-500 {
    color: #007BFF;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font-size: inherit;
}

.max-w-xs {
    max-width: 10rem;
}

.max-h-40 {
    max-height: 10rem;
}
.charcoal {
    color: #333333
}
</style>

