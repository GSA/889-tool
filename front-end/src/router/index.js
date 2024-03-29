import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ResultsView from "../views/ResultsView.vue";
import NotFound from "../views/NotFound.vue";
import PDFView from "../views/PDFView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      alias: "/search",
    },
    {
      path: "/search/:term/:page(\\d+)?",
      name: "search",
      component: ResultsView,
    },
    {
      path: "/pdf/:entity_index",
      name: "pdf",
      component: PDFView,
      props: true,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
