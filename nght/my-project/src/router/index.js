// const Vue = require('vue').default;
// const Router=require('vue-router').default;

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


const router=new Router({
    routes:[
        {
            path:'/',
            meta:{
                isLogin:true
            },
            components:{
                body: resolve => require(['../components/home'], resolve)

            },
        },
        {
            path:'/article',
            components:{
                body: resolve => require(['../components/article'], resolve)
            },
            mame:'article1',
            meta:{
               isLogin:true
            },
            children:[
                {
                    path:'1',
                    components:{
                        article: resolve => require(['../components/article'], resolve)
                    },
                }
            ]
        },
        {
            path:'/login',
            components:{
                body: resolve => require(['../components/login'], resolve)
            }
        }
    ]
});
export default router