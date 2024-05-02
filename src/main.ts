import { createApp } from 'vue'
import { createPinia } from 'pinia';
import mitt from 'mitt';
import './styles/main.css'
import router from './routes';
import App from './App.vue'

const app = createApp(App);
const pinia = createPinia();
const emitter = mitt();
// Make the emitter global
app.config.globalProperties.emitter = emitter;
// Add emitter to all stores
pinia.use(({ store }) => {
  store.emitter = app.config.globalProperties.emitter;
});

app.use(pinia);
app.use(router);
app.mount('#app');
