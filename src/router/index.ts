import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Category",
      component: () => import("../components/CategoryNote.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/add-category",
      name: "add-category",
      component: () => import("../components/CreateCategory.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/list-note/:id",
      name: "List",
      component: () => import("../components/ListNote.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/all-todos/:id",
      name: "allTodos",
      component: () => import("../components/AllTodos.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/create-note/:id",
      name: "create-note",
      component: () => import("../components/CreateNote.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/create-postscript/:id",
      name: "create-postscript",
      component: () => import("../components/CreatePostScript.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../components/Register.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../components/Login.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});
export default router;
