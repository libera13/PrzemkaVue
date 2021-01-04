<template>
  <div class="about">
    <AboutInfo></AboutInfo>
  </div>
</template>
<script>
import AboutInfo from '../components/About/AboutInfo';
export default {
  name: 'Home',
  components: {
    AboutInfo
  },
  mounted() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
};
</script>
<style lang="scss" scoped>
.about {
  margin-top: 60px;
  background-color: #f1f1f1;
}
</style>
