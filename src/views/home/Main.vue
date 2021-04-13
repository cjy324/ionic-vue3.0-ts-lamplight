<template>
  <ion-base-layout pageTitle="홈">
    <ion-custom-body class="home">
      <div class="home_head w-full text-center bg-gray-600 text-white mt-12">
        <div class="h-32 flex items-center justify-center">
          <div class="text-4xl">
            LAMPLIGHT
          </div>
        </div>
        <div>
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
            <ion-button expand="block" color="light" router-link="/order/allList">
              <ion-icon :icon="searchCircleOutline" /> 
              <span class="ml-2">의뢰 요청 현황</span>
            </ion-button>
          </div>
          <div v-if="globalState.isLogined" class="mb-2 w-full px-14">
            <ion-button expand="block" color="light" router-link="/order/list">
              <ion-icon :icon="albumsOutline" />
              <span class="ml-2">내 의뢰 관리</span>
            </ion-button>
          </div>
          <div class="mb-2 w-full px-14">
            <ion-button expand="block" color="light" router-link="/expert/list">
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
</style>

<script lang="ts">
import { IonCustomBody  } from '@/components/';
import { 
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
import { defineComponent } from 'vue';

export default defineComponent ({
  name: 'Main',
  
  components: { 
    IonCustomBody,
    IonButton,
    IonIcon,

  },
  
  setup() {
    const globalState = useGlobalState();

    const logout = () => {
      globalState.setLogouted();
      window.location.reload();
    };

    return {
      globalState,
      logout,
      addCircleOutline,
      albumsOutline,
      peopleOutline,
      personCircleOutline,
      enterOutline,
      personAddOutline,
      searchCircleOutline,
    }
  }
})
</script>