<script setup>
</script>
<template>
  
    <nav class="fixed top-0 xl:w-full left-0 right-0 pl-6 pr-6 pt-3 pb-3 ">
        <router-link to="/">SwiftCart</router-link>
        <ul>
            <router-link to="/shopping-cart">Shopping Cart</router-link>
            <router-link to="/wish-list">Wish List</router-link>
        </ul>

    </nav>

    <router-view></router-view>
</template>
<style> 
nav{
    display: flex;
    justify-content: space-between;  
    background-color: #333333;
    z-index: 20;
}
a{
   color: #007BFF ;
}
</style>