<template>

  <ion-header>
    <ion-toolbar>
      <div class="ml-2">
        <slot ></slot>
      </div>
      <ion-buttons slot="primary" v-if="globalState.isLogined">
        <ion-button :href="'/'+ globalState.memberType + '/myPage'" class="mr-2">
          <img v-if="globalState.memberType == 'client'" class="rounded-full" :src="mainService.getClientThumbImgUrlForHeader(globalState.loginedClient.id)" alt="">
          <!-- loginedExpert 생성 후 아래 주석 풀 것 -->
          <!-- <img v-if="globalState.memberType == 'expert'" class="rounded-full" :src="mainService.getExpertThumbImgUrlForHeader(globalState.loginedExpert.id)" alt=""> -->
        </ion-button>
        <ion-button @click="logout" class="mr-2 font-bold text-md text-gray-600">
          Log-Out
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="primary" v-else>
        <ion-button href="/member/main" class="mr-3 font-bold text-md text-blue-600">
          Log-In
        </ion-button>
        <ion-button href="/member/signupMain" class="mr-2 font-bold text-md text-gray-600">
          Sign-Up
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  
</template>

<script lang="ts">
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services'
import { useRouter } from 'vue-router'
import { 
  IonHeader, 
  IonToolbar,
  //IonPage, 
  //IonTitle,
  //IonItem,
  //IonMenuButton,
  IonButtons,
  IonButton,
} from '@ionic/vue';
import * as util from '@/utils';
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'IonCustomHeader',

  components: { 
    //IonPage, 
    IonHeader, 
    IonToolbar, 
    //IonTitle,
    //IonItem,
    //IonMenuButton,
    IonButtons,
    IonButton,
  },

  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();
    const router = useRouter();

    const logout = () => {
      globalState.setLogouted();
      //window.location.reload();
      util.showAlert('로그아웃 되셨습니다.');
      window.location.replace('/home/main')

    };
    return {
      globalState,
      mainService,
      logout
    }
  }
})
</script> 