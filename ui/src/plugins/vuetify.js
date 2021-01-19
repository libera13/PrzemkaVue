import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);
const style = getComputedStyle(document.body);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#dddfd4',
        secondary: '#fae596',
        accent: '#3fb0ac',
        // accent: '#173e43',
        error: '#FF5252',
        info: '#fae596',
        success: '#4CAF50',
        warning: '#FFC107'
      },
      dark: {
        primary: '#fff',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  }
});
