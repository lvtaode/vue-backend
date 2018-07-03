import Vue from 'vue'
import Router from 'vue-router'
import Helloworld from '@/components/Helloworld'
import Index from '@/components/Index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Helllo',
      component: Helloworld
    },
    {
      path:'/index',
      name:'Index',
      component:Index
    }
  ]
})
