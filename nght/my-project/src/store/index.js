import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);



export default new Vuex.Store({
    state:{
        isLogin:false,
        userData:{
            userName:'',
            passWord:''
        },
    },
    mutations: {
        changeLogin (state,data) {
            if(data=='login'){
                localStorage.setItem('nguser',JSON.stringify({'login':true}));
                state.isLogin=true;
            }else{
                localStorage.setItem('nguser',JSON.stringify({'login':false}));
                state.isLogin=false;
            }

        }
    },
    getters:{
        getLogin(state){
            let isLogin=state.isLogin;
            if(!isLogin){
                isLogin=JSON.parse(localStorage.getItem('nguser')||false);
                if(isLogin){
                    isLogin=isLogin.login
                }
            }
            return isLogin
        },
    }
});
