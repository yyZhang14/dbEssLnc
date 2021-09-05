import {createApp} from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import axios from 'axios'
import App from './App.vue'
// import VueCookies  from 'vue-cookies'



const app = createApp(App)
app.use(router)
app.use(ElementPlus)
// app.use(VueCookies)

app.config.globalProperties.$axios = axios
app.mount('#app')




