<template>
  <MainView>
    <template #header>
      Kompozytorzy
    </template>
    <template #component>
      <ComposersTable />
    </template>
  </MainView>
</template>

<script>
import ComposersTable from '../../components/Composers/ComposersTable';
import MainView from '../../components/Common/MainView';
export default {
  name: 'ComposersView',
  components: { MainView, ComposersTable }
};
</script>

<style scoped></style>
