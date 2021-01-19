<template>
  <v-container fluid>
    <v-row>
      <v-card
        class="mx-auto"
        max-width="344"
        :key="card.title"
        color="secondary"
        v-for="card in cards"
      >
        <v-card-text>
          <v-card-title v-text="card.title"></v-card-title>

          <v-card-text>
            I'm a thing. But, like most politicians
          </v-card-text>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Cards',
  data: () => ({
    show: false,
    cards: [
      {
        title: 'lorem lorem',
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        flex: 12
      },
      {
        title: 'lorem lorem',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        flex: 6
      },
      {
        title: 'lorem lorem',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        flex: 6
      }
    ]
  })
};
</script>

<style scoped></style>
