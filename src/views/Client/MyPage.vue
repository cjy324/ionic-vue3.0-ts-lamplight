<template>
  <ion-page>
    <ion-custom-header></ion-custom-header>
    <ion-content :fullscreen="true">

      <ion-custom-body class="justify-center bg-white px-2">
        <ion-list v-if="globalState.isLogined">
              
          <ion-list-header>
            MyPage
          </ion-list-header>
              
          <ion-item-divider>
            <img slot="end" class="h-32 rounded-3xl" :src="mainService.getClientThumbImgUrl(globalState.loginedClient.id)">
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
  IonListHeader,
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonList,
  IonItem,
  IonItemDivider,
  IonLabel,  
  IonButton,
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, onMounted } from 'vue';
import { Client } from '@/types'

export default  {
  name: 'MyPage',

  components: { 
    IonCustomBody, 
    IonCustomHeader, 
    IonCustomLink,
    IonPage, 
    //IonHeader,
    IonListHeader,
    //IonToolbar, 
    //IonTitle, 
    IonContent,
    IonList,
    IonItem,
    IonItemDivider,
    IonLabel,  
    IonButton,
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
      mainService,
      state,
    }
  }
}
</script> 