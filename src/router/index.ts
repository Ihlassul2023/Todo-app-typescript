import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Category",
      component: () => import("../components/CategoryNote.vue"),
    },
    {
      path: "/add-category",
      name: "add-category",
      component: () => import("../components/CreateCategory.vue"),
    },
    {
      path: "/list-note/:id",
      name: "List",
      component: () => import("../components/ListNote.vue"),
    },
    {
      path: "/create-note/:id",
      name: "create-note",
      component: () => import("../components/CreateNote.vue"),
    },
  ],
});
export default router;
