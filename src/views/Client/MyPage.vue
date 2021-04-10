<template>
  <ion-page>
    <ion-custom-header>내 정보</ion-custom-header>
    <ion-custom-body class="justify-center" >
      <ion-content v-if="globalState.isLogined" :fullscreen="true">
        <ion-list class="mb-14">
          
          <div class="flex justify-end mr-4 mt-2">
            <ion-buttons>
              <ion-button :href="'/client/modify?id=' + globalState.loginedClient.id">
                <font-awesome-icon class="text-lg h-7" icon="user-cog" />
              </ion-button>
            </ion-buttons>
          </div>  

          <ion-item-divider class="mt-2">
            <img slot="start" class="h-32 rounded-full mr-4 mb-4" :src="mainService.getClientThumbImgUrl(globalState.loginedClient.id)">
          </ion-item-divider>
              
          <ion-item color="light">
            <ion-label color="medium">회원유형</ion-label>
            <ion-label slot="end" color="dark">의뢰인</ion-label>
          </ion-item>
              
          <ion-item>
            <ion-label color="medium">아이디</ion-label>
            <ion-label slot="end" color="dark">{{state.client.loginId}}</ion-label>
          </ion-item>

          <ion-item>
            <ion-label color="medium">이름</ion-label>
            <ion-label slot="end" color="dark">{{state.client.name}}</ion-label>
          </ion-item>

          <ion-item>
            <ion-label color="medium">연락처</ion-label>
            <ion-label slot="end" color="dark">{{state.client.cellphoneNo}}</ion-label>
          </ion-item>

          <ion-item>
            <ion-label color="medium">e-mail</ion-label>
            <ion-label slot="end" color="dark">{{state.client.email}}</ion-label>
          </ion-item>

          <ion-item>
            <ion-label color="medium">지역</ion-label>
            <ion-label slot="end" color="dark">{{state.client.region}}</ion-label>
          </ion-item>

        </ion-list>
        
      </ion-content>
      <div v-else class="py-2 px-4">
        로그인 후 이용가능합니다. <ion-custom-link to="/client/login">로그인</ion-custom-link> 하러 가기
      </div>
    </ion-custom-body>
    
  </ion-page>
</template>

<style>
</style>

<script lang="ts">
import { IonCustomBody, IonCustomHeader, IonCustomLink } from '@/components/';
import { 
  IonPage, 
  //IonHeader,
  //IonListHeader,
  //IonToolbar, 
  //IonTitle, 
  IonContent,
  IonList,
  IonItem,
  IonItemDivider,
  IonLabel,  
  IonButtons,
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, onMounted } from 'vue';
import { Client } from '@/types'
import * as util from '@/utils';

export default  {
  name: 'MyPage',

  components: { 
    IonCustomBody, 
    IonCustomHeader, 
    IonCustomLink,
    IonPage, 
    //IonHeader,
    //IonListHeader,
    //IonToolbar, 
    //IonTitle, 
    IonContent,
    IonList,
    IonItem,
    IonItemDivider,
    IonLabel,  
    IonButtons,
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

      if(axRes.data.fail){
        util.showAlert(axRes.data.msg)
        return
      }

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