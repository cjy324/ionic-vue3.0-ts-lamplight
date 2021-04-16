<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button
            :default-href="pageDefaultBackLink"
          ></ion-back-button>
        </ion-buttons>
        <ion-title class="text-md">{{ pageTitle }}</ion-title>
        <ion-buttons slot="primary" v-if="globalState.isLogined">
          <ion-button :router-link="'/'+ globalState.memberType + '/myPage'" class="mr-2">
            <!-- 의뢰인 -->
            <img v-if="globalState.memberType == 'client'" class="profile_img rounded-full w-12" :src="mainService.getClientThumbImgUrlForHeader(globalState.loginedClient.id)" @error="this.onerror=null;replaceByDefault($event)">
            <!-- 지도사 -->
            <img v-if="globalState.memberType == 'expert'" class="profile_img rounded-full w-12" :src="mainService.getExpertThumbImgUrlForHeader(globalState.loginedExpert.id)" @error="this.onerror=null;replaceByDefault($event)">
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="primary" v-else>
          <ion-button router-link="/member/main" class="font-bold text-md" color="primary">
            로그인
          </ion-button>
          <ion-button router-link="/member/signupMain" class="font-bold text-md" color="dark">
            회원가입
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

<style>
</style>

<script lang="ts">

import { useGlobalState } from '@/stores'
import { useMainService } from '@/services'

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

    //기본이미지
    function replaceByDefault(e: any) {
      e.target.src = 'https://via.placeholder.com/500x500?text=NoImage'
    }

    return {
      globalState,
      mainService,
      replaceByDefault,
    }
  }
})
</script> 