<template>
  <div class="wrapper">
    <Persona :id="id" />
    <ComposerTable :id="id" />
  </div>
</template>

<script>
import Persona from '../../components/Common/Persona';
import ComposerTable from '../../components/Composer/ComposerTable';
export default {
  name: 'ComposerView',
  components: { ComposerTable, Persona },
  props: {
    id: String
  }
};
</script>

<style scoped>
.wrapper {
  padding: 0 100px;
  display: grid;
}
</style>
