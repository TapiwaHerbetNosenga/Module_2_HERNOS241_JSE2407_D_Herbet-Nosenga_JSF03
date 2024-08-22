<template>
    <nav class="navbar">
        <div class="navbar-container large-screen">
            <router-link to="/" class="font-semibold text-lg">Home</router-link>
            <ul class="navbar-links">
                <li><router-link v-show="isLoggedIn" to="/log-in" class="font-semibold px-2 text-lg">Log In</router-link></li>
                <li><button v-show="!isLoggedIn" @click="logOut" class="font-semibold px-2 text-lg">Log Out</button></li>
                <li><router-link to="/shopping-cart" class="font-semibold px-2 text-lg">Shopping Cart</router-link></li>
                <li><router-link to="/wish-list" class="font-semibold px-2 text-lg">Wish List</router-link></li>
                <li><router-link to="/comparisons" class="font-semibold px-2 text-lg">Compare Items</router-link></li>
            </ul>
        </div>
        <div class="navbar-container small-screen">
            <button class="navbar-toggle" @click="toggleMenu">
                <span class="navbar-toggle-icon"></span>
                <span class="navbar-toggle-icon"></span>
                <span class="navbar-toggle-icon"></span>
            </button>
            <aside class="navbar-dropdown" :class="{ 'is-active': menuOpen }">
                <button class="navbar-close" @click="toggleMenu">×</button>
                <ul>
                    <li><router-link to="/" class="font-semibold text-lg">Home</router-link></li>
                    <li><router-link v-show="!isLoggedIn" to="/log-in" class="navbar-item">Log In</router-link></li>
                    <li><button v-show="isLoggedIn" @click="logOut" class="navbar-item">Log Out</button></li>
                    <li><router-link to="/shopping-cart" class="navbar-item">Shopping Cart</router-link></li>
                    <li><router-link to="/wish-list" class="navbar-item">Wish List</router-link></li>
                    <li><router-link to="/comparisons" class="navbar-item">Compare Items</router-link></li>
                </ul>
            </aside>
        </div>
    </nav>
    <router-view></router-view>
</template>

<script setup>
import { ref } from 'vue';
import { getToken, removeToken } from '../../localstorage';
import { useStore } from '../../store';

const menuOpen = ref(false);

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};

const store = useStore();
const isLoggedIn = ref(getToken(store.user));

function logOut() {
    removeToken(store.user);
    isLoggedIn.value = false; 
}
</script>

<style>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #333;
    padding: 0.5rem 1rem;
    z-index: 20;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.large-screen {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.navbar-links {
    display: flex;
    gap: 1rem;
    margin-left: auto;
}

.navbar-item {
    color: white;
    text-decoration: none;
    transition: color 0.5s ease;
}

.navbar-item:hover {
    color: #32CD32;
}

.navbar-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
}

.navbar-toggle-icon {
    display: block;
    width: 25px;
    height: 2px;
    background-color: white;
    margin: 4px 0;
    transition: all 0.3s ease;
}

.navbar-dropdown {
    display: flex;
    position: fixed;
    top: 0;
    right: -250px; /* Start off-screen */
    width: 250px;
    height: 100%;
    background-color: #333;
    color: white;
    padding: 1rem;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
    transition: right 0.3s ease;
    overflow-y: auto;
    flex-direction: column;
}

.navbar-dropdown.is-active {
    right: 0; /* Slide in from the right */
}

.navbar-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    align-self: flex-end;
    margin-bottom: 1rem;
}

.navbar-dropdown ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.navbar-dropdown li {
    margin-bottom: 0.75rem;
}

@media (max-width: 768px) {
    .navbar-toggle {
        display: block;
    }

    .navbar-dropdown {
        position: fixed;
        right: -250px;
    }

    .navbar-dropdown.is-active {
        right: 0;
    }
    
    .large-screen {
        display: none;
    }
}

@media (min-width: 769px) {
    .navbar-toggle {
        display: none;
    }

    .small-screen {
        display: none;
    }

    .large-screen {
        display: flex;
    }
}
</style>
