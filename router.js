import { createRouter, createWebHistory } from "vue-router";
import Home from "./src/pages/Home.vue";
import ShoppingCart from "./src/pages/ShoppingCart.vue";
import ProductDetail from "./src/pages/ProductDetail.vue";
import WishList from "./src/pages/WishList.vue";
import Layout from "./src/components/Layout.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      { path: "", component: Home },
      { path: "product-detail/:id", component: ProductDetail },
      { path: "shopping-cart", component: ShoppingCart },
      { path: "wish-list", component: WishList },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
