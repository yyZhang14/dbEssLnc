//配置路由相关的信息
// import Vue from 'vue'
// import VueRouter from 'vue-router'
import {createRouter,createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Browse from '../views/Browse.vue'
import Search from '../views/Search.vue'
import Blast from '../views/Blast.vue'
import Download from '../views/Download.vue'
import Help from '../views/Help.vue'
import Visual from '../views/Visual.vue'
import Gene from '../views/Gene.vue'
//1.通过Vue.use（插件），安装插件
// Vue.use(VueRouter)

const routerHistory = createWebHistory()
 

//2.创建VueRouter对象
const routes = [
    {
        path:"/:pathMatch(.*)*",
        redirect:"/home"
    },
    {
        path:"/home",
        component: Home,
        name:'Home'
    },
    {
        path:"/browse",
        component: Browse,
        name:'Browse'
    },
    {
        path:"/search",
        component: Search,
        name:'Search'
    },
    {
        path:"/blast",
        component: Blast,
        name:'Blast'
    },
    {
        path:"/download",
        component: Download,
        name:'Download'
    },
    {
        path:"/help",
        component: Help,
        name:'Help'
    },
    {
        path:"/visual",
        component: Visual,
        name:'Visual'  
    },
    {
        path:"/gene",
        component: Gene,
        name:'Gene'  
    }

]
const router =new createRouter({
    //配置路由和组件之间的应用关系
    history: routerHistory,
    routes

})
//3.将router对象传入到Vue实例中
export default router