import VueRouter from "vue-router";
import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/components/admin/Users';
import Trash from '@/components/admin/Trash';

import PowerBI from "../components/powerbi/PowerBi";
import CustomComponent from "../components/powerbi/CustomComponent";






import Vue from 'vue';
import MainLayout from '@/components/shared/MainLayout';
import Calendar from '@/components/shared/Calendar';
import AdminLayout from "@/components/admin/AdminLayout";
import MenuItems from "../components/admin/MenuItems";
import Dictionary from "../components/admin/Dictionary";
import Chart from "../components/admin/Chart";
import Shezhire from "../components/admin/Shezhire";
import Widget from "../components/admin/Widget";

Vue.use(VueRouter);






const router =  new VueRouter({
    mode: 'history',
    routes: [
        { path: '/main', name:'main', component: MainLayout, children:[
                {
                    path: 'home', name:'home', component: Home
                },
                {
                    path: 'bi/:id', name: 'bi', component: PowerBI, props:true
                },
                {
                    path: 'gmap', name: 'gmap', component: CustomComponent
                },
                {
                    path: 'calendar', name: 'calendar', component: Calendar
                },



            ]
        },
        { path: '/login', name:'login', component: Login},
        { path: '/admin', name:'admin', component: AdminLayout
            , children:[
                {
                    path: 'users', name: 'users', component: Users
                },
                {
                    path: 'trash', name: 'trash', component: Trash
                },
                {
                    path: 'calendar', name: 'calendar', component: Calendar
                },
                {
                    path: 'menuitems', name: 'menuitems', component: MenuItems
                },
                {
                    path: 'dictionary', name: 'dictionary', component: Dictionary
                },
                {
                    path: 'chart', name: 'chart', component: Chart
                },
                {
                    path: 'shezhire', name: 'shezhire', component: Shezhire
                },
                {
                    path: 'widget', name: 'widget', component: Widget
                }
            ]
        },
    ]


});




router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];

    const authRequired = !publicPages.includes(to.path);
    const loggedIn = sessionStorage.getItem('user-token');
    if (authRequired && !loggedIn ||to.name==null) {
        next('/login');
    } else {
        next();
    }
});

export default router;






