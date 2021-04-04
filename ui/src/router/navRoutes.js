export const navRoutes = [
  {
    path: '/cooling',
    name: 'Komory chłodnicze/Przechowalnie',
    component: () =>
      import(/* webpackChunkName: "Cooling" */ '../views/CoolingView.vue')
  },
  {
    path: '/houses',
    name: 'Domy mieszkalne',
    component: () =>
      import(/* webpackChunkName: "HousesView" */ '../views/HousesView.vue')
  },
  {
    path: '/contact',
    name: 'Kontakt',
    component: () =>
      import(/* webpackChunkName: "StorageView" */ '../views/ContactView.vue')
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
