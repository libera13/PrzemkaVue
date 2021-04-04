<template>
  <div class="wrapper">
    <!--    <Head :artists="artists"></Head>-->

    <v-lazy style="margin-top: 20vh;">
      <v-carousel
        continuous
        cycle
        progress
        height="60vh"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
      >
        <v-carousel-item
          active-class="carousel-item"
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>
    </v-lazy>
    <div class="companyInfo">
      <CompanyInfo class="companyInfo__text mt10" />
      <v-img
        max-height="500px"
        src="https://raw.githubusercontent.com/libera13/PrzemkaVue/master/ui/src/assets/od_przem/photo-1567974772901-1365e616baa9.webp"
      ></v-img>
    </div>
    <v-img
      max-height="500px"
      src="https://raw.githubusercontent.com/libera13/PrzemkaVue/master/ui/src/assets/od_przem/egor-myznik-DTBFc74UVNM-unsplash.webp"
    ></v-img>
    <v-parallax
      class="mt10"
      src="https://4termo.pl/wp-content/uploads/2019/12/4termo_up_X.jpg"
    >
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">
            Termoizolacje natryskową pianą PUR
          </h1>
          <h4 class="subheading">
            Masz pytania? Zadzwoń - tel: 506 067 738
          </h4>
        </v-col>
      </v-row>
    </v-parallax>

    <v-container>
      <v-lazy>
        <grid-cards
          :cards="[
            // {
            //   title: 'Pre-fab homes',
            //   src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
            //   flex: 12
            // },
            {
              title: 'Natrysk piany PUR',
              content:
                'Jesteśmy ekspertami w technologii natrysku sztywnej piany poliuretanowej. Ocieplenia pianką PUR to rozwiązanie uniwersalne i przynoszące najlepsze efekty.',
              src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
              flex: 6
            },
            {
              title: 'Termoizolacje i hydroizolacje dachów',
              content:
                'Chcesz uszczelnić dach i zaoszczędzić energię elektryczną w swoim domu, firmie lub gospodarstwie rolnym? Zapewniamy najwyższą jakość wykonania i gwarancję nawet do 30 lat!',
              src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
              flex: 6
            }
          ]"
        />
      </v-lazy>
      <!--      <Cards />-->
    </v-container>

    <!--    <img src="./../../assets/od_przem/20190925_132340.webp" alt="hahah" />-->
    <!--    <Cards />-->
    <v-card class="elevation-0 transparent">
      <v-card-title primary-title class="layout justify-center">
        <div class="headline text-xs-center">
          Zalety piany poliuretanowej
        </div>
      </v-card-title>
    </v-card>
    <AnimatedCircles />

    <v-card class="elevation-0 transparent">
      <v-card-title primary-title class="layout justify-center">
        <div class="headline text-xs-center">
          Budynki mieszkalne szkieletowe...
        </div>
      </v-card-title>
      <v-card-text>
        Dzięki wysokim parametrom izolacyjnym i właściwościom mechanicznym piany
        PUR domy przez nas ocieplane spełniają wymagania budownictwa pasywnego.
        Już niewielkiej grubości bezszwowe ocieplenie pianą poliuretanową
        zastosowane w ścianach i stropach budynku szkieletowego, ociepla go w
        sposób nieporównywalnie lepszy od metod klasycznych - oraz dodatkowo
        usztywnia.
      </v-card-text>
    </v-card>
    <v-card class="elevation-0 transparent">
      <v-card-title primary-title class="layout justify-center">
        <div class="headline text-xs-center">Poddasza użytkowe…</div>
      </v-card-title>
      <v-card-text>
        Stosowana przez PURIZOL technologia bezszwowej izolacji pianą PUR
        najskuteczniej hamuje latem napływ na poddasze energii cieplnej z
        zewnątrz i jej odpływ od wewnątrz zimą. Dodatkowo chroni dach przed
        wilgocią, wzmacnia go i co nie pozostaje bez znaczenia dla
        funkcjonalności poddasza - nie zmniejsza jego kubatury.
      </v-card-text>
    </v-card>
    <v-card class="elevation-0 transparent">
      <v-card-title primary-title class="layout justify-center">
        <div class="headline text-xs-center">
          Stropy, stropodachy , piwnice…
        </div>
      </v-card-title>
      <v-card-text>
        Realizujemy montaż piany poliuretanowej na stropach, stropodachach i w
        piwnicach budynków mieszkalnych zapewniając tym samym paraizolacje –
        nienasiąkliwą warstwę izolacyjną pozbawioną mostków termicznych, która
        jako jedyny izolator jest odporna na agresywne środowisko chemiczne i
        zachowuje niezmienne w czasie parametry fizyczne.
      </v-card-text>
    </v-card>
    <section>
      <v-parallax :src="imageLink.social_cover" height="380">
        <v-layout column align-center justify-center>
          <div class="headline white--text mb-3 text-xs-center">
            We are dropping cool news and opportunities on socials
          </div>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-5">
          <v-flex xs12 sm4>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">O nas</div>
              </v-card-title>
              <v-card-text>
                Tworzymy młody zespół, ale z długim doświadczeniem w tej branży
                zdobywanym w kraju i w USA. Nasza firma powstała na fundamencie
                dużego gospodarstwa rolnego, możemy śmiało powiedzieć, że
                problemy związane z termoizolacją magazynów, elewatorów,
                przechowalni i wszelkich budynków inwentarskich znamy od
                podszewki.
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Kariera</div>
              </v-card-title>
              <v-card-text>
                W związku z dynamicznym rozwojem firmy poszukujemy sumiennego i
                komunikatywnego przedstawiciela handlowego, który dobrze się
                czuje podczas delegacji.
                <br />
                Kontakt 898-989-898
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <v-lazy><Footer></Footer></v-lazy>
  </div>
