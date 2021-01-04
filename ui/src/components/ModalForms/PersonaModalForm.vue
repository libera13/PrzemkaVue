<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="info" small v-bind="attrs" v-on="on">
          {{ getText }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ getText }}</span>
        </v-card-title>
        <PersonaForm
          is-in-modal
          :limit-add-to="limitAddTo"
          @dialog-open="toggleDialog"
          @added-artist="$emit('added-artist', $event)"
          @added-composer="$emit('added-composer', $event)"
        />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import PersonaForm from '../AddPerson/PersonaForm';

export default {
  name: 'PersonaModalForm',
  components: { PersonaForm },
  props: {
    limitAddTo: {
      type: String
    }
  },
  data: () => ({
    dialog: false
  }),
  computed: {
    getText() {
      if (this.onlyArtists) return 'Dodaj artystę';
      else if (this.onlyComposers) return 'Dodaj kompozytora';
      else return 'Dodaj';
    },
    onlyArtists() {
      return this.limitAddTo === 'artist';
    },
    onlyComposers() {
      return this.limitAddTo === 'composer';
    }
  },
  methods: {
    toggleDialog(value) {
      this.dialog = value;
    }
  }
};
</script>

<style scoped></style>
