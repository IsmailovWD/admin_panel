import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naiveUI from 'naive-ui'
import VueKinesis from "vue-kinesis";

import App from './components/Provider.vue'
import router from './router'

import './assets/main.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naiveUI)
app.use(VueKinesis);

app.mount('#app')
