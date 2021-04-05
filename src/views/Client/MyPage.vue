<template>
  <ion-page>
    <ion-custom-header>회원 - My Page</ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">회원 - 내 정보</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-custom-body class="justify-center">
        <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <div v-if="globalState.isLogined">
          <div title="프로필 이미지">
            <img v-if="globalState.loginedClient.extra__thumbImg != null" class="h-96 rounded-lg object-cover object-center" :src="'http://localhost:8090' + globalState.loginedClient.extra__thumbImg">
            <img v-if="globalState.loginedClient.extra__thumbImg == null" class="h-96 rounded-lg object-cover object-center" :src="'http://via.placeholder.com/300?text=NoImage'">
          </div>
          <div title="회원유형">
            <p>회원유형</p>
            일반회원
          </div>
          <div title="아이디">
            <p>아이디</p>
            {{globalState.loginedClient.loginId}}
          </div>
          <div title="이름">
            <p>이름</p>
            {{globalState.loginedClient.name}}
          </div>
          <div title="전화번호">
            <p>전화번호</p>
            {{globalState.loginedClient.cellphoneNo}}
          </div>
          <div title="이메일">
            <p>이메일</p>
            {{globalState.loginedClient.email}}
          </div>
          <div title="지역">
            <p>지역</p>
            {{globalState.loginedClient.region}}
          </div>
          <div>
            <div class="btns mt-2">
              <ion-button :href="'/client/modify?id=' + globalState.loginedClient.id">
                회원정보수정
              </ion-button>
            </div>
          </div>
        </div>
        <div v-else class="py-2 px-4">
          로그인 후 이용가능합니다. <ion-custom-link to="/">홈</ion-custom-link> 으로 이동
        </div>
      </div>
    </div>
      </ion-custom-body>
    </ion-content>
  </ion-page>
</template>

<style>
</style>

<script lang="ts">
import { IonCustomBody, IonCustomHeader, IonCustomLink } from '@/components/';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, onMounted } from 'vue';
import { Client } from '@/types'

export default  {
  name: 'MyPage',

  components: { 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonPage, 
    IonCustomBody, 
    IonCustomHeader,
    IonCustomLink, 
    IonButton 
  },
  
  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();
    
    
    // const state = reactive({
    //   client: {} as Client
    // });

    // const id = globalState.loginedClient.id;

    // async function loadClient(id: number) {
    //   const axRes = await mainService.client_detail(id)
    //   state.client = axRes.data.body.client;
    // }
    // onMounted(() => {
    //   loadClient(id);
    // });

    return {
      globalState,
      //state
    }
  }
}
</script> 