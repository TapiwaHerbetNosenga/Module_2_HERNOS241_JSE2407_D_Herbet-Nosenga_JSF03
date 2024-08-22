import { createRouter, createWebHistory } from "vue-router";
import Home from "./src/pages/Home.vue";
import ShoppingCart from "./src/pages/ShoppingCart.vue";
import ProductDetail from "./src/pages/ProductDetail.vue";
import WishList from "./src/pages/WishList.vue";
import Layout from "./src/components/Layout.vue";
import Login from "./src/pages/Login.vue";
import Comparisons from "./src/pages/Comparisons.vue";
import { useStore } from "./store";
import { getToken } from "./localstorage";
import { ref } from "vue";



const store = useStore;




const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      { path: "", component: Home },
      {
        path: "product-detail/:id",
        component: ProductDetail,
      },
      {
        path: "shopping-cart",
        component: ShoppingCart,
        beforeEnter: (to, from, next) => {
          const store = useStore();
          const user = store.user;
          store.setRoute(to.fullPath)
          if (getToken(user)) {
            next();
          } else {
         
           console.log(store.route)
            next("/log-in");
          }
        },
      },
      {
        path: "wish-list",
        component: WishList,
        beforeEnter: (to, from, next) => {
          const store = useStore();
          const user = store.user;
          if (getToken(user)) {
            next();
          } else {

            next("/log-in");
          }
        },
      },
      {
        path: "comparisons",
        component: Comparisons,
        beforeEnter: (to, from, next) => {
          const store = useStore();
          const user = store.user;
          if (getToken(user)) {
            next();
          } else {

            next("/log-in");
          }
        },
      },
      { path: "log-in", component: Login },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
