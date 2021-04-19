<template>
  <ion-base-layout pageTitle="의뢰">
      <ion-custom-body class="justify-center">
        <div class="logo-box text-center flex justify-center items-center mb-3">
          <div class="w-32 text-2xl font-bold border-b">
            ORDER
          </div>
        </div>
        <div v-if="globalState.isLogined">
          <div v-if="globalState.memberType == 'client'" class="px-4">
            <ion-button color="light" type="button" expand="block" router-link="/order/add">
              <font-awesome-icon class="mr-2" icon="edit"></font-awesome-icon>
              <span class="font-semibold">
                새 의뢰 요청
              </span>
            </ion-button>
          </div>
          <div v-if="globalState.memberType == 'expert'" class="px-4">
            <ion-button color="light" type="button" expand="block" router-link="/order/allList" @click="setOpen(true)">
              <ion-loading
              :is-open="isOpenRef"
              message="로딩중..."
              :duration="timeout"
              @onDidDismiss="setOpen(false)"
              spinner="dots"
              />
              <ion-icon class="mr-1" :icon="searchCircleOutline" /> 
              <span class="font-semibold">
                의뢰 요청 현황
              </span>
            </ion-button>
          </div>
          <div class="px-4">
            <ion-button color="medium" type="button" expand="block" router-link="/order/list" @click="setOpen(true)">
              <ion-loading
              :is-open="isOpenRef"
              message="로딩중..."
              :duration="timeout"
              @onDidDismiss="setOpen(false)"
              spinner="dots"
              />
              <font-awesome-icon class="mr-2" icon="clipboard-list"></font-awesome-icon>
              <span class="font-semibold">
                내 의뢰 관리
              </span>
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
</style>

<script lang="ts">
import { IonCustomBody, IonCustomLink } from '@/components/';
import {
  IonLoading,  
  IonButton,
  IonIcon, 
} from '@ionic/vue';
import {
  searchCircleOutline
} from 'ionicons/icons'
import { useGlobalState } from '@/stores'
import { defineComponent, ref } from 'vue'

export default defineComponent ({
  name: 'OrderMain',
  props: {
    timeout: { type: Number, default: 1000 },
  },
  components: {
    IonLoading,  
    IonButton,
    IonCustomBody,
    IonCustomLink,
    IonIcon, 
  },

  setup() {
    const globalState = useGlobalState();

    //로딩 관련
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => isOpenRef.value = state;

    return {
      globalState,
      searchCircleOutline,
      isOpenRef, 
      setOpen,
    }
  }
})
</script> 