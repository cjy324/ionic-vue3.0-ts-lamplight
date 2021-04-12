<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button
            :default-href="pageDefaultBackLink"
          ></ion-back-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
      <ion-buttons slot="primary" v-if="globalState.isLogined">
        <ion-button :href="'/'+ globalState.memberType + '/myPage'" class="mr-2">
          <img v-if="globalState.memberType == 'client'" class="rounded-full" :src="mainService.getClientThumbImgUrlForHeader(globalState.loginedClient.id)" alt="">
          <!-- loginedExpert 생성 후 아래 주석 풀 것 -->
          <!-- <img v-if="globalState.memberType == 'expert'" class="rounded-full" :src="mainService.getExpertThumbImgUrlForHeader(globalState.loginedExpert.id)" alt=""> -->
        </ion-button>
        <ion-button @click="logout" class="mr-2 font-bold text-md" color="dark">
          Log-Out
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="primary" v-else>
        <ion-button href="/member/main" class="mr-3 font-bold text-md" color="primary">
          Log-In
        </ion-button>
        <ion-button href="/member/signupMain" class="mr-2 font-bold text-md" color="dark">
          Sign-Up
        </ion-button>
      </ion-buttons>
        <ion-buttons slot="end">
          <slot name="actions-end"></slot>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <slot />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">

import { useGlobalState } from '@/stores'
import { useMainService } from '@/services'
import * as util from '@/utils';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButton,
  IonButtons,
} from "@ionic/vue";
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'IonBaseLayout',
  props: ["pageTitle", "pageDefaultBackLink"],
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButton,
    IonButtons,
  },
  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();
    //const router = useRouter();

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