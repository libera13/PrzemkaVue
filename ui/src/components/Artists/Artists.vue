<template>
  <div class="wrapper" data-app>
    <!--  wzięte z  https://vuetifyjs.com/en/components/data-tables/#filterable-->
    <v-data-table
      class="elevation-1 row-pointer"
      :headers="headers"
      :items="tableBody"
      :items-per-page="20"
      @click:row="handleClick"
    ></v-data-table>
    <p>artists</p>
  </div>
</template>

<script>
import { axiosInstance } from '../../services/axiosInstance';

export default {
  name: 'Artists',
  data() {
    return {
      pagination: {
        sortBy: 'full_name'
      },
      selected: [],
      headers: [
        // { text: 'Imię i nazwisko', value: 'full_name' }
        { text: 'Nazwisko', value: 'last_name' }
      ],
      tableBody: []
    };
  },
  async mounted() {
    this.tableBody = await this.getWorks();
    // this.tableBody = this.mapInstrumentsToString(data);
    // console.log('data', this.tableBody);
  },
  methods: {
    handleClick(item) {
      this.$router.push({ path: `/artist/${item.id}` });
    },
    async getWorks() {
      const { data } = await axiosInstance.get('/artists/');
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
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
