<template>
  <ion-base-layout pageTitle="정보">
      <ion-custom-body class="justify-center h-full">
        <div class="dark_back w-full h-full bg-gray-600 text-white">
          <div class="h-full flex flex-col items-center justify-center">
            <div class="info_head_logo light_logo">
              <img class="w-48" src="@/images/logo.png" alt="">
            </div>
            <div class="info_head_logo dark_logo text-7xl mb-6">
              상장례
            </div>
            <div class="mb-8">
              ver 1.0.1
            </div>
            <div v-if="globalState.isLogined">
              <ion-button @click="logout" class="font-bold text-md" color="warning">
                로그아웃
              </ion-button>
            </div>
            <div class="mt-12 text-center">
              <router-link to="/info/privacyPolicy" class="block text-md">
                개인정보처리방침
              </router-link>
              <router-link to="/info/termsOfService" class="mt-2 block text-md">
                이용 약관
              </router-link>
            </div>
          </div>
        </div>
      </ion-custom-body>
  </ion-base-layout>
</template>

<style>
.info_head_logo{
  font-family: var(--title-font-family);
}
@media (prefers-color-scheme: light) {
    .dark_logo{
      display: none;
    }
    .light_logo{
      display: block;
    }
}
@media (prefers-color-scheme: dark) {
    .dark {
        color: white;
    }
    .dark_b{
      border-color: rgb(212, 212, 212);
    }
    .dark_back{
      background-color: black;
    }
    .dark_logo{
      display: block;
    }
    .light_logo{
      display: none;
    }
}
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