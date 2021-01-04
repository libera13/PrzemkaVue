<template>
  <MainView>
    <template #header>
      Dodaj utwór
    </template>
    <template #component>
      <WorkForm />
    </template>
  </MainView>
</template>

<script>
import WorkForm from '../../components/AddWork/WorkForm';
import MainView from '../../components/Common/MainView';

export default {
  name: 'AddCompositionView',
  components: { MainView, WorkForm }
};
</script>

<style scoped></style>
