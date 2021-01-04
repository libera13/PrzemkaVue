<template>
  <div class="home">
    <LandingPage />
  </div>
</template>

<script lang="ts">
import LandingPage from '../components/LandingPage/LandingPage.vue'; // @ is an alias to /src

export default {
  name: 'Home',
  components: {
    LandingPage
  }
};
</script>
