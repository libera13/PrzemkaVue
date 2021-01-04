export const navRoutes = [
  {
    path: '/compositions',
    name: 'Kompozycje',
    component: () =>
      import(
        /* webpackChunkName: "Compositions" */ '../views/CompositionsView/CompositionsView.vue'
      )
  },
  {
    path: '/artists',
    name: 'Artyści',
    component: () =>
      import(
        /* webpackChunkName: "Artists" */ '../views/ArtistsView/ArtistsView.vue'
      )
  },
  {
    path: '/composers',
    name: 'Kompozytorzy',
    component: () =>
      import(
        /* webpackChunkName: "Artists" */ '../views/ComposersView/ComposersView.vue'
      )
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
