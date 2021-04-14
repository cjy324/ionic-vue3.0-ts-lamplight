<template>
  <ion-base-layout pageTitle="홈">
    <ion-custom-body class="home">
      <div class="home_head w-full text-center bg-gray-600 text-white mt-12">
        <div class="h-32 flex items-center justify-center">
          <div class="home_head_logo text-6xl">
            상장례
          </div>
        </div>
        <div class="mt-6">
          원하는 서비스를 선택하세요.
        </div>
      </div>
    
      <div class="home_body w-full h-80 flex flex-col items-center justify-center">
        
        <div class="home_body_cell flex flex-col items-center justify-center rounded-lg w-11/12 h-4/6">
          <div v-if="globalState.isLogined == false" class="mb-2 w-full px-14">
            <ion-button expand="block" color="light" router-link="/member/main">
              <ion-icon :icon="enterOutline" />
              <span class="ml-2">로그인</span>
            </ion-button>
          </div>
          <div v-if="globalState.isLogined == false" class="mb-2 w-full px-14">
            <ion-button expand="block" color="light" router-link="/member/signupMain">
              <ion-icon :icon="personAddOutline" />
              <span class="ml-2">회원가입</span>
            </ion-button>
          </div>
          <div v-if="globalState.memberType == 'client'" class="mb-2 w-full px-14">
            <ion-button expand="block" color="light" router-link="/order/add">
              <ion-icon :icon="addCircleOutline" /> 
              <span class="ml-2">새 의뢰 요청</span>
            </ion-button>
          </div>
          <div v-if="globalState.memberType == 'expert'" class="mb-2 w-full px-14">
            <ion-button expand="block" color="light" router-link="/order/allList" @click="setOpen(true)">
              <ion-loading
              :is-open="isOpenRef"
              message="로딩중..."
              :duration="timeout"
              @onDidDismiss="setOpen(false)"
              spinner="dots"
              />
              <ion-icon :icon="searchCircleOutline" /> 
              <span class="ml-2">의뢰 요청 현황</span>
            </ion-button>
          </div>
          <div v-if="globalState.isLogined" class="mb-2 w-full px-14">
            <ion-button expand="block" color="light" router-link="/order/list" @click="setOpen(true)">
              <ion-loading
              :is-open="isOpenRef"
              message="로딩중..."
              :duration="timeout"
              @onDidDismiss="setOpen(false)"
              spinner="dots"
              />
              <ion-icon :icon="albumsOutline" />
              <span class="ml-2">내 의뢰 관리</span>
            </ion-button>
          </div>
          <div class="mb-2 w-full px-14">
            <ion-button expand="block" color="light" router-link="/expert/list" @click="setOpen(true)">
              <ion-loading
              :is-open="isOpenRef"
              message="로딩중..."
              :duration="timeout"
              @onDidDismiss="setOpen(false)"
              spinner="dots"
              />
              <ion-icon :icon="peopleOutline" />
              <span class="ml-2">지도사 현황</span>
            </ion-button>
          </div>
          <div v-if="globalState.isLogined" class="mb-2 w-full px-14">
            <ion-button expand="block" color="light" :router-link="'/' + globalState.memberType + '/myPage'">
              <ion-icon :icon="personCircleOutline" />
              <span class="ml-2">내 정보 관리</span>
            </ion-button>
          </div>
        </div>

      </div>    
    </ion-custom-body>
  </ion-base-layout>
</template>

<style>
.home_head_logo{
  font-family: var(--title-font-family);
}
</style>

<script lang="ts">
import { IonCustomBody  } from '@/components/';
import {
  IonLoading, 
  IonButton,
  IonIcon,

} from '@ionic/vue';
import {
  addCircleOutline,
  albumsOutline,
  peopleOutline,
  personCircleOutline,
  enterOutline,
  personAddOutline,
  searchCircleOutline,
} from 'ionicons/icons';
import { useGlobalState } from '@/stores';
import { defineComponent, ref } from 'vue';

export default defineComponent ({
  name: 'Main',
  
  props: {
    timeout: { type: Number, default: 1000 },
  },

  components: { 
    IonCustomBody,
    IonLoading, 
    IonButton,
    IonIcon,

  },
  
  setup() {
    const globalState = useGlobalState();

    //로딩 관련
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => isOpenRef.value = state;

    return {
      globalState,
      addCircleOutline,
      albumsOutline,
      peopleOutline,
      personCircleOutline,
      enterOutline,
      personAddOutline,
      searchCircleOutline,
      isOpenRef,
      setOpen,

    }
  }
})
</script>