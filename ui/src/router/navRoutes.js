export const navRoutes = [
  {
    path: '/houses',
    name: 'Domy mieszkalne',
    component: () =>
      import(/* webpackChunkName: "HousesView" */ '../views/HousesView.vue')
  },
  {
    path: '/storage',
    name: 'Przechowalnie',
    component: () =>
      import(/* webpackChunkName: "StorageView" */ '../views/StorageView.vue')
  },
  {
    path: '/cooling',
    name: 'Komory chłodnicze',
    component: () =>
      import(/* webpackChunkName: "Cooling" */ '../views/CoolingView.vue')
  },
  {
    path: '/addWorkView',
    name: 'Dodaj utwór',
    component: () =>
      import(
        /* webpackChunkName: "AddCompositionView" */ '../views/AddWorkView/AddWorkView.vue'
      )
  },
  {
    path: '/addPerson',
    name: 'Dodaj osobę',
    component: () =>
      import(
        /* webpackChunkName: "AddComposerView" */ '../views/AddPersonView/AddPersonView.vue'
      )
  }
];
