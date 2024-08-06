<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from '../../store';

const store = useStore();


const changeFilter = (newFilter) => {
    store.setFilter(newFilter);
};

const changeSort = (newSort) => {
    store.setSort(newSort);
};

const updateState = (event) => {
    changeFilter(event.target.value);

};

const updateSort = (event) => {
    changeSort(event.target.value);

};

const categories = ref([]);
onMounted(async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        categories.value = data;
        categories.value.unshift("All")
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});


</script>
<template>
    <div
        class="absolute z-0 top-10 my-2 sm:my-2 flex md:flex-row md:justify-center  flex-col  justify-end sm:justify-center items-center xl:w-full left-0 right-0 ">
        <div class="flex  justify-center items-center rounded-md">
            <h1 class=" font-semibold text-xl sm:text-xl charcoal-text">Filter:</h1>
            <select class="rounded-md m-2 p-1.5 w-16" @change="updateState">
                <option v-for="category of categories" :value="category" :key="category">{{ category }}</option>
            </select>
        </div>

        <div class="flex items-center  m-0 p-0 rounded-md " @change="updateSort">
            <h1 class=" font-semibold text-xl sm:text-xl charcoal-text px-1">Sort by: </h1>
            <select class=" p-1.5 rounded-md">
                <option value="default">Default</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
            </select>
        </div>

    </div>



</template>
<style>
select {
    background-color: #FF69B4 ;

}

.b-blue{
    background-color: #007BFF;
}
.charcoal-text {
    color: #333333;
}
.pink-text{
    color:#FF69B4;
}
</style>
