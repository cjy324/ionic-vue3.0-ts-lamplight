<template>
  <ion-page>
  <ion-custom-header>홈</ion-custom-header>
  <div class="w-full text-center bg-gray-600 text-white">
    <div class="h-32 flex items-center justify-center">
      <div class="text-4xl">
        LAMPLIGHT
      </div>
    </div>
    <div>
      원하는 서비스를 선택하세요.
    </div>
  </div>

  <ion-custom-grid-body class="container grid-cols-2 grid-rows-2">
    <ion-card class="rounded-2xl">
      <ion-card-content>
        <div class="w-full text-center mt-2">
          <font-awesome-icon class="text-5xl text-gray-700" icon="user" />
        </div>

        <div class="w-full text-center text-md border-b-2 mt-4">
          <span>의뢰인</span>
        </div>

        <div class="w-full px-3">
          <ion-button v-if="globalState.isLogined && globalState.memberType == 'client'" color="dark" fill="outline" expand="block" href="/client/myPage">
            MyPage
          </ion-button>
          <ion-button v-else color="" fill="outline" expand="block" href="/client/login">
            Log-In
          </ion-button>
        </div>
      </ion-card-content>
    </ion-card>

    <ion-card class="rounded-2xl">
      <ion-card-content>
        <div class="w-full text-center mt-2">
          <font-awesome-icon class="text-5xl text-gray-700" icon="user-tie" />
        </div>

        <div class="w-full text-center text-md border-b-2 mt-4">
          <span>지도사</span>
        </div>

        <div class="w-full px-3">
          
          <ion-button v-if="globalState.isLogined && globalState.memberType == 'expert'" color="dark" fill="outline" expand="block" href="/expert/myPage">
            MyPage
          </ion-button>
          
          <ion-button v-else color="" fill="outline" expand="block" href="/expert/login">
            Log-In
          </ion-button>
          
        </div>
      </ion-card-content>
    </ion-card>

    <ion-card class="rounded-2xl">
      <ion-card-content>
        <div class="w-full text-center mt-2">
          <font-awesome-icon class="text-5xl text-gray-700" icon="user-friends" />
        </div>

        <div class="w-full text-center text-md border-b-2 mt-4">
          <span>도우미</span>
        </div>

        <div class="w-full px-3">
          <ion-button disabled v-if="globalState.isLogined && globalState.memberType == 'assistant'" color="dark" fill="outline" expand="block" @click="logout">Log-Out</ion-button>
          <ion-button disabled v-else color="medium" fill="outline" expand="block" >준비중</ion-button>
        </div>
      </ion-card-content>
    </ion-card>

    <ion-card v-if="globalState.isLogined" class="rounded-2xl">
      <ion-card-content>
        <div class="w-full text-center mt-2">
          <font-awesome-icon class="text-5xl text-gray-700" icon="clipboard" />
        </div>

        <div class="w-full text-center text-md border-b-2 mt-4">
          <span>의뢰</span>
        </div>

        <div class="w-full px-3">
          <ion-button color="" fill="outline" expand="block" href="/order/list">
            List
          </ion-button>
        </div>
      </ion-card-content>
    </ion-card>

    <ion-card v-else class="rounded-2xl">
      <ion-card-content>
        <div class="w-full text-center mt-2">
          <font-awesome-icon class="text-5xl text-gray-700" icon="users" />
        </div>

        <div class="w-full text-center text-md border-b-2 mt-4">
          <span>지도사 현황</span>
        </div>

        <div class="w-full px-3">
          <ion-button color="" fill="outline" expand="block" href="/expert/list">
            List
          </ion-button>
        </div>
      </ion-card-content>
    </ion-card>
  </ion-custom-grid-body>
  </ion-page>
</template>

<style>
.container{
  grid-template-rows: repeat(2, 30%);
}

</style>

<script lang="ts">
import { IonCustomHeader, IonCustomGridBody } from '@/components/';
import { 
  //IonContent,
  IonPage,
  IonButton,
  IonCard, 
  IonCardContent, 
  //IonCardSubtitle,
  //IonCardTitle,  
  //IonItem, 

} from '@ionic/vue';
import { useGlobalState } from '@/stores';
import { defineComponent } from 'vue';

export default defineComponent ({
  name: 'Main',
  
  components: { 
    IonPage,
    //IonContent, 
    IonCustomHeader,
    IonCustomGridBody,
    IonButton,
    IonCard, 
    IonCardContent, 
    //IonCardSubtitle, 
    //IonCardTitle, 
    //IonItem, 
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
})
</script>