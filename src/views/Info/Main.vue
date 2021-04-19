<template>
  <ion-base-layout pageTitle="정보">
      <ion-custom-body class="justify-center h-full">
        <div class="w-full h-full bg-gray-600 text-white">
          <div class="h-full flex flex-col items-center justify-center">
            <div class="info_head_logo">
              <img class="w-48" src="@/images/logo.png" alt="">
            </div>
            <div class="mb-8">
              ver 1.0.0
            </div>
            <div v-if="globalState.isLogined">
              <ion-button @click="logout" class="font-bold text-md" color="dark">
                로그아웃
              </ion-button>
            </div>
            <div class="mt-12 text-center">
              <router-link to="privacyPolicy" class="block underline text-md">
                개인정보처리방침
              </router-link>
              <router-link to="termsOfService" class="block underline text-md">
                이용 약관
              </router-link>
            </div>
          </div>
        </div>
      </ion-custom-body>
  </ion-base-layout>
</template>

<style>
</style>

<script lang="ts">
import { IonCustomBody } from '@/components/';
import { 
IonButton 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { defineComponent } from 'vue'
import * as util from '@/utils';

export default defineComponent ({
  name: 'Info',
  components: { 
    IonCustomBody,
    IonButton 

},
  setup() {
    const globalState = useGlobalState();

    const logout = () => {
      globalState.setLogouted();
      //window.location.reload();

      window.location.replace('/home/main')

      util.showAlert('로그아웃 되셨습니다.');

    };
    


    return {
      globalState,
      logout,

    }
  }
})
</script> 