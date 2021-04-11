<template>
  <ion-page>
    <ion-custom-header>버전정보</ion-custom-header> 
      <ion-custom-body class="justify-center">
        <div class="w-full text-center bg-gray-600 text-white">
          <div class="h-32 flex-col items-center justify-center">
            <div class="text-4xl mb-6">
              LAMPLIGHT
            </div>
            <div class="">
              ver 1.0.0
            </div>
          </div>
        </div>
        
      </ion-custom-body>
  </ion-page>
</template>

<style>
</style>

<script lang="ts">
import { IonCustomBody, IonCustomHeader } from '@/components/';
import { 
  IonPage, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'Info',
  components: { 
    IonPage, 
    IonCustomBody, 
    IonCustomHeader,

},
  setup() {
    const globalState = useGlobalState();
    /* 라우터 개념 정리 */
    //라우터를 설정하게되면 특정 주소와 접근할 페이지 정보를 설정할 수 있다.
    //즉, /sample/ 이라는 주소로 접근할 경우 원하는 페이지의 정보를 보여줄 수 있도록 
    //설정하는 것이 바로 라우터(router)에서 라우트(route)를 설정한다고 생각하면 된다.
    //SPA(싱글 페이지 어플리케이션)에서는 하나의 페이지로 동작하기 때문에 
    //실제로 다른 주소로 접근하여 웹페이지를 리로드하지 않는 대신에 
    //Router 설정이 반드시 필요하게 된다.
    //더보기 https://webisfree.com/2019-03-25/[vuejs]-vue-router-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-%EB%9D%BC%EC%9A%B0%ED%8A%B8-%EC%84%A4%EC%A0%95

    //router와 route 객체를 import로 간단하게 불러올 수 있다.
    //const router = useRouter(); //router를 통해???
    //const route = useRoute(); //route를 통해서 현재 url정보들을 가져올 수도 있음
    //axios 객체도 간단하게 불러올 수 있다.


    return {
      globalState
    }
  }
})
</script> 