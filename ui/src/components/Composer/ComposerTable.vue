<template>
  <div class="wrapper" data-app>
    <!--  wzięte z  https://vuetifyjs.com/en/components/data-tables/#filterable-->
    <v-data-table
      :headers="headers"
      :items="tableBody"
      :items-per-page="20"
      :loading="loading"
      loading-text="Ładowanie..."
      class="elevation-1"
      no-data-text="Brak przypisanych utworów"
      @click:row="handleClick"
    ></v-data-table>
  </div>
</template>

<script>
import { axiosInstance } from '../../services/axiosInstance';

export default {
  name: 'ComposerTable',
  props: {
    id: String
  },
  data() {
    return {
      pagination: {
        sortBy: 'name'
      },
      selected: [],
      filters: {
        composer: null
      },
      headers: [
        { text: 'Tytuł', value: 'title' },
        {
          text: 'Kategoria',
          value: 'category'
        },
        { text: 'Rok powstania', value: 'year_end' }
      ],
      tableBody: [],
      loading: false
    };
  },
  computed: {
    routeFullPath() {
      return this.$route.fullPath;
    }
  },
  watch: {
    routeFullPath: {
      immediate: true,
      async handler(newValue) {
        this.tableBody = [];
        this.tableBody = await this.getData();
      }
    }
  },
  methods: {
    async getData() {
      this.loading = true;
      this.filters.composer = this.id;
      const params = this.filters;
      const { data } = await axiosInstance.get('/work/', { params });
      this.loading = false;
      return data;
    },
    handleClick(item) {
      this.$router.push({ path: `/work/${item.id}` });
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
