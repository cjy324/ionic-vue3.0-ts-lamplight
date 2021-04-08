<template>
  <ion-page>
    <ion-custom-header></ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-custom-body class="justify-center">
        <div class="logo-box text-center flex justify-center items-center mb-3">
          <div class="w-32 text-2xl font-bold border-b">
            ORDER
          </div>
        </div>
        <div v-if="globalState.isLogined">
          <div class="px-4">
            <ion-button class="btn-primary" href="/order/add" color="" type="button" expand="block">
              <font-awesome-icon class="mr-2" icon="edit"></font-awesome-icon>
              새 의뢰 요청
            </ion-button>
          </div>
          <div class="px-4">
            <ion-button class="btn-secondary" href="/order/list" color="" type="button" expand="block">
              <font-awesome-icon class="mr-2" icon="clipboard-list"></font-awesome-icon>
              내 의뢰 현황 보기
            </ion-button>
          </div>
        </div>
        <div v-else class="py-2 px-4 w-full text-center">
          로그인 후 이용가능합니다. <ion-custom-link to="/client/login">Log-In</ion-custom-link> 하러 가기
        </div>
      </ion-custom-body>
    </ion-content>
  </ion-page>
</template>

<style>
.btn-primary{
  --background:var(--ion-color-tertiary-shade)
}
.btn-secondary{
  --background:var(--ion-color-secondary-shade)
}
</style>

<script lang="ts">
import { IonCustomBody, IonCustomHeader, IonCustomLink } from '@/components/';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonButton, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'

export default {
  name: 'OrderMain',

  components: { 
    //IonHeader, 
    //IonToolbar,
    IonCustomLink, 
    //IonTitle,
    IonButton, 
    IonContent, 
    IonPage, 
    IonCustomBody, 
    IonCustomHeader 
  },

  setup() {
    const globalState = useGlobalState();

    return {
      globalState,
      //confirmAlert,
    }
  }
}
</script> 