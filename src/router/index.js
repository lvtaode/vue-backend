import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/Index'
// import Home from '@/components/Home'
// import UserList from '@/components/UserList'
// import ShopList from '@/components/ShopList'
// import FoodList from '@/components/FoodList'
// import OrderList from '@/components/OrderList'
// import AdminList from '@/components/AdminList'
// import AddShop from '@/components/AddShop'
// import AddGoods from '@/components/AddGoods'
// import AdminSet from '@/components/AdminSet'
// import Visitor from '@/components/Visitor'
// import VueEdit from '@/components/VueEdit'
// import Explain from '@/components/Explain'
// import Login from '@/components/Login'

Vue.use(Router)
const Login = r => require.ensure([], () => r(require('@/components/login')), 'login');
const Index=r=>require.ensure([], () => r(require('@/components/Index')), 'index');
const Home = r => require.ensure([], () => r(require('@/components/Home')), 'Home');
const UserList= r=>require.ensure([],()=>r(require('@/components/UserList'),'UserList'));
const ShopList= r=>require.ensure([],()=>r(require('@/components/ShopList'),'ShopList'));
const FoodList= r=>require.ensure([],()=>r(require('@/components/FoodList'),'FoodList'));
const OrderList= r=>require.ensure([],()=>r(require('@/components/OrderList'),'OrderList'));
const AdminList= r=>require.ensure([],()=>r(require('@/components/AdminList'),'AdminList'));
const AddShop= r=>require.ensure([],()=>r(require('@/components/AddShop'),'AddShop'));
const AddGoods= r=>require.ensure([],()=>r(require('@/components/AddGoods'),'AddGoods'));
const AdminSet= r=>require.ensure([],()=>r(require('@/components/AdminSet'),'AdminSet'));
const Visitor= r=>require.ensure([],()=>r(require('@/components/Visitor'),'Visitor'));
const VueEdit = r=>require.ensure([],()=>r(require('@/components/VueEdit'),'VueEdit'));
const Explain= r=>require.ensure([],()=>r(require('@/components/Explain'),'Explain'));



 const routes=[
    {
      path:'/main',
      component:Index,
      children:[
        {
          path:'',
          component:Home,
          meta:[]
        },
        {
          path:'/userList',
          component:UserList,
          meta:["数据管理","用户列表"]
        },
        {
          path:'/shopList',
          component:ShopList,
          meta:["数据管理","商家列表"]
        },
        {
          path:'/foodList',
          component:FoodList,
          meta:["数据管理","食品列表"]
        },
        {
          path:'/orderList',
          component:OrderList,
          meta:["数据管理","订单列表"]
        },
        {
          path:'/adminList',
          component:AdminList,
          meta:["数据管理","管理员列表"]
        },
        {
          path:'/addShop',
          component:AddShop,
          meta:["添加数据","添加商铺"]
        },
        {
          path:'/adminSet',
          component:AdminSet,
          meta:["设置","管理员设置"]
        },
        {
          path:'/addGoods',
          component:AddGoods,
          meta:["添加数据","添加商品"]
        },
        { 
          path:'/visitor',
          component:Visitor,
          meta:["图标","用户分布"]
        },
        {
          path:'/vueEdit',
          component:VueEdit,
          meta:["编辑","文本编辑"]
        },
        {
          path:'/explain',
          component:Explain,
          meta:["说明","说明"]
        }
      ]
    },{
      path:'/',
      component:Login
    }
  ];

export default new Router({
  routes,
	strict: process.env.NODE_ENV !== 'production',
})