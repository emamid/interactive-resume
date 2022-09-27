import { createApp } from 'vue'

// For app.use
import { createVuetify } from 'vuetify'

// Other
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Main app files
import App from '@/App.vue'
import getRouter from './router';

// CSS
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

const app = createApp(App);

const vuetify = createVuetify({
	components,
	directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },	
  theme: {
    defaultTheme: 'light'
  },
}) 

app.use(vuetify);
app.use(getRouter());
app.mount('#app');
