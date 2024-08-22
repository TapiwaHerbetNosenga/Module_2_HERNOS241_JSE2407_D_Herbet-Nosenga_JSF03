<script setup>
import { getCart, updateCart, getUser, createCart} from '../../localstorage';
import { useStore } from '../../store';
import { ref, onMounted } from 'vue';

const store = useStore();

let loading = ref(true);
const items = ref([]);

const fetchCartItems = async () => {
    const cartSet = getCart(store.user);
    const cartArr = Array.from(cartSet);
    for (let itemId of cartArr) {
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

const removeItem = (id) => {
    let cartSet = getCart('cart');
    let cartArr = Array.from(cartSet);
    cartArr = cartArr.filter(item => item !== id);
    cartSet = new Set(cartArr);
    updateCart('cart', cartSet);
    items.value = items.value.filter(item => item.id !== id);
};

const clearCart = () => {
    updateCart('cart', new Set());
    items.value = [];
};

onMounted(() => {
    const user = getUser('user');
 
    const cart = getCart(user);
    if (!cart || cart.size === 0) {
        createCart(user, new Set()); 
    }
    fetchCartItems();

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
                    <div class="flex flex-col justify-center items-center">
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
                    </div>
                </router-link>
                <button @click="removeItem(item.id)" class="remove font-bold flex items-center justify-center text-sm m-2">Remove</button>
            </div>
        </div>
    </div>
    <button @click="clearCart" class="clear-cart font-bold flex items-center justify-center text-sm m-2">Clear Cart</button>
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
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.remove {
    background-color: #8A2BE2;
    height: 2rem;
    width: 7rem;
}

.clear-cart {
    background-color: #FF6347;
    height: 2rem;
    width: 10rem;
    margin: 1rem auto;
}
</style>

