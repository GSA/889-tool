import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ResultsView from "../views/ResultsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      alias: '/search'
    },
    {
      path: "/search/:term/:page(\\d+)?",
      name: "search",
      component: ResultsView,
    },
  ],
});

export default router;
