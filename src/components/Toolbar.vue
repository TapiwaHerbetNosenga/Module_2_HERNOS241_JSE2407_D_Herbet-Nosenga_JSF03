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
<template >
    <div class="absolute z-0 top-10  tool xl:w-full left-0 right-0 ">

        <select class="rounded-md m-2 p-1.5" @change="updateState" >
            <option v-for="category of categories" :value="category"  :key="category" >{{ category }}</option>
        </select>
        <div class="flex items-center " @change="updateSort">
            <h1 class="text-2xl">Sort by:</h1>
            <select class=" m-2 p-1.5 rounded-r-md">
            <option value="default">Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
        </select></div>
        
    </div>
   
    

</template>
<style>
.tool {
    display: flex;
justify-content: space-evenly;

}

select{
    background-color: #FF69B4;
 
}
</style>
