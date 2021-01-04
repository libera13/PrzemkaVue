import Home from '../views/Home.vue';

export const mainRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/LandingPage/LandingPage.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView/NotFoundView.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/artist/:id',
    name: 'artist',
    component: () =>
      import(
        /* webpackChunkName: "Artists" */ '../views/ArtistView/ArtistView.vue'
      ),
    props: (route) => ({ ...route.query, ...route.params })
  },
  // don't change name. it's used to make requests
  {
    path: '/composer/:id',
    name: 'composer',
    component: () =>
      import(
        /* webpackChunkName: "Artists" */ '../views/ComposerView/ComposerView.vue'
      ),
    props: (route) => ({ ...route.query, ...route.params })
  },
  {
    path: '/work/:id',
    name: 'work',
    component: () =>
      import(
        /* webpackChunkName: "Artists" */ '../views/CompositionView/CompositionView.vue'
      ),
    props: (route) => ({ ...route.query, ...route.params })
  }
];
