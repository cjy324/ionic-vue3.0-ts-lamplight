<template>
  <ion-page>
    <ion-custom-header></ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-custom-body class="justify-center">
        <div>
          <div class="px-4">
            <ion-button href="/client/login" color="primary" type="button" expand="block">일반회원 로그인</ion-button>
          </div>
          <div class="px-4">
            <ion-button href="/expert/login" color="secondary" type="button" expand="block">지도사회원 로그인</ion-button>
          </div>
        </div>
      </ion-custom-body>
    </ion-content>
  </ion-page>
</template>

<style>
</style>

<script lang="ts">
import { IonCustomBody, IonCustomHeader } from '@/components/';
import { 
  IonPage,  
  IonContent,
  IonButton, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'

export default {
  name: 'MemberMain',

  components: { 
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