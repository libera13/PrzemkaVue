<template>
  <div id="app">
    <nav class="nav" v-bind:class="{ active: window }">
      <ul class="nav--list">
        <router-link
          :to="`${route.path}`"
          v-bind:key="`route-${route.name}`"
          v-for="route in this.computedRoutes"
          class="nav--item"
        >
          <v-icon class="homeIcon" v-if="route.name === 'Home'">
            mdi-home
          </v-icon>
          <!-- <img v-if="route.name === 'Home'"  src="mdi-home" alt=""> -->
          <span v-if="route.name !== 'Home'">{{ route.name }}</span>
        </router-link>
      </ul>
      <div v-if="loginInfo.is_authenticated">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar
              color="teal"
              size="36"
              class="loginInfo"
              v-bind="attrs"
              v-on="on"
            >
              <span class="white--text headline">
                {{
                  loginInfo.username[0].toUpperCase() +
                  loginInfo.username[1].toUpperCase()
                }}
              </span>
            </v-avatar>
          </template>
          <span>{{ loginInfo.username }}</span>
        </v-tooltip>
      </div>
      <a v-else href="/accounts/login/">
        <div class="loginButton">Zaloguj</div>
      </a>
      <a v-if="loginInfo.is_authenticated" href="/accounts/logout/">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" class="logout">mdi-logout</v-icon>
          </template>
          <span>Wyloguj</span>
        </v-tooltip>
      </a>
      <v-icon
        @click="switchMenu()"
        class="menu"
        :class="{ loggedOut: !loginInfo.is_authenticated }"
      >
        mdi-menu
      </v-icon>
    </nav>
    <v-app>
      <div
        v-if="this.menuOpen"
        class="slidingMenu"
        v-bind:class="{ active: window }"
      >
        <ul class="menu-mobile">
          <router-link
            :to="`${route.path}`"
            v-bind:key="`route-${route.name}`"
            v-for="route in this.computedRoutes"
            class="nav--item"
          >
            {{ route.name }}
          </router-link>
        </ul>
      </div>
      <template>
        <keep-alive>
          <router-view />
        </keep-alive>
      </template>
    </v-app>
    <!-- If you will delete it, notifications will disappear  -->
    <notifications group="app" />
  </div>
</template>

<script>
import { navRoutes } from './router/navRoutes';
import { mainRoutes } from './router/mainRoutes';
import { axiosInstance } from './services/axiosInstance';
export default {
  name: 'Home',
  data() {
    return {
      routes: [mainRoutes[0], ...navRoutes],
      window: 0,
      menuOpen: false,
      loginInfo: false
    };
  },
  computed: {
    computedRoutes: function () {
      const routesWithLoginRequired = ['Dodaj utwór', 'Dodaj osobę'];
      if (!this.loginInfo.username) {
        return this.routes.filter(
          (route) => !routesWithLoginRequired.includes(route.name)
        );
      } else {
        return [...this.routes];
      }
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  async beforeMount() {
    await axiosInstance
      .get('/is_authenticated/')
      .then((resp) => (this.loginInfo = resp.data));
  },
  methods: {
    handleScroll(event) {
      this.window = window.scrollY;
    },
    switchMenu() {
      this.menuOpen = !this.menuOpen;
    },
    async getAccountInfo() {
      const { data } = await axiosInstance.get('/is_authenticated/');
      this.fromDB.locations = data;
      return data.map(this.map('city'));
    }
  }
};
</script>

<style lang="scss">
@import 'styles/main';
@font-face {
  font-family: 'Suisse';
  src: url("//db.onlinewebfonts.com/c/03d5b20d124cd26dc873bd4a8e42313e?family=Suisse+Int'l");
}

#app {
  font-family: Suisse, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  background-color: #f3f2ef;
  color: #2c3e50;
}

.nav {
  padding: 30px;
  position: fixed;
  height: 60px;
  top: 0;
  z-index: 3;
  width: 100%;
  background-color: #323232eb;
  transition: background-color 0.5s ease;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.active {
  background-color: #323232f0 !important;
}
.nav {
  &--list {
    flex-direction: row;
    justify-content: center;
    margin-top: -10px;
  }
  &--item {
    padding: 1rem;
    font-weight: bold !important;
    color: #fff !important;
    font-family: Suisse;
    letter-spacing: 1px;
  }
}
.homeIcon {
  color: white !important;
  position: absolute !important;
  left: 20px !important;
  top: 20px !important;
}

.menu {
  position: absolute !important;
  right: 110px;
  top: 20px;
  display: none !important;
  color: white !important;
  @media screen and (max-width: 750px) {
    display: initial !important;
  }
}
.loggedOut {
  right: 150px !important;
}

.logout {
  position: absolute !important;
  right: 67px;
  top: 20px;
  color: white !important;
  @media screen and (max-width: 750px) {
  }
}

.loginInfo {
  position: absolute;
  top: 13px;
  background-color: #c5c5c7;
  right: 15px;
  @media screen and (max-width: 750px) {
    right: 15px;
  }
}

.loginButton {
  position: absolute;
  height: 36px;
  border-radius: 10px;
  top: 13px;
  background-color: #c5c5c7;
  right: 10px;
  width: 120px;
  font-weight: bold;
  color: white;
  line-height: 2.5;
  cursor: pointer;
  transition: background-color 0.5s ease;
  &:hover {
    background-color: #000000a0;
  }
  @media screen and (max-width: 750px) {
    right: 10px;
  }
}

@media screen and (max-width: 750px) {
  .nav--list > a:nth-child(1n + 2) {
    display: none;
  }
  .slidingMenu {
    margin-top: 60px;
    background-color: #323232eb;
    transition: background-color 0.5s ease;
    position: fixed;
    width: 100%;
    z-index: 1;
  }
}

.menu-mobile {
  display: flex;
  flex-direction: column;
}
</style>
