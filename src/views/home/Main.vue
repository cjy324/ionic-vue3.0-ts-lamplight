<template>
    <ion-custom-header>홈</ion-custom-header>
    <ion-custom-grid-body class="grid-cols-2 grid-rows-2">
    <ion-card>
    <ion-card-header>
      <ion-card-subtitle>Client</ion-card-subtitle>
      <ion-item>
      <ion-button fill="outline" slot="end">View</ion-button>
      <ion-card-title>Card Title</ion-card-title>
      </ion-item>
    </ion-card-header>

    <ion-card-content>
      Keep close to Nature's heart... and break clear away, once in awhile,
      and climb a mountain or spend a week in the woods. Wash your spirit clean.
    </ion-card-content>
  </ion-card>

  <ion-card>
    <ion-card-header>
      <ion-card-subtitle>Expert</ion-card-subtitle>
      <ion-item>
      <ion-button fill="outline" slot="end">View</ion-button>
      <ion-card-title>Card Title</ion-card-title>
      </ion-item>
    </ion-card-header>

    <ion-card-content>
      Keep close to Nature's heart... and break clear away, once in awhile,
      and climb a mountain or spend a week in the woods. Wash your spirit clean.
    </ion-card-content>
  </ion-card>

  <ion-card>
    <ion-card-header>
      <ion-card-subtitle>Assistant</ion-card-subtitle>
      <ion-item>
      <ion-button fill="outline" slot="end">View</ion-button>
      <ion-card-title>Card Title</ion-card-title>
      </ion-item>
    </ion-card-header>

    <ion-card-content>
      Keep close to Nature's heart... and break clear away, once in awhile,
      and climb a mountain or spend a week in the woods. Wash your spirit clean.
    </ion-card-content>
  </ion-card>

  <ion-card>
    <ion-card-header>
      <ion-card-subtitle>Order</ion-card-subtitle>
      <ion-item>
      <ion-button fill="outline" slot="end">View</ion-button>
      <ion-card-title>Card Title</ion-card-title>
      </ion-item>
    </ion-card-header>

    <ion-card-content>
      Keep close to Nature's heart... and break clear away, once in awhile,
      and climb a mountain or spend a week in the woods. Wash your spirit clean.
    </ion-card-content>
  </ion-card>

 

  </ion-custom-grid-body>

    <!-- <ion-content :fullscreen="true">
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
    </ion-content> -->
</template>

<style>
</style>

<script lang="ts">
import { IonCustomHeader, IonCustomGridBody } from '@/components/';
import { 
  //IonContent,
  IonButton,
  IonCard, 
  IonCardContent, 
  IonCardSubtitle, 
  IonCardTitle,  
  IonItem, 

} from '@ionic/vue';
import { useGlobalState } from '@/stores'

export default  {
  name: 'Main',
  
  components: { 
    //IonContent, 
    IonCustomHeader,
    IonCustomGridBody,
    IonButton,
    IonCard, 
    IonCardContent, 
    IonCardSubtitle, 
    IonCardTitle, 
    IonItem, 
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