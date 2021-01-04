<template>
  <MainView>
    <template #header>
      Strona ze szczegółami o kompozycji w budowie
    </template>
    <template #component>
      <Clock />
    </template>
  </MainView>
</template>

<script>
import MainView from '../../components/Common/MainView';
import Clock from '../../components/Composition/Clock';
export default {
  name: 'CompositionView',
  components: { Clock, MainView }
};
</script>

<style scoped></style>
