<template>
  <div class="form">
    <!--    wzięte z https://vuetifyjs.com/en/components/forms/#usage-->
    <v-form ref="form" v-model="valid">
      <v-checkbox
        v-model="data.role_id"
        label="Artysta"
        :value="2"
      ></v-checkbox>
      <v-checkbox
        v-model="data.role_id"
        label="Kompozytor"
        :value="3"
      ></v-checkbox>
      <p style="color: rgba(0, 0, 0, 0.87);" v-if="!isRoleSelected">
        proszę zaznaczyć przynajmniej jedną z opcji
      </p>
      <v-text-field
        v-model.trim="data.first_name"
        :rules="rules.required"
        label="imię"
        required
      ></v-text-field>

      <v-text-field
        v-model.trim="data.last_name"
        :rules="rules.required"
        label="nazwisko"
        required
      ></v-text-field>

      <v-text-field
        type="date"
        v-model="data.birthdate"
        label="data urodzenia"
        :rules="rules.required"
      ></v-text-field>

      <v-switch v-model="isDateOfDeath" :label="`Data zgonu`"></v-switch>

      <v-text-field
        v-if="isDateOfDeath"
        type="date"
        v-model="data.date_of_death"
        label="data zgonu"
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
        rows="1"
        auto-grow
        counter="1000"
      ></v-textarea>

      <!--      instruments-->
      <div class="form__divGrid">
        <v-autocomplete
          v-model="data.locations"
          :rules="rules.required"
          label="Lokalizacja"
          required
          :items="fromDB.locations"
          item-text="city"
          item-value="id"
          multiple
          deletable-chips
          chips
        ></v-autocomplete>
        <LocationModalForm @added-location="setAddedLocation" />
      </div>

      <v-btn
        :disabled="!valid || !isRoleSelected"
        color="success"
        class="mr-4"
        @click="submit"
      >
        Wyślij
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset">
        Reset
      </v-btn>

      <v-btn
        v-if="isInModal"
        color="blue darken-1"
        text
        @click="$emit('dialog-open', false)"
      >
        Zamknij
      </v-btn>
      <v-btn :disabled="valid" color="success" class="mr-4" @click="validate">
        Sprawdź
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { axiosInstance } from '../../services/axiosInstance';
import { maxLength1000, maxLength250, required } from '../../utils/rules';
import LocationModalForm from '../ModalForms/LocationModalForm';
const obj = {
  first_name: '',
  last_name: '',
  birthdate: '',
  role_id: [],
  date_of_death: '',
  locations: [],
  short_biography: '',
  biography: ''
};
export default {
  name: 'PersonaForm',
  components: { LocationModalForm },
  props: {
    isInModal: {
      type: Boolean,
      default: false
    },
    limitAddTo: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    valid: false,
    data: { ...obj },
    fromDB: {
      locations: []
    },
    rules: {
      required: [required],
      maxLength1000: [maxLength1000],
      required_maxLength250: [maxLength250, required]
    },
    isDateOfDeath: false,
    isRoleSelected: false
  }),
  async mounted() {
    this.getLocation();
  },
  computed: {
    onlyArtists() {
      return this.limitAddTo === 'artist';
    },
    onlyComposers() {
      return this.limitAddTo === 'composer';
    },
    fullName() {
      return `${this.data.first_name} ${this.data.last_name}`;
    },
    dataRoleId() {
      return this.data.role_id;
    }
  },
  watch: {
    dataRoleId: {
      handler() {
        this.isRoleSelected = this.dataRoleId.length > 0;
      }
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        const dataToSend = { ...this.data };
        if (!dataToSend.date_of_death) delete dataToSend.date_of_death;
        this.sendDataToDB(dataToSend);
      }
    },
    reset() {
      this.$refs.form.reset();
      this.data = { ...obj };
    },
    sendDataToDB(data) {
      // TODO: Zmienić POSTa na /user/, w chwili pisania takie url nie istnieje

      const url = '/user/';

      axiosInstance
        .post(url, JSON.stringify(data))
        .then(({ data }) => {
          // TODO: zmienić na full_name, gdy już będzie !!!
          if (this.isInModal) {
            if (this.onlyArtists) this.$emit('added-artist', data.id);
            if (this.onlyComposers) this.$emit('added-composer', data.id);
            this.$emit('dialog-open', false);
          }

          this.$notify({
            group: 'app',
            type: 'success',
            text: 'Pomyslnie dodano osobę!'
          });
          this.reset();
        })
        .catch((error) => {
          this.$notify({
            group: 'app',
            type: 'error',
            text: 'Podczas dodawania osoby wystąpił błąd!'
          });
          console.log('new Error', error);
        });
    },
    async getLocation() {
      const { data } = await axiosInstance.get('/locations/');
      this.fromDB.locations = data;
      return data;
    },
    async setAddedLocation(data) {
      this.fromDB.locations = await this.getLocation();
      this.data.locations.push(data);
    }
  }
};
</script>

<style scoped lang="scss">
.form {
  margin: auto;
  width: 500px;
  &__divGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
}
</style>
