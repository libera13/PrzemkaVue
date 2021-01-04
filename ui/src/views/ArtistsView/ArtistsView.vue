<template>
  <MainView>
    <template #header>
      Artyści
    </template>
    <template #component>
      <ArtistsTable />
    </template>
  </MainView>
</template>
<script>
import ArtistsTable from '../../components/Artists/ArtistsTable.vue';
import MainView from '../../components/Common/MainView';

export default {
  name: 'ArtistsView',
  components: { MainView, ArtistsTable }
};
</script>

<style scoped></style>
