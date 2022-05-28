import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from '@/App.vue'
import router from '@/router/router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'maz-ui/css/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

createApp(App).use(router).mount('#app')
