import { createRouter, createWebHistory } from "vue-router";
// setup routes
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Category",
      component: () => import("../components/CategoryNote.vue"),
    },
    {
      path: "/list-note",
      name: "List",
      component: () => import("../components/ListNote.vue"),
    },
  ],
});
export default router;
