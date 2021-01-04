<template>
  <div class="filters-card">
    <h3>Filtry</h3>
    <div class="filters">
      <!--      first_name-->
      <v-text-field
        placeholder="imię"
        @input="debounceInput($event, 'composer_first_name')"
      ></v-text-field>
      <!--      last_name-->
      <v-text-field
        placeholder="nazwisko"
        @input="debounceInput($event, 'composer_last_name')"
      ></v-text-field>
      <v-btn
        v-if="!isMoreFilters"
        small
        @click="isMoreFilters = !isMoreFilters"
      >
        {{ isMoreFilters ? 'Mniej' : 'Więcej' }}
      </v-btn>
      <transition-group name="slide-fade">
        <template v-if="isMoreFilters">
          <!--          title-->
          <v-text-field
            placeholder="tytuł"
            @input="debounceInput($event, 'title')"
            key="1"
          ></v-text-field>
          <!--          composer-->
          <v-autocomplete
            style="max-width: 150px;"
            label="kompozytor"
            :items="fromDB.composer"
            item-text="full_name"
            item-value="id"
            @input="debounceInput($event, 'composer')"
            chips
            key="2"
          ></v-autocomplete>
          <!--          instrument-->
          <v-autocomplete
            style="max-width: 150px;"
            label="instrument"
            :items="fromDB.instrument"
            item-text="name"
            item-value="id"
            @input="debounceInput($event, 'instrument')"
            chips
            key="3"
          ></v-autocomplete>
          <!--        <v-autocomplete-->
          <!--          label="Zespół muzyczny"-->
          <!--          :items="fromDB.instrumental_composition"-->
          <!--          item-text="name"-->
          <!--          item-value="id"-->
          <!--          @input="debounceInput($event, 'instrumental_composition')"-->
          <!--          chips-->
          <!--          deletable-chips-->
          <!--        ></v-autocomplete>-->
          <!--          category-->
          <v-autocomplete
            style="max-width: 150px;"
            label="kategoria"
            :items="fromDB.category"
            item-text="name"
            item-value="id"
            @input="debounceInput($event, 'category')"
            key="4"
          ></v-autocomplete>
          <!--      duration gte-->
          <div key="5">
            <h3>Czas trwania</h3>
            <div class="form__durationBox">
              <label for="durationGte">od (hh:mm:ss)</label>
              <a-time-picker
                id="durationGte"
                :default-value="moment('00:00:00', 'HH:mm:ss')"
                :open="openTimePickerGte"
                @openChange="handleOpenChangeDurationGte"
                @change="changeDurationGte"
              ></a-time-picker>
            </div>
            <!--      duration lte-->
            <div class="form__durationBox">
              <label for="durationLte">do (hh:mm:ss)</label>
              <a-time-picker
                id="durationLte"
                :default-value="moment('00:00:00', 'HH:mm:ss')"
                :open="openTimePickerLte"
                @openChange="handleOpenChangeDurationLte"
                @change="changeDurationLte"
              ></a-time-picker>
            </div>
          </div>
          <!--      duration gte-->
          <div key="6">
            <h3 style="padding: 1rem;">Rok powstania</h3>
            <v-text-field
              type="number"
              @input="debounceInput($event, 'year')"
              label="dokładny"
            ></v-text-field>
            <v-text-field
              type="number"
              @input="debounceInput($event, 'year_lte')"
              label="starsze od"
            ></v-text-field>
            <v-text-field
              type="number"
              label="młodsze od"
              @input="debounceInput($event, 'year_gte')"
            ></v-text-field>
          </div>
          <v-btn
            v-if="isMoreFilters"
            small
            @click="isMoreFilters = !isMoreFilters"
            key="7"
          >
            {{ isMoreFilters ? 'Mniej' : 'Więcej' }}
          </v-btn>
        </template>
      </transition-group>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import { axiosInstance } from '../../services/axiosInstance';
import moment from 'moment';

export default {
  name: 'CompositionsFilters',
  data() {
    return {
      filters: {
        title: null,
        composer_last_name: null,
        composer_first_name: null,
        composer: null,
        instrumental_composition: null,
        category: null,
        duration_gte: null,
        year_lte: null,
        year_gte: null,
        year: null
      },
      fromDB: {
        composer: [],
        category: [],
        instrument: [],
        instrumental_composition: [],
        artists: [],
        musicalGroups: []
      },
      openTimePickerGte: false,
      openTimePickerLte: false,
      isMoreFilters: false
    };
  },
  created() {
    this.getComposersNames();
    this.getCategoriesNames();
    this.getInstrumentsNames();
    this.getInstrumentalCompositionNames();
    // this.getArtistsNames();
    // this.getMusicalGroupsNames();
  },
  methods: {
    moment,
    debounceInput: debounce(function (e, param) {
      this.filters[param] = e;
      this.$emit('update-filters', this.filters);
    }, 500),
    async getComposersNames() {
      const { data } = await axiosInstance.get('/composers/');
      this.fromDB.composer = data;
      return data;
    },
    async getCategoriesNames() {
      const { data } = await axiosInstance.get('/categories/');
      this.fromDB.category = data;
      return data;
    },
    async getInstrumentsNames() {
      const { data } = await axiosInstance.get('/instruments/');
      this.fromDB.instrument = data;
      return data;
    },
    async getInstrumentalCompositionNames() {
      const { data } = await axiosInstance.get('/instrumental_composition/');
      this.fromDB.instrumental_composition = data;
      return data;
    },
    async getArtistsNames() {
      const { data } = await axiosInstance.get('/artists/');
      this.fromDB.artists = data;
      return data;
    },
    async getMusicalGroupsNames() {
      const { data } = await axiosInstance.get('/musicalGroups/');
      this.fromDB.musicalGroups = data;
      return data;
    },
    // duration
    handleOpenChangeDurationGte(open) {
      this.openTimePickerGte = open;
    },
    handleOpenChangeDurationLte(open) {
      this.openTimePickerLte = open;
    },
    changeDurationGte(data, time) {
      this.debounceInput(time, 'duration_gte');
    },
    changeDurationLte(data, time) {
      this.debounceInput(time, 'duration_lte');
    }
  }
};
</script>

<style scoped>
.filters {
  display: grid;
  padding: 1rem;
  min-width: 180px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
