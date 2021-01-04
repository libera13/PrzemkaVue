<template>
  <div class="filters-card">
    <div style="display: flex; justify-content: space-around;">
      <h3>Filtry</h3>
      <!--      <v-btn small @click="resetFilters" :key="Math.random() * 8">-->
      <!--        <v-icon>mdi-backup-restore</v-icon>-->
      <!--      </v-btn>-->
    </div>
    <div class="filters">
      <!--      first_name-->
      <v-text-field
        placeholder="imię"
        @input="debounceInput($event, 'first_name')"
      ></v-text-field>
      <!--      last_name-->
      <v-text-field
        placeholder="nazwisko"
        @input="debounceInput($event, 'last_name')"
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
          <!--          location-->
          <v-autocomplete
            style="max-width: 150px;"
            label="lokalizacja"
            :items="fromDB.location"
            item-text="city"
            item-value="id"
            @input="debounceInput($event, 'location')"
            chips
            deletable-chips
            :key="Math.random() * 2"
          ></v-autocomplete>
          <!--      birthdate gte-->
          <div :key="Math.random() * 5">
            <p>Data urodzenia</p>
            <v-text-field
              type="number"
              label="większa od"
              @input="debounceInput($event, 'birthdate_gte')"
            ></v-text-field>

            <v-text-field
              type="number"
              @input="debounceInput($event, 'birthdate_lte')"
              label="mniejsza od"
            ></v-text-field>
          </div>
          <v-autocomplete
            v-if="isArtists"
            style="max-width: 150px;"
            label="zespół muzyczny"
            required
            :items="fromDB.musical_group"
            item-text="name"
            item-value="id"
            @input="debounceInput($event, 'musical_group')"
            :key="Math.random() * 6"
          ></v-autocomplete>
          <v-btn
            v-if="isMoreFilters"
            small
            @click="isMoreFilters = !isMoreFilters"
            :key="Math.random() * 7"
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
  name: 'PersonaFilters',
  props: {
    isArtists: Boolean
  },
  data() {
    return {
      filters: {
        last_name: null,
        first_name: null,
        location: null,
        birthdate_gte: null,
        birthdate_lte: null,
        musical_group: []
      },
      fromDB: {
        location: [],
        musical_group: []
      },
      openTimePickerGte: false,
      openTimePickerLte: false,
      isMoreFilters: false
    };
  },
  created() {
    this.getLocation();
    if (this.isArtists) this.getMusicalGroupsNames();
  },
  methods: {
    moment,
    debounceInput: debounce(function (e, param) {
      this.filters[param] = e;
      this.$emit('update-filters', this.filters);
    }, 500),
    async getLocation() {
      const { data } = await axiosInstance.get('/locations/');
      this.fromDB.location = data;
      return data;
    },
    async getMusicalGroupsNames() {
      const { data } = await axiosInstance.get('/musicalGroups/');
      this.fromDB.musical_group = data;
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
