<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
        <v-card>
          <v-img
            :src="card.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="card.title"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>


          </v-card-actions>
          <v-expand-transition>
              <v-card-text>
                I'm a thing. But, like most politicians
              </v-card-text>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'GridCards',
  data: () => ({
    show1: false,
    cards: [
      // {
      //   title: 'Pre-fab homes',
      //   src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
      //   flex: 12
      // },
      {
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        flex: 6
      },
      {
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        flex: 6
      }
    ]
  })
};
</script>

<style scoped></style>
