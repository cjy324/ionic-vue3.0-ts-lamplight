<template>
  <ion-base-layout pageTitle="정보">
      <ion-custom-body class="justify-center">
        <div class="w-full text-center bg-gray-600 text-white">
          <div class="h-32 flex-col items-center justify-center">
            <div class="info_head_logo text-6xl mb-6">
              상장례
            </div>
            <div class="mb-8">
              ver 1.0.0
            </div>
            <div v-if="globalState.isLogined">
              <ion-button @click="logout" class="font-bold text-md" color="dark">
                로그아웃
              </ion-button>
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