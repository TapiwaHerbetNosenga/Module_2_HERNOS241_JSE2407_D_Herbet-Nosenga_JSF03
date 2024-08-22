

<script setup>
import { ref } from 'vue';
import { getToken, setToken } from '../../localstorage';
import { useStore } from '../../store';
import { useRouter } from 'vue-router';
import {jwtDecode} from 'jwt-decode'; 
import { setUserName, getUser } from '../../localstorage';

const store = useStore();
const route = ref(store.route);
const router = useRouter();
const user = ref(store.user);
const userName = ref("");
const password = ref("");
const visibility = ref("password");

function togglePassword() {
    visibility.value = visibility.value === "password" ? "text" : "password";
}

async function authenticateUser() {
    try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userName.value,
                password: password.value
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { token } = await response.json();

        
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken); 

     
        store.user = ref(decodedToken.user);
        setUserName('user',decodedToken.user);
        setToken(store.user, token);

      
        if (getToken(store.user)) {
            console.log(user.value);
            router.push(store.route || '/shopping-cart');
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        alert(`Your username or password is incorrect`);
    }
}

function signIn() {
    authenticateUser();
}
</script>

<template>
    <form class="flex flex-col items-center border-solid border-4 log-in" @submit.prevent="signIn">
        <h2 class="text-2xl font-semibold charcoal">Log-in</h2>
        <label>Username: <input id="userName" class="m-2 rounded-md bg-white border-gray-500 border-solid border-2" v-model="userName" type="text" name="userName" required /></label>
        <label>Password: <input id="password" class="m-2 rounded-md bg-white border-gray-500 border-solid border-2" v-model="password" required :type="visibility" /><input type="checkbox" @change="togglePassword" /></label>
        <input class=" rounded-md border-2 blues h-12 " type="submit" value="Submit" />
    </form>
</template>

<style>
label {
    color: #333333;
}

.charcoal {
    color: #333333;
}

@media (min-width: 760px) {
    .log-in {
        width: 650px;
        height: 30vw;
        border-color: red;
        border-radius: 28px;
    }
}

@media (min-width: 960px) {
    .log-in {
        width: 800px;
        height: 200px;
        border-color: red;
        border-radius: 28px;
    }
}

.blues {
    background-color: #007BFF;
}
</style>