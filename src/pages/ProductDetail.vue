<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getCart, getList, updateCart, getComparison, updateComparison } from '../../localstorage';

const product = ref(null);
const route = useRoute();
const limit = ref(false);

const addItem = () => {
    const cart = getCart('cart');
    const productId = route.params.id;
    cart.add(productId);  
    updateCart('cart', cart);
};

const addListItem = () => {
    const list = getList('list');
    const productId = route.params.id;
    list.add(productId);  
    updateCart('list', list);
};

const addComparisonItem = () => {
    const compareSet = getComparison('compare');
    const compareArr = Array.from(compareSet);
    if (compareArr.length >= 5) {
        limit.value = true;
        return;
    }
    const comparison = getComparison('compare'); 
    const productId = route.params.id;
    comparison.add(productId);  
    updateComparison('compare', comparison); 
};

onMounted(async () => {
    try {
        const productId = route.params.id;
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json();
        product.value = data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
</script>

<template>
    <div class="my-16">
        <div v-if="product" class="md:grid md:grid-cols-2 flex flex-col justify-center items-center">
            <div class="p-2 bg-white rounded-lg">
                <img :src="product.image" class="Img" alt="Product Image">      
            </div>
            <div class="py-6 flex flex-col items-center ">
                <h2 class="product-title xl:text-4xl md:text-2xl sm:text-xl font-bold">{{ product.title }}</h2>
                <p class="product-price">Price: R{{ product.price }}</p>
                <div class="flex gap-2 justify-center">
                    <button @click="addItem" class="cart">Add to Cart</button>
                    <button @click="addListItem" class="wishlist">Add to Wishlist</button>
                </div>
                <p class="category-tag m-1 w-fit  border-2 rounded-md text-white bg-sky-500 font-semibold p-1 hover:bg-sky-600 hover:border-sky-600">{{ product.category }}</p>
                <p class="product-description">{{ product.description }}</p>
                <button :disabled="limit" @click="addComparisonItem" class="wishlist">Compare Item</button>
            </div>
        </div>
        <div v-else>
            <p class="text-red-700">Loading...</p>
        </div>
    </div>
</template>

<style scoped>
:root {
    --text-light: #333333;
    --text-dark: #F0F0F0;
}

[data-theme="light"] {
    --text-color: var(--text-light);
}

[data-theme="dark"] {
    --text-color: var(--text-dark);
}

.Img {
    max-width: 40vw;
    min-height: 40vw;
    min-width: 20vw;
    max-height: 80vw;
}

.product-title, .product-price, .product-description {
    color: var(--text-color);
}

.category-tag {
    color: var(--text-color);
}

.cart {
    background-color: #8A2BE2;
}

.wishlist {
    background-color: #007BFF;
}
</style>
