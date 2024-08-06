import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => ({
    filter: null,
    sort: null,
  }),
  
  actions: {
    setFilter(newFilter) {
      this.filter = newFilter;
    },
    setSort(newSort) {
      this.sort = newSort;
    },
  },
});

