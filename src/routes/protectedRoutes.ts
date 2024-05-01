export default [
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('../views/pages/Welcome.vue'),
  },

  {
    path: '/charts',
    name: 'Charts',
    component: () => import('../views/pages/Charts.vue'),
  },
]