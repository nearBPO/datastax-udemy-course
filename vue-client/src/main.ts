import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config';
import { installPrimevue } from './primevue'

import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import "primeflex/primeflex.css";



const app = createApp(App)

app.use(PrimeVue);

installPrimevue(app)

VueQueryPlugin.install(app, {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                cacheTime: 1000 * 15
            }
        }
    }
})


app.use(createPinia())

app.mount('#app')


