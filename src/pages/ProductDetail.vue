<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getCart, getList,updateCart,  getComparison, updateComparison } from '../../localstorage';

/** Represents the product details fetched from the API. */
const product = ref(null);

/** The current route instance provided by Vue Router. */
const route = useRoute();

/**
 * Fetches product details from the API based on the route parameter.
 * Sets the `product` ref to the fetched data.
 */

 

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

const limit = ref(false)

const addComparisonItem = () => {

   const compareSet=getComparison('compare');
   const compareArr = Array.from(compareSet);
   if(compareArr.length >= 5){
buttonStatus.value = true;
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
                
                <h2 class="charcoal-text xl:text-4xl md:text-2xl sm:text-xl font-bold">{{ product.title }}</h2>
                <p class="charcoal-text">Price: R{{ product.price }}</p>
                <div class="flex gap-2 justify-center">
                    <button @click="addItem" class="cart ">Add to Cart</button>
                    <button @click="addListItem" class="wishlist">Add to Wishlist</button>
                </div>
                <p class="m-1 w-fit border-sky-500 border-2 rounded-md text-white bg-sky-500 font-semibold p-1 hover:bg-sky-600 hover:border-sky-600">{{ product.category }}</p>
                <p class="charcoal-text">{{ product.description }}</p>
                <button  :disabled="limit" @click="addComparisonItem">Compare Item</button>
            </div>
        </div>
        <div v-else>
            <p class="text-red-700">Loading...</p>
        </div>
    </div>
</template>

<style>
.Img {
    max-width: 40vw;
    min-height: 40vw;
    min-width: 20vw;
    max-height: 80vw;
}

.charcoal-text {
    color: #333333
}

.cart {
    background-color: #8A2BE2;
}

.wishlist {
    background-color: #007BFF;
}
</style>
