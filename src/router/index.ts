import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'
import { getGlobalState } from '@/stores'

const globalState = getGlobalState();

//https://ionicframework.com/docs/vue/navigation

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
    path: '/member/',
    component: Tabs,
    children: [
      { 
        path: '', 
        redirect: () => globalState.isLogined ? '/' + globalState.memberType + '/myPage?id=' + globalState.memberId : '/member/main'
      },
      {
        path: 'main',
        component: () => import('@/views/Member/Main.vue')
      },
      {
        path: 'signupMain',
        component: () => import('@/views/Member/SignUpMain.vue')
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
        path: 'findLoginId',
        component: () => import('@/views/Client/FindLoginId.vue')
      },
      {
        path: 'findLoginPw',
        component: () => import('@/views/Client/FindLoginPw.vue')
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
      {
        path: 'join',
        component: () => import('@/views/Expert/Join.vue')
      },
      {
        path: 'login',
        component: () => import('@/views/Expert/Login.vue')
      },
      {
        path: 'myPage',
        component: () => import('@/views/Expert/MyPage.vue')
      },
      //통합
      {
        path: 'findLoginId',
        component: () => import('@/views/Expert/FindLoginId.vue')
      },
      {
        path: 'findLoginPw',
        component: () => import('@/views/Expert/FindLoginPw.vue')
      },
      {
        path: 'modify',
        component: () => import('@/views/Expert/Modify.vue')
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
        path: 'allList',
        component: () => import('@/views/Order/AllList.vue')
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
        path: 'list',
        component: () => import('@/views/Review/List.vue')
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
    path: '/info/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/info/main'
      },
      {
        path: 'main',
        component: () => import('@/views/Info/Main.vue')
      },
      {
        path: 'privacyPolicy',
        component: () => import('@/views/Info/PrivacyPolicy.vue')
      },
      {
        path: 'termsOfService',
        component: () => import('@/views/Info/TermsOfService.vue')
      },
    ]
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
