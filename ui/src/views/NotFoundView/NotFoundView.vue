<template>
  <MainView>
    <template #component>
      <NotFound />
    </template>
  </MainView>
</template>

<script>
import NotFound from '../../components/NotFound';
import MainView from '../../components/Common/MainView';
export default {
  name: 'NotFoundView',
  components: { MainView, NotFound }
};
</script>

<style scoped></style>
