import {createRouter,createWebHistory} from "vue-router";
import AdminDashboard from "@/views/pages/AdminDashboard";
import LoginPage from "@/views/auth/LoginPage";
import RegisterPage from "@/views/auth/RegisterPage";
import store from "@/store";
import TaskPage from "@/views/pages/TaskPage.vue";


const routes = [
    {
        path:'/',
        name : LoginPage,
        component: LoginPage,
        meta: { guest: true },
    },
    {
        path:'/register',
        name : RegisterPage,
        component: RegisterPage,
        meta: { guest: true },
    },


    {
        path:'/dashboard',
        name : AdminDashboard,
        component: AdminDashboard,
        meta: { requiresAuth: true },
    },

    {
        path:'/task',
        name : TaskPage,
        component: TaskPage,
        meta: { requiresAuth: true },
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.GET_AUTH_STATUS) {
            next({
                path: '/',
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (store.getters.GET_AUTH_STATUS) {
            next({
                path: '/dashboard',
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;