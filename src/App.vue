<script setup>
import Layout from './components/Layout.vue';
import { ref, onMounted } from 'vue';
import { useStore } from '../store';
import { setTheme, getTheme } from '../localstorage';

const store = useStore();
const theme = ref(store.theme);

const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light';
    theme.value = newTheme;
    store.theme = newTheme;
    setTheme('theme', newTheme);
    document.documentElement.className = newTheme + '-theme';
};

onMounted(() => {
    const savedTheme = getTheme('theme') || 'light';
    theme.value = savedTheme;
    store.theme = savedTheme;
    document.documentElement.className = savedTheme + '-theme';
});
</script>

<template>
  <div :class="theme + '-theme'">
      <Layout />
      <router-view />
      <button @click="toggleTheme" class="theme-button">Toggle Theme</button>
  </div>
</template>

<style scoped>
.theme-button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  background-color: #ff6f00; 
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.25s, border-color 0.25s;
  position: fixed;
  bottom: 2vw;
  left: 2vw;
}

.theme-button:hover {
  background-color: #e65c00; 
}
</style>

