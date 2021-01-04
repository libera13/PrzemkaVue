<template>
  <div data-app class="compositions">
    <CompositionsFilters
      class="compositions-filters"
      @update-filters="updateFilters"
    />
    <v-data-table
      :headers="headers"
      :items="tableBody"
      :items-per-page="20"
      class="elevation-1 compositions-table"
      :loading="loading"
      loading-text="Ładowanie..."
      @click:row="handleClick"
    ></v-data-table>
  </div>
</template>

<script>
import { axiosInstance } from '../../services/axiosInstance';
import CompositionsFilters from './CompositionsFilters';
export default {
  name: 'CompositionsTable',
  components: { CompositionsFilters },
  data() {
    return {
      filters: {},
      pagination: {
        sortBy: 'title'
      },
      selected: [],
      headers: [
        { text: 'Tytuł', value: 'title' },
        {
          text: 'Kompozytor',
          value: 'composer.full_name'
        },
        { text: 'Rok powstania', value: 'year_end' }
      ],
      tableBody: [],
      loading: true
    };
  },
  async mounted() {
    this.getWorks();
  },
  methods: {
    async getWorks() {
      this.loading = true;
      const params = this.filters;
      try {
        const { data } = await axiosInstance.get('/work/', { params });
        this.tableBody = data;
        this.loading = false;
      } catch (error) {
        this.$notify({
          group: 'app',
          type: 'error',
          text: 'Podczas wyszukiwania wystąpił błąd!'
        });
        console.log('new Error', error);
        this.loading = false;
      }
    },
    handleClick(item) {
      this.$router.push({ path: `/work/${item.id}` });
    },
    updateFilters(payload) {
      this.filters = payload;
      this.getWorks();
    }
  }
};
</script>

<style scoped lang="scss">
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
.compositions {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  &-table {
    grid-column: span 4;
    @media (max-width: 768px) {
      grid-column: span 1;
    }
  }
  &-filters {
    margin-right: 1rem;
    height: fit-content;
    max-width: 180px;
    @media (max-width: 768px) {
      margin: auto;
    }
  }
}
</style>
