<script setup>
import Top from './Header.vue';
import { onMounted } from 'vue';
import { useStore } from '../../store';
import { createCart, getCart, createList, getList, createCompare, getComparison } from '../../localstorage';

const store = useStore();

onMounted(() => {
   
    const cart = getCart('cart');
    if (!cart || cart.size === 0) {
        createCart('cart', new Set()); 
    }

  
    const list = getList('list');
    if (!list || list.size === 0) {
        createList('list', new Set()); 
    }


    const compare = getComparison('compare');
    if (!compare || compare.size === 0) {
        createCompare('compare', new Set()); 
    }
});
</script>


<template>
  <div >
    <Top />
    
  </div>
</template>

  

<style>

</style>
