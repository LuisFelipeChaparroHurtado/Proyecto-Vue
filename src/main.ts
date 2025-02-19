import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const globalOptions = {
    mode: 'auto',
  };
const app = createApp(App)

app.use(router)
app.use( VueTelInput, globalOptions);
app.mount('#app')
