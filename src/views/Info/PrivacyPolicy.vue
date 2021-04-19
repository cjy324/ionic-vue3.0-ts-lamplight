<template>
  <ion-base-layout pageTitle="개인정보처리방침">
      <ion-custom-body class="justify-center items-center">
        <div class="self-start">
          <ion-buttons>
            <ion-button color="" @click="historyBack">
              <font-awesome-icon class="text-white text-lg" icon="arrow-left"/>
            </ion-button>
          </ion-buttons>
        </div>
        <div>
          <img src="@/images/PrivacyPolicy/PrivacyPolicy001.jpg" alt="">
          <img src="@/images/PrivacyPolicy/PrivacyPolicy002.jpg" alt="">
          <img src="@/images/PrivacyPolicy/PrivacyPolicy003.jpg" alt="">
          <img src="@/images/PrivacyPolicy/PrivacyPolicy004.jpg" alt="">
        </div>
      </ion-custom-body>
  </ion-base-layout>
</template>

<style>
</style>

<script lang="ts">
import { 
  IonCustomBody,
} from '@/components/';
import { 
  IonButtons,
  IonButton
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
//import * as util from '@/utils';

export default defineComponent ({
  name: 'PrivacyPolicy',
  components: { 
    IonCustomBody,
    IonButtons,
    IonButton 

},
  setup() {
    const globalState = useGlobalState();
    const router = useRouter();
    
    function historyBack(){
      router.go(-1)
    }

    return {
      globalState,
      historyBack

    }
  }
})
</script> 