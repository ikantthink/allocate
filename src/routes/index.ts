import { createRouter, createWebHistory } from 'vue-router'
import protectedRoutes from './protectedRoutes';
import { useAuthStore } from '../stores/auth';

const routes = [
  // Public Routes
  {
    name: 'Login',
    path: '/login',
    component: () => import('../views/auth/Login.vue'),
  },
  // Private Routes
  {
    path: '/',
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
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const authed = await authStore.isLoggedIn()
  console.log('authed', authed, from)
  if (authed && to.name == 'Login') {
    next('/')
  }
  // auth is required
  if (to.matched.some((record) => record.meta.authReq)) {
    if (!authed) {
      // Set url path to return to after authentication
      authStore.redirect_path = to.path;
      next('/login')
    } else {
      next()
    }
  } 
  // auth not required
  else {
    next()
  }
});

export default router;