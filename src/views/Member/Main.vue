<template>
  <ion-page >
    <ion-custom-header></ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-custom-body class="justify-center">
        <div class="logo-box text-center flex justify-center items-center mb-3">
            <div class="w-32 text-2xl border-b">
              회원 유형
            </div>
        </div>
        <div class="mb-2">
          <div class="px-4 mb-2">
            <ion-button size="" color="tertiary" href="/client/login" type="button" expand="block">의뢰인 Log-in</ion-button>
          </div>
          <div class="px-4">
            <ion-button size="" color="secondary" href="/expert/login" type="button" expand="block">지도사 Log-in</ion-button>
          </div>
        </div>
        <div class="py-2 px-6 text-sm">
            아직 Lamplight의 회원이 아니시라면?
            <div class="mt-2 ml-2">
              <span class="font-extrabold">'의뢰인'</span>으로 <ion-custom-link to="/client/join">Sign-in</ion-custom-link>
            </div>
            <div  class="ml-2">
              <span class="font-extrabold">'지도사'</span>로 <ion-custom-link to="/expert/join">Sign-in</ion-custom-link>
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
    IonCustomHeader,
    IonCustomLink
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