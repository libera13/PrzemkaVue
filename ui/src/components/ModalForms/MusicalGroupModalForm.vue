<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="info" small v-bind="attrs" v-on="on">
          Dodaj zespół muzyczny
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Dodaj zespół muzyczny</span>
        </v-card-title>
        <v-form ref="form" v-model="valid">
          <v-card-text>
            <v-text-field
              v-model.trim="data.name"
              :rules="rules.required"
              label="Nazwa"
              required
            ></v-text-field>

            <v-textarea
              v-model.trim="data.short_biography"
              label="Krótka biografia"
              :rules="rules.required_maxLength250"
              required
              rows="1"
              auto-grow
              counter="250"
            ></v-textarea>

            <v-textarea
              v-model.trim="data.biography"
              label="Biografia"
              :rules="rules.maxLength1000"
              required
              rows="1"
              auto-grow
              counter="1000"
            ></v-textarea>
            <div class="form__divGrid">
              <!--          Multi Artists-->
              <v-autocomplete
                v-model="data.artists"
                label="artyści"
                required
                :items="fromDB.artists"
                item-text="full_name"
                item-value="id"
                multiple
                chips
                deletable-chips
              ></v-autocomplete>
              <PersonaModalForm
                limitAddTo="artist"
                @added-artist="setAddedArtist"
              />
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Zamknij
            </v-btn>
            <v-btn :disabled="!valid" color="success" text @click="submit">
              Wyślij
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { axiosInstance } from '../../services/axiosInstance';
import { maxLength1000, maxLength250, required } from '../../utils/rules';
import PersonaModalForm from './PersonaModalForm';

export default {
  name: 'MusicalGroupModalForm',
  components: { PersonaModalForm },
  data: () => ({
    dialog: false,
    valid: false,
    data: {
      name: '',
      short_biography: '',
      biography: '',
      artists: null
    },
    fromDB: {
      artists: []
    },
    rules: {
      required: [required],
      maxLength1000: [maxLength1000],
      required_maxLength250: [maxLength250, required]
    }
  }),
  mounted() {
    this.getArtistsNames();
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.sendDataToDB(this.data);
        this.dialog = false;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    sendDataToDB(data) {
      axiosInstance
        .post('/musicalGroups/', JSON.stringify(data))
        .then(({ data }) => {
          this.$emit('added-musical-group', data.id);
          this.$notify({
            group: 'app',
            type: 'success',
            text: 'Pomyslnie dodano zespół muzyczny!'
          });
        })
        .catch((error) => {
          this.$notify({
            group: 'app',
            type: 'error',
            text: 'Podczas dodawania zespołu muzycznego wystąpił błąd!'
          });
          console.log('new Error', error);
        })
        .finally(() => this.reset());
    },
    async setAddedArtist(data) {
      this.fromDB.artists = await this.getArtistsNames();
      this.data.artists.push(data);
    },
    async getArtistsNames() {
      const { data } = await axiosInstance.get('/artists/');
      this.fromDB.artists = data;
      return data;
    }
  }
};
</script>

<style scoped></style>
