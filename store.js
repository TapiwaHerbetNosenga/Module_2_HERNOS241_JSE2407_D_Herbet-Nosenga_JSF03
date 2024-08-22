import { defineStore } from 'pinia';
import { getTheme } from './localstorage';

export const useStore = defineStore('main', {
  state: () => ({
    filter: null,
    sort: null,
    user: null,
    route: null,
    theme: getTheme("theme"),
  }),

  actions: {
    setFilter(newFilter) {
      this.filter = newFilter;
    },
    setSort(newSort) {
      this.sort = newSort;
    },
    setUser(newUser) {
      this.user = newUser;
    },
    setRoute(newRoute) {
      this.route = newRoute;
    },
    clearUser() {
      this.user = null;
    }
  },
});

