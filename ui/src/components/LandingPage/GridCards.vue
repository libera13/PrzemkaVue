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
            <v-card-title v-text="card.title" />
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
          <v-expand-transition>
            <v-card-text v-text="card.content" />
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'GridCards',
  props: ['cards'],
  data: () => ({
    show1: false
  })
};
</script>

<style scoped></style>
