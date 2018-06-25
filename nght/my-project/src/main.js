import  Vue from 'vue';
import App from './App';
// const router=require('./router/index')222;
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
    store,
    created(){
        let token=localStorage.getItem('nguser')||false;
        let _this=this;
        this.$ajax.get('/api/logreg/register/',{
            params: {
                mobile:'username',
                codetype:token,
                code:'2576',
                nick:'dapang'
            }
        }).then((res) => {
            this.fullscreenLoading=false;
            if(res.data.return_code==200){
                this.$router.push('/')
            }else{
                this.$router.push('/login');
            }
        }).catch( err => {
            this.fullscreenLoading=false;
            this.$message({
                message: err,
                type: 'warning'
            });
        })
    },
});
router.beforeEach((to, from,next) => {
    if(to.meta.isLogin){
        console.log(to.meta.isLogin,store.state.isLogin)
        if(store.state.isLogin){
            next()
        }else{
            Vue.prototype.$alert('先登录1', '标题名称', {
                confirmButtonText: '确定',
                callback: function(){
                    router.push({path:'/login'})
                }
            });
        }
    }else{
        next();
    }

});





