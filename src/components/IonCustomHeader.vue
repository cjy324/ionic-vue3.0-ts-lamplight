<template>
  <ion-header>
    <ion-toolbar>
      <div class="pr-5" slot="end">
        <div v-if="globalState.isLogined">
          {{globalState.loginedClient.name}}
        </div>
        <router-link v-if="globalState.isLogined" to="/client/myPage" class="cursor-pointer">
          <img class="rounded-full" :src="mainService.getClientThumbImgUrlForHeader(globalState.loginedClient.id)" alt="">
        </router-link>
        <ion-item>
          <ion-button v-if="globalState.isLogined" @click="logout">로그아웃</ion-button>
        </ion-item>
      </div>

          

      <ion-title>
        <slot></slot>
      </ion-title>
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
  IonTitle,
  IonItem,
  IonButton,
} from '@ionic/vue';
import * as util from '@/utils';

export default {
  name: 'IonCustomHeader',

  components: { 
    IonHeader, 
    IonToolbar, 
    IonTitle,
    IonItem,
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