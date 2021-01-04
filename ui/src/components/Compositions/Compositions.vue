<template>
  <div class="wrapper" data-app>
    <!--  wzięte z  https://vuetifyjs.com/en/components/data-tables/#filterable-->
    <v-data-table
      :headers="headers"
      :items="tableBody"
      :items-per-page="20"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
import { axiosInstance } from '../../services/axiosInstance';

export default {
  name: 'Composition',
  data() {
    return {
      pagination: {
        sortBy: 'name'
      },
      selected: [],
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Tytuł', value: 'title' },
        { text: 'Czas trwania', value: 'duration' },
        {
          text: 'Kompozytor',
          value: 'composer.full_name'
        },
        { text: 'Instrumenty', value: 'instrument' },
        { text: 'Rodzaj(kind)', value: 'kind' }
      ],
      tableBody: []
    };
  },
  async mounted() {
    const data = await this.getWorks();
    this.tableBody = this.mapInstrumentsToString(data);
    console.log('data', this.tableBody);
  },
  methods: {
    async getWorks() {
      const { data } = await axiosInstance.get('/work/');
      return data;
    },
    mapInstrumentsToString(array) {
      const data = array.map((obj) => {
        // łaczę wszystkie nazwy instrumentów w jednego stringa
        obj.instrument = obj.instrument.reduce(
          (total, currentValue, currentIndex, array) => {
            if (currentIndex === 0) return total + currentValue.name;
            else return total + ', ' + currentValue.name;
          },
          ''
        );
        return obj;
      });
      return data;
    }
  }
};
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  /*width: 500px;*/
}
</style>
