import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'
import { getGlobalState } from '@/stores'

const globalState = getGlobalState();

const routes: Array<RouteRecordRaw> = [
  {     //앨리어싱
    path: '/', //만약, path가 '/' 이렇게 들어올 경우 '/home/Main'으로 redirect
    redirect: '/home/main'
  },
  {
    path: '/home/',  //'/home/'로 시작하면 
    component: Tabs,  //component: Tabs를 사용하라는 의미
    children: [
      {
        path: '',
        redirect: '/home/main'
      },
      {
        path: 'main',
        component: () => import('@/views/Home/Main.vue')
      },
    ]
  },
  {
    path: '/client/',
    component: Tabs,
    children: [
      { 
        path: '', 
        redirect: () => globalState.isLogined ? '/client/myPage?id=' + globalState.loginedClient.id : '/client/login'
      },
      {
        path: 'login',
        component: () => import('@/views/Client/Login.vue')
      },
      {
        path: 'join',
        component: () => import('@/views/Client/Join.vue')
      },
      {
        path: 'myPage',
        component: () => import('@/views/Client/MyPage.vue')
      },
      {
        path: 'modify',
        component: () => import('@/views/Client/Modify.vue')
      },
    ]
  },
  {
    path: '/expert/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/expert/list'
      },
      {
        path: 'list',
        component: () => import('@/views/Expert/List.vue')
      },
      {
        path: 'profile',
        component: () => import('@/views/Expert/Profile.vue')
      },
    ]
  },
  {
    path: '/order/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/order/main'
      },
      {
        path: 'main',
        component: () => import('@/views/Order/Main.vue')
      },
      {
        path: 'add',
        component: () => import('@/views/Order/Add.vue')
      },
      {
        path: 'list',
        component: () => import('@/views/Order/List.vue')
      },
      {
        path: 'detail',
        component: () => import('@/views/Order/Detail.vue')
      },
      {
        path: 'modify',
        component: () => import('@/views/Order/Modify.vue')
      },
    ]
  },
  {
    path: '/review/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/review/list'
      },
      {
        path: 'add',
        component: () => import('@/views/Review/Add.vue')
      },
      {
        path: 'modify',
        component: () => import('@/views/Review/Modify.vue')
      },
    ]
  },
  {
    path: '/setting/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/setting/main'
      },
      {
        path: 'main',
        component: () => import('@/views/Setting/Main.vue')
      },
    ]
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
