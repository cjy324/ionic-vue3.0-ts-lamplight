<template>
  <ion-page>
    <ion-custom-header>의뢰</ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">의뢰</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-custom-body class="justify-center">
        <div v-if="globalState.isLogined">
          <div class="px-4">
            <ion-button href="/order/add" color="primary" type="button" expand="block">의뢰 요청</ion-button>
          </div>
          <div class="px-4">
            <ion-button href="/order/list" color="secondary" type="button" expand="block">내 의뢰 현황 보기</ion-button>
          </div>
        </div>
        <div v-else class="py-2 px-4">
          로그인 후 이용가능합니다. <ion-custom-link to="/client/login">로그인</ion-custom-link> 하러 가기
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
  IonButton, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'

export default {
  name: 'OrderAdd',

  components: { 
    IonHeader, 
    IonToolbar,
    IonCustomLink, 
    IonTitle,
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