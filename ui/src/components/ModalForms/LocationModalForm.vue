<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="info" small v-bind="attrs" v-on="on">
          Dodaj lokalizację
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Dodaj lokalizację</span>
        </v-card-title>
        <v-form ref="form" v-model="valid">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model.trim="data.city"
                    :rules="rules.required"
                    label="Miasto"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model.trim="data.voivodeship"
                    :rules="rules.required"
                    label="Województwo"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model.trim="data.country"
                    :rules="rules.required"
                    label="Kraj"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
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
import { required } from '../../utils/rules';

export default {
  name: 'LocationModalForm',
  data: () => ({
    dialog: false,
    valid: false,
    data: {
      city: '',
      voivodeship: '',
      country: ''
    },
    rules: {
      required: [required]
    }
  }),
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
        .post('/locations/', JSON.stringify(data))
        .then(({ data }) => {
          this.$emit('added-location', data.id);
          this.$notify({
            group: 'app',
            type: 'success',
            text: 'Pomyslnie dodano lokalizację!'
          });
        })
        .catch((error) => {
          this.$notify({
            group: 'app',
            type: 'error',
            text: 'Podczas dodawania lokalizacji wystąpił błąd!'
          });
          console.log('new Error', error);
        })
        .finally(() => this.reset());
    }
  }
};
</script>

<style scoped></style>
