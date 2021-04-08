<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons> 
        <ion-menu-button auto-hide="false"></ion-menu-button>
      </ion-buttons>
      <ion-buttons slot="primary" v-if="globalState.isLogined">
        <router-link to="/client/myPage" class="mr-2">
          <img class="rounded-full" :src="mainService.getClientThumbImgUrlForHeader(globalState.loginedClient.id)" alt="">
        </router-link>
        <ion-button @click="logout" class="mr-2 font-bold text-md text-gray-600">
          Log-Out
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="primary" v-else>
        <router-link to="/client/login" class="mr-3 font-bold text-md text-blue-600">
          Log-In
        </router-link>
        <router-link to="/client/join" class="mr-2 font-bold text-md text-gray-600">
          Sign-In
        </router-link>
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
  //IonTitle,
  //IonItem,
  IonMenuButton,
  IonButtons,
  IonButton,
} from '@ionic/vue';
import * as util from '@/utils';

export default {
  name: 'IonCustomHeader',

  components: { 
    IonHeader, 
    IonToolbar, 
    //IonTitle,
    //IonItem,
    IonMenuButton,
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
      router.replace('/home/main')

    };
    return {
      globalState,
      mainService,
      logout
    }
  }
}
</script> 