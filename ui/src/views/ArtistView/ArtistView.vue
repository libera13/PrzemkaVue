<template>
  <Persona :id="id" />
</template>

<script>
import Persona from '../../components/Common/Persona';
export default {
  name: 'ArtistView',
  components: { Persona },
  props: {
    id: String
  }
};
</script>

<style scoped></style>
