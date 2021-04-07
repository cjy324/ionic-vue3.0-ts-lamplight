<template>
  <ion-page>
    <ion-custom-header>홈 - 메인</ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">홈 - 메인</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-custom-body class="justify-center">
        <div v-if="globalState.isLogined" class="bg-green-500">
          로그인 회원: {{globalState.loginedClient.name}}
        </div>
        <div v-else class="bg-red-500">
          로그인 상태: {{globalState.isLogined}}
        </div>
        <div v-if="globalState.isLogined" class="logo-box text-center">
          <ion-button @click="logout" expand="block">로그아웃</ion-button>
        </div>
      </ion-custom-body>
    </ion-content>
  </ion-page>
</template>

<style>
</style>

<script lang="ts">
import { IonCustomBody, IonCustomHeader } from '@/components/';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonButton,

} from '@ionic/vue';
import { useGlobalState } from '@/stores'

export default  {
  name: 'Main',
  
  components: { 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonPage, 
    IonCustomBody, 
    IonCustomHeader,
    IonButton,
  },
  
  setup() {
    const globalState = useGlobalState();

    const logout = () => {
      globalState.setLogouted();
      window.location.reload();
    };

    return {
      globalState,
      logout
    }
  }
}
</script>