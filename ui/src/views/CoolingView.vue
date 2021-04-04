<template>
  <div class="wrapper companyInfo">
    <CoolingText />

    <v-img
      max-height="500px"
      src="https://raw.githubusercontent.com/libera13/PrzemkaVue/master/ui/src/assets/od_przem/20200425_121349.webp"
    ></v-img>
  </div>
</template>

<script>
import CoolingText from '@/components/Cooling/CoolingText';
export default {
  name: 'CoolingView',
  components: { CoolingText }
};
</script>

<style scoped lang="scss">
.wrapper {
  max-width: 80%;
  margin: auto;
}
.companyInfo {
  margin-top: 50px;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 40px;
  &__text {
    margin: auto 20px;
  }
}
</style>
