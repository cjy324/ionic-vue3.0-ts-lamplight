<template>
  <ion-base-layout pageTitle="이용 약관">
      <ion-custom-body class="justify-center items-center">
        <div class="self-start mb-3">
          <ion-buttons>
            <ion-button color="" @click="historyBack">
              <font-awesome-icon class="text-white text-2xl mt-3" icon="arrow-left"/>
            </ion-button>
          </ion-buttons>
        </div>
        <div>
          <img src="@/images/TermsOfService/TermsOfService001.jpg" alt="">
          <img src="@/images/TermsOfService/TermsOfService002.jpg" alt="">
          <img src="@/images/TermsOfService/TermsOfService003.jpg" alt="">
          <img src="@/images/TermsOfService/TermsOfService004.jpg" alt="">
          <img src="@/images/TermsOfService/TermsOfService005.jpg" alt="">
          <img src="@/images/TermsOfService/TermsOfService006.jpg" alt="">
          <img src="@/images/TermsOfService/TermsOfService007.jpg" alt="">
          <img src="@/images/TermsOfService/TermsOfService008.jpg" alt="">
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