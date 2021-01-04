<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="info" small v-bind="attrs" v-on="on">
          Dodaj skład instrum...
        </v-btn>
      </template>
      <v-card height="80vh">
        <v-card-title>
          <span class="headline">Dodaj skład instrumentalny</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model.trim="data.name"
              :rules="rules.required"
              label="Nazwa"
              required
            ></v-text-field>
            <div class="form__divGrid-withGap">
              <v-autocomplete
                :key="`movements-${index}`"
                v-for="(item, index) in data.instrument"
                v-model="item.id"
                :rules="rules.required"
                label="Instrument"
                required
                :items="fromDB.instrument"
                item-text="name"
                item-value="id"
                chips
                deletable-chips
                append-outer-icon="mdi-plus"
                :append-icon="showCorrectIcon('mdi-minus', index)"
                @click:append-outer="addField(index)"
                @click:append="deleteField(index)"
              ></v-autocomplete>
              <InstrumentModalForm @added-instrument="setAddedInstrument" />
            </div>
          </v-form>
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
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { axiosInstance } from '../../services/axiosInstance';
import { required } from '../../utils/rules';
import InstrumentModalForm from '../ModalForms/InstrumentModalForm';

export default {
  name: 'InstrumentalCompositionModalForm',
  components: {
    InstrumentModalForm
  },
  data: () => ({
    dialog: false,
    valid: false,
    rules: {
      required: [required]
    },
    data: {
      name: '',
      instrument: [{ id: null }]
    },
    fromDB: {
      instrument: []
    }
  }),
  async mounted() {
    this.getInstrumentsNames();
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        const dataToSend = { ...this.data };
        // instrument logic
        if (Array.isArray(dataToSend.instrument))
          dataToSend.instrument = this.mapIdsListToList(dataToSend.instrument);
        this.sendDataToDB(dataToSend);
        this.dialog = false;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    mapIdsListToList(list) {
      return list.map((item) => item.id);
    },
    sendDataToDB(data) {
      axiosInstance
        .post('/instrumental_composition/', JSON.stringify(data))
        .then(({ data }) => {
          this.$emit('added-instrumental-composition', data.id);
          this.$notify({
            group: 'app',
            type: 'success',
            text: 'Pomyslnie dodano skład instrumentalny!'
          });
        })
        .catch((error) => {
          this.$notify({
            group: 'app',
            type: 'error',
            text: 'Podczas dodawania składu instrumentalnego wystąpił błąd!'
          });
          console.log('new Error', error);
        })
        .finally(() => this.reset());
    },
    async getInstrumentsNames() {
      const { data } = await axiosInstance.get('/instruments/');
      this.fromDB.instrument = data;
      return data;
    },
    async setAddedInstrument(id) {
      this.fromDB.instrument = await this.getInstrumentsNames();
      const obj = { id: id };
      this.data.instrument.push(obj);
    },
    showCorrectIcon(item, index) {
      if (index === 0) return '';
      else return item;
    },
    addField(index) {
      const item = { id: null };
      this.data.instrument.splice(index + 1, 0, item);
    },
    deleteField(counter) {
      this.data.instrument.splice(counter, 1);
    }
  }
};
</script>

<style scoped lang="scss">
.form {
  &__divGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    &-withGap {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      grid-column-gap: 1rem;
    }
  }
}
</style>
