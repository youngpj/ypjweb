// const Vue = require('vue').default;
// const Router=require('vue-router').default;

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


const router=new Router({
    routes:[
        {
            path:'/',
            components:{
                body: resolve => require(['../components/home'], resolve),
                footer: resolve => require(['../components/sidebar'], resolve)
            },
        },
        {
            path:'/article',
            components:{
                body: resolve => require(['../components/article'], resolve)
            },
            mame:'article1',
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