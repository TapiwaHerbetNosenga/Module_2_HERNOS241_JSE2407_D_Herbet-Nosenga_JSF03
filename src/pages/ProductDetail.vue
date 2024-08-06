<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const product = ref(null);
const route = useRoute();

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
        <div v-if="product" class="md:grid md:grid-cols-2 sm:flex sm:flex-col sm:justify-cenetr sm:items-center">
            <div>
                <img class="Img" :src="product.image" alt="Product Image">
            </div>
            <div class="py-6">
                <h2 class="charcoal-text xl:text-4xl md:text-2xl sm:text-xl font-bold">{{ product.title }}</h2>
                <p class="charcoal-text">Price: R{{ product.price }}</p>
                <div class="flex gap-2 justify-center">
                    <button class="cart ">Add to Cart</button>
                    <button class="wishlist">Add to Wishlist</button>
                </div>
                <p class="charcoal-text">{{ product.category }}</p>
                <p class="charcoal-text">{{ product.description }}</p>
            
            </div>


        </div>
        <div v-else>
            <p class="text-red-700">Loading...</p>
        </div>
    </div>
</template>
<style>
.Img {
    max-width: 80vw;
    min-height: 60vw;
}

.charcoal-text {
    color: #333333
}

.cart{
    background-color: #8A2BE2 ;
}

.wishlist{
    background-color:#007BFF  ;
}
</style>