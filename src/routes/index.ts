import { createRouter, createWebHistory } from 'vue-router';
import protectedRoutes from './protectedRoutes';
//import { supabase } from '@/js/supabase';
//import { useAuthStore } from '@/stores/auth';

const routes = [
  // Public Routes
  {
    name: 'Login',
    path: '/login',
    component: () => import('../views/auth/Login.vue'),
  },
  // Private Routes
  {
    path: '/layout',
    name: 'Layout',
    redirect: '/welcome',
    component: () => import('../views/Layout.vue'),
    meta: {
      authReq: true,
    },
    children: protectedRoutes,
  },
];

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
});

// navigation guard to check for logged in users
// router.beforeEach(async (to, from, next) => {
//   const auth = useAuthStore();
  
//   // Main catch
//   if (to.matched.some((record) => record.meta.authReq)) {
//     if (!auth.user) {
//       // Set url path to return to after authentication
//       auth.redirect_path = to.path;
//       next('/login');
//     } else {
//       next();
//     }
//   }
// });

export default router;