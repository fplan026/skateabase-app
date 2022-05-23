import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'
import router from './router/router'
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap"

createApp(App).use(router).mount('#app')
