<template>
  <ion-base-layout pageTitle="의뢰">
      <ion-custom-body class="justify-center">
        <div class="logo-box text-center flex justify-center items-center mb-3">
          <div class="w-32 text-2xl font-bold border-b">
            ORDER
          </div>
        </div>
        <div v-if="globalState.isLogined">
          <div class="px-4">
            <ion-button class="btn-primary" color="" type="button" expand="block" router-link="/order/add">
              <font-awesome-icon class="mr-2" icon="edit"></font-awesome-icon>
              새 의뢰 요청
            </ion-button>
          </div>
          <div class="px-4">
            <ion-button class="btn-secondary" color="" type="button" expand="block" router-link="/order/list">
              <font-awesome-icon class="mr-2" icon="clipboard-list"></font-awesome-icon>
              내 의뢰 현황 보기
            </ion-button>
          </div>
        </div>
        <div v-else class="py-2 px-4 w-full text-center">
          <div class="py-2 px-4">
            로그인 후 이용가능합니다.
            <ion-custom-link to="/member/main">Log-In</ion-custom-link>하러가기
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
  name: 'OrderMain',

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