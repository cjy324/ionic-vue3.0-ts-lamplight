<template>
  <ion-base-layout pageTitle="프로필" >
    <ion-buttons>
      <ion-button color="" @click="historyBack">
        <font-awesome-icon class="text-gray-600 text-2xl mt-3" icon="arrow-left"/>
      </ion-button>
    </ion-buttons>
    <ion-list>          
      <ion-item-divider class="pt-4 bg-white">
        <img slot="start" class="h-32 rounded-full mr-4 mb-4" :src="mainService.getExpertThumbImgUrl(state.expert.id)" @error="this.onerror=null;replaceByDefault($event)">
      </ion-item-divider>
        
      <ion-item color="medium">
        <ion-label color="">회원유형</ion-label>
        <ion-label slot="end" color="dark">장례지도사</ion-label>
      </ion-item>

      <ion-item>
        <ion-label color="">이름</ion-label>
        <ion-label slot="end" color="dark">{{state.expert.name}}</ion-label>
      </ion-item>

      <ion-item>
        <ion-label color="">e-mail</ion-label>
        <ion-text slot="end" color="dark">{{state.expert.email}}</ion-text>
      </ion-item>

      <ion-item>
        <ion-label color="">지역</ion-label>
        <ion-label slot="end" color="dark">{{state.expert.region}}</ion-label>
      </ion-item>

      <ion-item>
        <ion-label color="">자격증</ion-label>
        <ion-label slot="end" color="dark">{{state.expert.license}}</ion-label>
      </ion-item>

      <ion-item>
        <ion-label color="">경력</ion-label>
        <ion-label slot="end" color="dark">{{state.expert.career}}</ion-label>
      </ion-item>

    </ion-list>
  </ion-base-layout>
</template>

<style>
</style>

<script lang="ts">

import { 
  IonList,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonText,
  IonButtons,  
  IonButton,
  //IonIcon,
} from '@ionic/vue';
import {
  albumsOutline,
  peopleOutline,
} from 'ionicons/icons';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, onMounted, defineComponent } from 'vue';
import { Expert } from '@/types'
import { useRoute, useRouter } from 'vue-router';
import * as util from '@/utils';

export default defineComponent ({
  name: 'Profile',

  components: { 
    IonList,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonText,
    IonButtons,      
    IonButton,
    //IonIcon,
  },
  
  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();
    const route = useRoute();
    const router = useRouter();
    
    const state = reactive({
      expert: {} as Expert
    });

    //기본이미지
    function replaceByDefault(e: any) {
      e.target.src = 'https://via.placeholder.com/500x500?text=NoImage'
    }

    let id = 0
    if ( route.query.id != null ) {
      id = util.toIntOrNull(route.query.id);
    }

    async function loadExpert(id: number) {
      const axRes = await mainService.expert_detail(id)
      state.expert = axRes.data.body.expert;
    }
    onMounted(() => {
      loadExpert(id);
    });

    function historyBack(){
      router.go(-1)
    }

    return {
      globalState,
      mainService,
      state,
      historyBack,
      replaceByDefault,
      albumsOutline,
      peopleOutline,
    }
  }
})
</script> 