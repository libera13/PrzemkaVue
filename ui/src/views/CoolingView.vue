<template>
  <article>
    <header class="mt-4">
      <h1 class="fs30">
        BEZSPOINOWA IZOLACJA TERMICZNA NATRYSKIEM PIANY POLIURTENOWEJ
      </h1>
    </header>
    <div class="wrapper companyInfo">
      <CoolingKomoraText class="maxW500 companyInfo__text" />
      <v-img
        max-height="500px"
        src="https://raw.githubusercontent.com/libera13/PrzemkaVue/master/ui/src/assets/od_przem/20200425_121349.webp"
      ></v-img>
    </div>
    <div class="wrapper companyInfo">
      <v-img
        max-height="500px"
        src="https://raw.githubusercontent.com/libera13/PrzemkaVue/master/ui/src/assets/od_przem/20190826_130948.webp"
      ></v-img>
      <CoolingPrzechowalnieText class="maxW500 companyInfo__text" />
    </div>
    <div class="wrapper companyInfo">
      <CoolingPosadzkiText class="maxW500 companyInfo__text" />

      <v-img
        max-height="500px"
        src="https://raw.githubusercontent.com/libera13/PrzemkaVue/master/ui/src/assets/od_przem/20200425_121408.webp"
      ></v-img>
    </div>
    <div class="wrapper companyInfo">
      <v-img
        max-height="500px"
        src="https://raw.githubusercontent.com/libera13/PrzemkaVue/master/ui/src/assets/od_przem/20190826_130948.webp"
      ></v-img>
      <CoolingSortownieText class="maxW500 companyInfo__text" />
    </div>
  </article>
</template>

<script>
import CoolingKomoraText from '@/components/Cooling/CoolingKomoraText';
import CoolingPrzechowalnieText from '@/components/Cooling/CoolingPrzechowalnieText';
import CoolingPosadzkiText from '@/components/Cooling/CoolingPosadzkiText';
import CoolingSortownieText from '@/components/Cooling/CoolingSortownieText';
export default {
  name: 'CoolingView',
  components: {
    CoolingSortownieText,
    CoolingPosadzkiText,
    CoolingKomoraText,
    CoolingPrzechowalnieText
  }
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
  justify-items: center;
  //align-items: center;
  grid-gap: 40px;
  &__text {
    align-self: center;
    margin: auto 20px;
  }
}
@media (max-width: 768px) {
  .companyInfo {
    grid-template-columns: 1fr;
  }
}
.maxW500 {
  max-width: 500px;
}
</style>
