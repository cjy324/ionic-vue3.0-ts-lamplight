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
            <ion-list v-if="globalState.isLogined">
              
              <ion-list-header>
                MyPage
              </ion-list-header>
              
              <ion-item-divider>
                <img slot="end" v-if="globalState.loginedClient.extra__thumbImg != null" class="h-32 rounded-3xl" :src="'http://localhost:8090' + globalState.loginedClient.extra__thumbImg">
                <img slot="end" v-if="globalState.loginedClient.extra__thumbImg == null" class="h-32 rounded-3xl" :src="'http://via.placeholder.com/300?text=NoImage'">
              </ion-item-divider>
              
              <ion-item>
                <ion-label>회원유형</ion-label>
                <ion-label slot="end" color="success">일반회원</ion-label>
              </ion-item>
              
              <ion-item>
                <ion-label>아이디</ion-label>
                <ion-label slot="end" color="tertiary">{{state.client.loginId}}</ion-label>
              </ion-item>

              <ion-item>
                <ion-label>이름</ion-label>
                <ion-label slot="end" color="tertiary">{{state.client.name}}</ion-label>
              </ion-item>

              <ion-item>
                <ion-label>연락처</ion-label>
                <ion-label slot="end" color="tertiary">{{state.client.cellphoneNo}}</ion-label>
              </ion-item>

              <ion-item>
                <ion-label>e-mail</ion-label>
                <ion-label slot="end" color="tertiary">{{state.client.email}}</ion-label>
              </ion-item>

              <ion-item>
                <ion-label>지역</ion-label>
                <ion-label slot="end" color="warning">{{state.client.region}}</ion-label>
              </ion-item>
            
            </ion-list>
            <div v-else class="py-2 px-4">
              로그인 후 이용가능합니다. <ion-custom-link to="/client/login">로그인</ion-custom-link> 하러 가기
            </div>
            <ion-list>
              <ion-item-divider class="btns mt-2">
                <ion-button slot="end" :href="'/client/modify?id=' + globalState.loginedClient.id">
                  회원정보수정
                </ion-button>
              </ion-item-divider>
            </ion-list>
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
    
    
    const state = reactive({
      client: {} as Client
    });

    const id = globalState.loginedClient.id;

    async function loadClient(id: number) {
      const axRes = await mainService.client_detail(id)
      state.client = axRes.data.body.client;
    }
    onMounted(() => {
      loadClient(id);
    });

    return {
      globalState,
      state
    }
  }
}
</script> 