<script setup>

import { onMounted, ref, reactive, onBeforeMount } from 'vue';
import { getToken, removeToken } from '../../localstorage';
import { useStore } from '../../store';
import { useRouter } from 'vue-router';


const users = reactive([]);
const usersArr = reactive([]);


onMounted(() => {
    fetch('https://fakestoreapi.com/users')
        .then(res => res.json())
        .then(data => users.values = data)
}

);


const store = useStore();
const user = ref(store.user);


const isLoggedIn = ref(getToken(store.user))
function logOut() {
    console.log(getToken(user.value));
    removeToken(store.user);

}


</script>
<template>

    <nav class="fixed top-0 xl:w-full left-0 right-0 pl-6 pr-6 pt-3 pb-3 ">
        <router-link to="/" class="font-semibold text-lg">Home</router-link>
        <ul>
            <router-link v-show="isLoggedIn" to="/log-in" class="font-semibold px-2 text-lg">Log-in</router-link>
            <button v-show="!isLoggedIn" @click="logOut">Log Out</button>
            <router-link to="/shopping-cart" class="font-semibold px-2 text-lg">Shopping Cart</router-link>
           
            <router-link to="/wish-list" class="font-semibold px-2 text-lg">Wish List</router-link>
            <router-link to="/comparisons" class="font-semibold px-2 text-lg">Compare Items</router-link>
        </ul>

    </nav>

    <router-view></router-view>
</template>
<style>
nav {
    display: flex;
    justify-content: space-between;
    background-color: #333333;
    z-index: 20;
}

a {
    color: white;
    transition: color 0.5s ease;
}

a:hover {
    color: #32CD32;
}

.blues {
    background-color: #8A2BE2;
    padding: 1vw;
}
</style>