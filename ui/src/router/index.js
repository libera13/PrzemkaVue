import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import { navRoutes } from './navRoutes';
import { mainRoutes } from './mainRoutes';

Vue.use(VueRouter);

const routes = [...navRoutes, ...mainRoutes];

const router = new VueRouter({
  routes
});

export default router;
