<template>
  <div>
    <div class="topBorder"></div>
    <div class="footer">
      <div class="footerSection left">
        <ul class="redirects navigationBottom">
          <!--          <router-link-->
          <!--            :to="`${route.path}`"-->
          <!--            v-bind:key="`route-${route.name}`"-->
          <!--            v-for="route in this.mainRoutes"-->
          <!--            class="navigationBottom"-->
          <!--          >-->
          <!--            {{ route.name }}-->
          <!--          </router-link>-->
          <p>Rolpur</p>
          <p>Chrząszczew 73</p>
          <p>Przemek Libera</p>
          <p>898-989-898</p>
        </ul>
      </div>
      <div class="footerSection">
        <icon-enginner />
      </div>
      <div class="footerSection right"></div>
    </div>
  </div>
</template>

<script>
import { mainRoutes } from '../../router/mainRoutes';
import IconEnginner from './icon-enginner';
export default {
  name: 'Footer',
  components: { IconEnginner },
  data() {
    return {
      mainRoutes
    };
  },
  mounted() {
    this.mainRoutes = this.mainRoutes.filter(
      (el) => el.name === 'Home' || el.name === 'About'
    );
  }
};
</script>

<style lang="scss" scoped>
.footer {
  height: 200px;
  background-color: #f1f1f1;
  margin-top: -40px;
  margin-top: -40px;
  clip-path: polygon(0 20px, 100% 0, 100% 100%, 0% 100%);
  position: relative;
  display: flex;
}
.topBorder {
  height: 44px;
  background-color: #e4e4e4;
  margin-top: -40px;
  clip-path: polygon(0 20px, 100% 0, 100% 100%, 0% 100%);
  position: relative;
  transition: background-color 0.5s ease;
}
.redirects {
  position: relative;
  font-size: 1px;
  height: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.navigationBottom {
  color: #a6a5a5 !important;
  font-size: 17px;
  transition: color 0.5s ease;
  text-align: left;
  padding-left: 40px;
  height: 30px;
}
.navigationBottom:hover {
  color: black !important;
}
.footerSection {
  width: 33%;
  margin: 40px 0px 40px 0px;
  box-sizing: border-box;
  border-right: 2px solid #e4e4e4;
}
.amuzLogo {
  height: 100%;
}
</style>
