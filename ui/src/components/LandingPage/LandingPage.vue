<template>
  <div>
<!--    <Head :artists="artists"></Head>-->
    <v-parallax
      src="https://4termo.pl/wp-content/uploads/2019/12/4termo_up_X.jpg"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          <h1 class="display-1 font-weight-thin mb-4">
            Lorem
          </h1>
          <h4 class="subheading">
            Lorem ipsum dolor sit amet.
          </h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container>


      <v-lazy>
        <grid-cards/>
      </v-lazy>
    <Cards />

    </v-container>
    <v-lazy>
      <v-carousel hide-delimiters>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>
    </v-lazy>
    <Cards />
    <v-card class="elevation-0 transparent">
      <v-card-text class="text-xs-center">
        <v-icon x-large class="blue--text text--lighten-2">share</v-icon>
      </v-card-text>
      <v-card-title primary-title class="layout justify-center">
        <div class="headline text-xs-center">Create new connections</div>
      </v-card-title>
      <v-card-text>
        Imagine if you can directly speak with the world's population. Don't you think it would be easier to find nice people to interact with? Endorfine is both local and global and help you to connect without limitations with people from your city, your state and your universe!
      </v-card-text>
    </v-card>
    <v-card class="elevation-0 transparent">
      <v-card-text class="text-xs-center">
        <v-icon x-large class="blue--text text--lighten-2">share</v-icon>
      </v-card-text>
      <v-card-title primary-title class="layout justify-center">
        <div class="headline text-xs-center">Create new connections</div>
      </v-card-title>
      <v-card-text>
        Imagine if you can directly speak with the world's population. Don't you think it would be easier to find nice people to interact with? Endorfine is both local and global and help you to connect without limitations with people from your city, your state and your universe!
      </v-card-text>
    </v-card>
    <v-card class="elevation-0 transparent">
      <v-card-text class="text-xs-center">
        <v-icon x-large class="blue--text text--lighten-2">share</v-icon>
      </v-card-text>
      <v-card-title primary-title class="layout justify-center">
        <div class="headline text-xs-center">Create new connections</div>
      </v-card-title>
      <v-card-text>
        Imagine if you can directly speak with the world's population. Don't you think it would be easier to find nice people to interact with? Endorfine is both local and global and help you to connect without limitations with people from your city, your state and your universe!
      </v-card-text>
    </v-card>
    <section>
      <v-parallax :src="imageLink.social_cover" height="380">
        <v-layout column align-center justify-center>
          <div class="headline white--text mb-3 text-xs-center">We are dropping cool news and opportunities on socials</div>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-5">
          <v-flex xs12 sm4>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Company info</div>
              </v-card-title>
              <v-card-text>
                We are not a company. We hate companies. Just imagine us like the guys from the Silicon Valley series.
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">We are hiring</div>
              </v-card-title>
              <v-card-text>
                Are you a creative person? Do you like techy stuff? Complete the email form by writing your skills and interests
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
import Cards from "./Cards";
import GridCards from "./GridCards";
export default {
  name: 'LandingPage',
  components: {GridCards, Cards, Head, ComposersInfo, Footer },
  data: function () {
    return {
      artists: [],
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ],
      imageLink: {
        main:
          "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fb13f0434-b228-11e6-8e5d-5252025056ab_web_scale_0.4666667_0.4666667__.jpg?alt=media&token=660df23e-599e-434b-9313-ba69c973eeea",
        sub_main:
          "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2FNight-Club-Clubbing-Jobs-Abroad2.jpg?alt=media&token=82bbda7d-5df4-430b-9217-adaf1c8485c5",
        logo:
          "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fandroid-chrome-512x512.png?alt=media&token=8a0a66f6-4741-4ff6-8f28-eb9ec74374df",
        social_cover:
          "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fo-NIGHTCLUB-facebook.jpg?alt=media&token=cefc5c4c-9714-41da-9c22-f63caf5e89a4"
      },
    };
  },
  async mounted() {
    const { data } = await axiosInstance.get('/composers_landing_page/?page=1');
    this.artists = data;
  }
};
</script>

<style scoped></style>
