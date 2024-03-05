import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/global.css'
import '@/assets/css/theme/index.css'
import request from "@/utils/request";
import '@/assets/css/icon/iconfont.css'
import 'highlight.js/styles/monokai-sublime.css'
import Tui from "@wocwin/t-ui"
// 分页组件
import Pagination from "@/components/Pagination";
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar"
import  {resetForm} from "@/utils/ruoyi";
// 图片预览组件
import ImagePreview from "@/components/ImagePreview"
// 图片上传组件
import ImageUpload from "@/components/ImageUpload"
import plugins from './plugins' // plugins

Vue.config.productionTip = false

Vue.prototype.$request = request
Vue.prototype.$baseUrl = process.env.VUE_APP_BASEURL
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)
Vue.prototype.resetForm = resetForm
Vue.component('ImagePreview', ImagePreview)
Vue.component('ImageUpload', ImageUpload)

Vue.use(ElementUI, {size: "small"})
Vue.use(Tui)
Vue.use(plugins)
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
