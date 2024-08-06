
import { defineStore } from 'pinia';

export const useStore = defineStore('main', {

  state: () => ({
    filter: null,
    sort: null,
  }),


  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
});

