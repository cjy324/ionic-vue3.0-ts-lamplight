<template>
  <ion-base-layout pageTitle="회원" >
      <ion-custom-body class="justify-center">
        <div class="logo-box text-center flex justify-center items-center mb-3">
            <div class="w-32 text-2xl border-b font-bold">
              MEMBER
            </div>
        </div>
        <div class="mb-2">
          <div class="px-4 mb-2">
            <ion-button size="" color="light" type="button" expand="block" router-link="/client/login">
              <font-awesome-icon class="mr-2" icon="user"></font-awesome-icon>
              <span class="font-semibold">의뢰인 로그인</span>
            </ion-button>
          </div>
          <div class="px-4">
            <ion-button size="" color="medium" type="button" expand="block" router-link="/expert/login">
              <font-awesome-icon class="mr-2" icon="user-tie"></font-awesome-icon>
              <span class="font-semibold">지도사 로그인</span>
            </ion-button>
          </div>
        </div>
        <div class="w-full py-2 px-8 text-sm">
            아직 회원이 아니라면?
            <div class="mt-2">
              <span class="font-semibold">'의뢰인'</span>으로 
              <ion-custom-link to="/client/join">회원가입</ion-custom-link >
            </div>
            <div class="">
              <span class="font-semibold">'지도사'</span>로 
              <ion-custom-link to="/expert/join">회원가입</ion-custom-link >
            </div>
        </div>
      </ion-custom-body>
  </ion-base-layout>
      
</template>

<style>
</style>

<script lang="ts">
import { IonCustomBody, IonCustomLink } from '@/components/';
import { 
  IonButton,
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'MemberMain',

  components: { 
    IonButton,
    IonCustomBody,
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