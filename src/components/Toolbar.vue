<script setup>

</script>
<template >
    <div class="absolute z-0 top-10  tool xl:w-full left-0 right-0 ">

        <select class="rounded-md m-2 p-1.5">
            <option value="default">top</option>
        </select>
        <div class="flex items-center ">
            <h1 class="text-2xl">Sort by:</h1>
            <select class=" m-2 p-1.5 rounded-r-md">
            <option value="default">Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
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
