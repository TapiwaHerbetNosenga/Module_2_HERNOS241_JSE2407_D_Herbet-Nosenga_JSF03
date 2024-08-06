<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from '../../store';

/** Represents the global store instance. */
const store = useStore();

/**
 * Updates the filter in the store.
 * @param {string} newFilter - The new filter value to set.
 */
const changeFilter = (newFilter) => {
    store.setFilter(newFilter);
};

/**
 * Updates the sorting order in the store.
 * @param {string} newSort - The new sorting order value to set.
 */
const changeSort = (newSort) => {
    store.setSort(newSort);
};

/**
 * Handles the filter change event and updates the filter state.
 * @param {Event} event - The event object.
 */
const updateState = (event) => {
    changeFilter(event.target.value);
};

/**
 * Handles the sorting change event and updates the sorting state.
 * @param {Event} event - The event object.
 */
const updateSort = (event) => {
    changeSort(event.target.value);
};

/** The list of product categories fetched from the API. */
const categories = ref([]);

/** Fetches the list of product categories when the component is mounted. */
onMounted(async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        categories.value = data;
        categories.value.unshift("All");
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
</script>

<template>
    <div class="absolute z-0 top-10 my-2 sm:my-2 flex md:flex-row md:justify-center flex-col justify-end sm:justify-center items-center xl:w-full left-0 right-0 ">
        <div class="flex justify-center items-center rounded-md">
            <h1 class="font-semibold text-xl sm:text-xl charcoal-text">Filter:</h1>
            <select class="rounded-md m-2 p-1.5 w-16" @change="updateState">
                <option v-for="category in categories" :value="category" :key="category">{{ category }}</option>
            </select>
        </div>
        <div class="flex items-center m-0 p-0 rounded-md" @change="updateSort">
            <h1 class="font-semibold text-xl sm:text-xl charcoal-text px-1">Sort by:</h1>
            <select class="p-1.5 rounded-md">
                <option value="default">Default</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
            </select>
        </div>
    </div>
</template>

<style>
select {
    background-color: #FF69B4;
}

.b-blue {
    background-color: #007BFF;
}

.charcoal-text {
    color: #333333;
}

.pink-text {
    color: #FF69B4;
}
</style>
