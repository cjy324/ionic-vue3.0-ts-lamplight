<template>
  <ion-base-layout pageTitle="회원">
      <ion-custom-body class="justify-center">
        <div class="logo-box text-center flex justify-center items-center mb-3">
            <div class="w-32 text-2xl border-b font-bold">
              MEMBER
            </div>
        </div>
        <div class="mb-2">
          <div class="px-4 mb-2">
            <ion-button class="btn-primary" size="" color="" type="button" expand="block" router-link="/client/join">
              <font-awesome-icon class="mr-2" icon="user"></font-awesome-icon>
              의뢰인 회원가입
            </ion-button>
          </div>
          <div class="px-4">
            <ion-button class="btn-secondary" size="" color="" type="button" expand="block" router-link="/expert/join">
              <font-awesome-icon class="mr-2" icon="user-tie"></font-awesome-icon>
              지도사 회원가입
            </ion-button>
          </div>
        </div>
        <div class="w-full py-2 px-8 text-sm">
            이미 회원이라면?
            <div class="mt-2">
              <span class="font-semibold">'의뢰인'</span>으로 
              <ion-custom-link to="/client/login">로그인</ion-custom-link >
            </div>
            <div class="">
              <span class="font-semibold">'지도사'</span>로 
              <ion-custom-link to="/expert/login">로그인</ion-custom-link >
            </div>
        </div>
      </ion-custom-body>
  </ion-base-layout>

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
import { IonCustomBody, IonCustomLink } from '@/components/';
import { 
  IonButton,
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'MemberSignUpMain',

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