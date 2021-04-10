<template>
  <ion-page >
    <ion-custom-header>회원</ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-custom-body class="justify-center">
        <div class="logo-box text-center flex justify-center items-center mb-3">
            <div class="w-32 text-2xl border-b font-bold">
              MEMBER
            </div>
        </div>
        <div class="mb-2">
          <div class="px-4 mb-2">
            <router-link to="/client/join">
              <ion-button class="btn-primary" size="" color="" type="button" expand="block">
                <font-awesome-icon class="mr-2" icon="user"></font-awesome-icon>
                의뢰인 Sign-Up
              </ion-button>
            </router-link>
          </div>
          <div class="px-4">
            <router-link to="/expert/join">
              <ion-button class="btn-secondary" size="" color="" type="button" expand="block">
                <font-awesome-icon class="mr-2" icon="user-tie"></font-awesome-icon>
                지도사 Sign-Up
              </ion-button>
            </router-link>
          </div>
        </div>
        <div class="w-full text-center py-2 px-6 text-sm">
            이미 Lamplight의 회원이라면?
            <div class="mt-2">
              <span class="font-semibold">'의뢰인'</span>으로 <ion-custom-link to="/client/login">Log-In</ion-custom-link>
            </div>
            <div  class="">
              <span class="font-semibold">'지도사'</span>로 <ion-custom-link to="/expert/login">Log-In</ion-custom-link>
            </div>
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
  IonContent,
  IonButton,
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'MemberMain',

  components: { 
    IonButton, 
    IonContent, 
    IonPage, 
    IonCustomBody, 
    IonCustomHeader,
    IonCustomLink,
  },

  setup() {
    const globalState = useGlobalState();

    return {
      globalState,
      //confirmAlert,
    }
  }
})
</script> 