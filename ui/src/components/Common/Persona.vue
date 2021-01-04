<template>
  <main>
    <div class="particles">
      <!--    ball, lines (num 2), cobweb num 80-->
      <particles-bg type="custom" :num="2" :config="config" />
    </div>
    <section class="summary">
      <div class="summary-image">
        <v-img
          max-width="200"
          max-height="200"
          src="https://storage.googleapis.com/catalog-production-293822/landing_page_photos/kazuo-ota-XQF09hR_jLw-unsplash%20(2).jpg"
        ></v-img>
      </div>
      <div class="summary-text">
        <!--        <h1>Juan Martín García</h1>-->
        <h1>{{ persona.full_name }}</h1>
        <v-divider></v-divider>
        <!--        <h3 class="summary-text__year">10.11.2020 - 10.02.2084</h3>-->
        <h3>{{ persona.birthdate }} - {{ persona.date_of_death }}</h3>
        <!--        <p class="summary-text__shortBio">-->
        <!--          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut corporis-->
        <!--          eius error labore officia quasi qui recusandae reiciendis, veniam-->
        <!--          voluptatem.-->
        <!--        </p>-->

        <p class="summary-text__shortBio">{{ persona.short_biography }}</p>
      </div>
    </section>
    <article class="longBio">
      <h2>Biografia</h2>
      <!--      <p>-->
      <!--        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, at-->
      <!--        aut culpa deserunt dicta dolor error excepturi fugiat iusto laborum-->
      <!--        maiores maxime minima necessitatibus nisi nostrum obcaecati odio-->
      <!--        officiis omnis optio placeat, possimus quasi qui quidem rem soluta sunt-->
      <!--        tempora tempore tenetur vitae voluptates. Illum iste laboriosam natus-->
      <!--        necessitatibus perferendis.-->
      <!--      </p>-->
      <p>{{ persona.biography }}</p>
    </article>

    <!--    <p>Artysta o id : {{ id }}</p>-->
    <!--    <p>{{ persona }}</p>-->
  </main>
</template>

<script>
import { ParticlesBg } from 'particles-bg-vue';
import { axiosInstance } from '../../services/axiosInstance';
export default {
  name: 'Persona',
  components: {
    ParticlesBg
  },
  props: {
    id: String
  },
  data() {
    return {
      persona: {},
      config: {
        num: [2, 7],
        rps: 1,
        radius: [5, 40],
        life: [1.5, 3],
        v: [0.8, 1],
        tha: [-100, 0],
        alpha: [1, 0.8],
        scale: [0.1, 0.2],
        position: 'all',
        cross: 'dead',
        color: ['#212121'],
        random: null
      }
    };
  },
  watch: {
    routeFullPath: {
      immediate: true,
      async handler(newValue) {
        this.persona = {};
        this.persona = await this.getData();
      }
    }
  },
  computed: {
    routePath() {
      return this.$route.path;
    },
    routeFullPath() {
      return this.$route.fullPath;
    }
  },
  methods: {
    async getData() {
      const url = `${this.routePath}/`;
      const { data } = await axiosInstance.get(url);
      return data;
    }
  }
};
</script>

<style scoped lang="scss">
p {
  overflow-wrap: break-word;
  max-width: 100%;
  line-height: 1.5em;
}
.particles {
  height: 134px;
  position: absolute;
  width: 100%;
}
.summary {
  z-index: 0 !important;
  margin-top: 7rem;
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  &-image {
    grid-column-start: 2;
    @media (max-width: 768px) {
      grid-column-start: 1;
    }
    max-height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-image div {
    margin: auto;
  }
  &-text {
    grid-column: span 4;
    @media (max-width: 768px) {
      grid-column: 1;
    }
    max-width: 500px;
    margin-top: 1rem;
    &__year {
      padding: 1rem 0;
    }
    &__shortBio {
    }
  }
}
.longBio {
  max-width: 500px;
  margin: 1rem auto;
  padding: 1rem;
  text-align: -webkit-left;
  border-left: 5px solid black;
}
</style>
