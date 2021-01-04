<template>
  <div data-app class="container">
    <PersonaFilters
      is-artists
      class="container-filters"
      @update-filters="updateFilters"
    />
    <v-data-table
      class="elevation-1 row-pointer container-table"
      :headers="headers"
      :items="tableBody"
      :items-per-page="20"
      :loading="loading"
      loading-text="Ładowanie..."
      @click:row="handleClick"
    ></v-data-table>
  </div>
</template>

<script>
import { axiosInstance } from '../../services/axiosInstance';
import PersonaFilters from '../Common/PersonaFilters';

export default {
  name: 'ArtistsTable',
  components: { PersonaFilters },
  data() {
    return {
      filters: {},
      pagination: {
        sortBy: 'full_name'
      },
      selected: [],
      headers: [{ text: 'Imię i nazwisko', value: 'full_name' }],
      tableBody: [],
      loading: true
    };
  },
  async mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      const params = this.filters;
      try {
        const { data } = await axiosInstance.get('/artists/', { params });
        this.tableBody = data;
        this.loading = false;
      } catch (e) {
        this.$notify({
          group: 'app',
          type: 'error',
          text: 'Podczas wyszukiwania wystąpił błąd!'
        });
        console.log('new Error', e);
        this.loading = false;
      }
    },
    handleClick(item) {
      this.$router.push({ path: `/artist/${item.id}` });
    },
    updateFilters(payload) {
      this.filters = payload;
      this.getData();
    }
  }
};
</script>

<style scoped lang="scss">
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
.container {
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
