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
  name: 'Composers',
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
    this.tableBody = await this.getData();
  },
  methods: {
    handleClick(item) {
      this.$router.push({ path: `/composer/${item.id}` });
    },
    async getData() {
      const { data } = await axiosInstance.get('/composers/');
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
