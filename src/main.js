import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
// 导入权限控制模块
import './permission'
// 通用字体
import 'vfonts/FiraCode.css'
// 按需全局安装naive-ui组件(手动)
import {
  // create naive ui
  create,
  // component
  NButton,
} from 'naive-ui'

const naive = create({
  components: [NButton],
})
const app = createApp(App)
app.use(naive)
app.use(router)
app.use(store)
app.mount('#app')
