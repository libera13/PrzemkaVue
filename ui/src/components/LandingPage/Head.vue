<template>
  <div class="headContainer">
    <div class="headgifBackground">
      <img
        src="https://storage.googleapis.com/catalog-production-293822/landing_page_photos/landing_page.jpg?fbclid=IwAR2qPLb3s39n4s-Y7yJCSceNgpt_rQj81Il5DMEO4UsClCrd51Vf4VEqPaQ"
        class="headgif--blurred"
      />
    </div>
    <div class="head__text">
      <h1>
        Lorem ipsum dolor sit amet.
      </h1>
      <p>
        lorem - lorem - lorem - lorem
      </p>
    </div>
  </div>
</template>

<script>
import { axiosInstance } from '../../services/axiosInstance';
import { autocompleteExampleNames } from './landingPageUtils';
export default {
  name: 'Head',
  props: ['artists'],
  data: function () {
    return {
      dataFetched: false,
      placeholderWorks: false,
      current: '',
      search: '',
      searchData: [],
      currentId: null,
      loading: false,
      autocompleteExampleNames
    };
  },
  mounted() {
    this.changeNamesDynamically();
  },
  watch: {
    async search(val) {
      if (val && val.split(' ').length < 2) {
        if (val.length > 2) {
          this.loading = true;
          let { data } = await axiosInstance.get(
            `/search/?searched_phrase=${val}`
          );
          if (data.artists || data.composers || data.works) {
            data = this.setModelData(data);
            this.searchData = [
              ...data.artists,
              ...data.composers,
              ...data.works
            ];
          }
          this.loading = false;
        }
      }
    }
  },
  methods: {
    setModelData(data) {
      data.works.forEach((obj) => {
        obj.full_name = obj.title;
        obj.redirect = 'work';
        obj.prettyName = 'kompozycja';
      });
      data.artists.forEach((obj) => {
        obj.redirect = 'artist';
        obj.prettyName = 'artysta';
      });
      data.composers.forEach((obj) => {
        obj.redirect = 'composer';
        obj.prettyName = 'kompozytor';
      });
      return data;
    },
    redirect() {
      if (this.currentId) {
        this.$router.push({
          path: `/${this.currentId.redirect}/${this.currentId.id}`
        });
      }
    },
    changeNamesDynamically() {
      let index = 0;
      setInterval(() => {
        const length = this.autocompleteExampleNames.length - 1;
        if (index === length) {
          index = 0;
        }
        this.current = this.autocompleteExampleNames[index];
        index++;
      }, 2000);
    }
  },
  deactivated: function () {
    // remove any data you do not want to keep alive
    this.currentId = null;
  }
};
</script>

<style lang="scss" scoped>
.headContainer {
  font-family: Suisse;
  font-size: 18px;
  display: flex;
  flex-flow: column;
  position: relative;
}
.headgif--blurred {
  height: 100vh;
  width: 100%;
  filter: blur(4px);
  @media screen and (max-width: 975px) {
    width: auto;
    height: 90vh;
  }
}

.headgifBackground {
  background-color: #2e2e2f;
}
h1,
p {
  color: rgb(196, 195, 195);
}
.head__text {
  position: absolute;
  top: 30%;
  width: 100%;

  h1,
  p {
    text-shadow: black 0.1em 0.1em 0.2em;
  }
  h1 {
    color: white;
  }
  p {
    font-size: 1.2em;
    color: white;
  }
}
container p {
  font-size: 1.4em;
}

.searchContent {
  color: rgb(196, 195, 195);
  height: 50px;
  border: 1px solid rgb(196, 195, 195);
  width: 40%;
  margin-top: 25px;
  border-radius: 10px;
  padding-left: 10px;
}

.inputWrapper {
  width: 60%;
  margin-left: 20%;
}
</style>
<!-- "https://media.giphy.com/media/l41lOzTIL8lfZ15fy/source.gif" -->
