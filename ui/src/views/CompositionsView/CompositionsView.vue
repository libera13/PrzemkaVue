<template>
  <MainView>
    <template #header>
      Kompozycje
    </template>
    <template #component>
      <CompositionsTable />
    </template>
  </MainView>
</template>

<script>
import CompositionsTable from '../../components/Compositions/CompositionsTable.vue';
import MainView from '../../components/Common/MainView';

export default {
  name: 'CompositionView',
  components: { MainView, CompositionsTable }
};
</script>

<style scoped></style>
