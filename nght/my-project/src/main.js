import  Vue from 'vue';
import App from './App';
// const router=require('./router/index')1;
import router from './router/index'
import ElementUI from 'element-ui';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'

Vue.use(ElementUI);
Vue.prototype.$ajax= axios;

const Ng=new Vue({
    el:'#app',
    render: h=>h(App),
    router,
    store
});
router.beforeEach((to, from,next) => {
    next();
});





