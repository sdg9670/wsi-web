import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: { name: 'authLogin' },
  },
  {
    path: '/auth/login',
    name: 'authLogin',
    component: () => import('../views/auth/Login.vue'),
  },
  {
    path: '/auth/register',
    name: 'authRegister',
    component: () => import('../views/auth/Register.vue'),
  },
  {
    path: '/auth/authEmail',
    name: 'authEmail',
    component: () => import('../views/auth/AuthEmail.vue'),
    props: true,
  },
  {
    path: '/auth/resetPwd',
    name: 'resetPwd',
    component: () => import('../views/auth/ResetPwd.vue'),
    props: route => ({
      authKey: route.query.authKey,
      email: route.query.email,
    }),
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/Main.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