</template>

<script>
import Head from './Head';
import ComposersInfo from './ComposersInfo';
import Footer from './Footer';
import { axiosInstance } from '../../services/axiosInstance';
import Cards from './Cards';
import roofImage from '../../assets/callum-hill-oamw52SCGi0-unsplash.jpg';
import GridCards from './GridCards';
import AnimatedCircles from '@/components/LandingPage/AnimatedCircles';
import CompanyInfo from '@/components/LandingPage/CompanyInfo';
export default {
  name: 'LandingPage',
  components: {
    CompanyInfo,
    AnimatedCircles,
    GridCards,
    Cards,
    Head,
    ComposersInfo,
    Footer
  },
  data: function () {
    return {
      artists: [],
      items: [
        {
          src:
            'https://raw.githubusercontent.com/libera13/PrzemkaVue/master/ui/src/assets/od_przem/20200730_151611.webp'
        },
        {
          src:
            'https://raw.githubusercontent.com/libera13/PrzemkaVue/master/ui/src/assets/od_przem/20180517_085551.webp'
        },
        {
          src:
            'https://raw.githubusercontent.com/libera13/PrzemkaVue/master/ui/src/assets/od_przem/20200518_163151.webp'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ],
      imageLink: {
        main:
          'https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fb13f0434-b228-11e6-8e5d-5252025056ab_web_scale_0.4666667_0.4666667__.jpg?alt=media&token=660df23e-599e-434b-9313-ba69c973eeea',
        sub_main:
          'https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2FNight-Club-Clubbing-Jobs-Abroad2.jpg?alt=media&token=82bbda7d-5df4-430b-9217-adaf1c8485c5',
        logo:
          'https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fandroid-chrome-512x512.png?alt=media&token=8a0a66f6-4741-4ff6-8f28-eb9ec74374df',
        social_cover: roofImage
      }
    };
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  max-width: 80%;
  margin: auto;
}
.carousel-item ::v-deep .v-image__image--cover {
  background-position: center bottom;
  /*width: 500px;*/
}
.companyInfo {
  margin-top: 50px;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  &__text {
    margin: auto 20px;
  }
}
</style>
