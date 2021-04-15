<template>
  <ion-base-layout pageTitle="프로필" >
    <ion-list>          
      <ion-item-divider class="pt-4 bg-white">
        <img slot="start" class="h-32 rounded-full mr-4 mb-4" :src="mainService.getExpertThumbImgUrl(state.expert.id)" @error="this.onerror=null;replaceByDefault($event)">
      </ion-item-divider>
        
      <ion-item color="light">
        <ion-label color="medium">회원유형</ion-label>
        <ion-label slot="end" color="dark">지도사</ion-label>
      </ion-item>

      <ion-item>
        <ion-label color="medium">이름</ion-label>
        <ion-label slot="end" color="dark">{{state.expert.name}}</ion-label>
      </ion-item>

      <ion-item>
        <ion-label color="medium">e-mail</ion-label>
        <ion-text slot="end" color="dark">{{state.expert.email}}</ion-text>
      </ion-item>

      <ion-item>
        <ion-label color="medium">지역</ion-label>
        <ion-label slot="end" color="dark">{{state.expert.region}}</ion-label>
      </ion-item>

      <ion-item>
        <ion-label color="medium">자격증</ion-label>
        <ion-label slot="end" color="dark">{{state.expert.license}}</ion-label>
      </ion-item>

      <ion-item>
        <ion-label color="medium">경력</ion-label>
        <ion-label slot="end" color="dark">{{state.expert.career}}</ion-label>
      </ion-item>

    </ion-list>
    <div v-if="globalState.memberType == 'client'" class="px-4 mb-2"> 
      <ion-button router-link="/order/list" class="" color="primary" type="button" expand="block">
        '<ion-icon class="mr-2" :icon="albumsOutline" />내 의뢰 관리'로
      </ion-button>
    </div>
    <div class="px-4 mb-4">
      <ion-button router-link="/expert/list" class="" color="secondary" type="button" expand="block">
        '<ion-icon class="mr-2" :icon="peopleOutline" />지도사 현황'으로
      </ion-button>
    </div>

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
  IonButton,
  IonIcon,
} from '@ionic/vue';
import {
  albumsOutline,
  peopleOutline,
} from 'ionicons/icons';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, onMounted, defineComponent } from 'vue';
import { Expert } from '@/types'
import { useRoute } from 'vue-router';
import * as util from '@/utils';

export default defineComponent ({
  name: 'Profile',

  components: { 
    IonList,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonText,    
    IonButton,
    IonIcon,
  },
  
  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();
    const route = useRoute();
    
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

    return {
      globalState,
      mainService,
      state,
      replaceByDefault,
      albumsOutline,
      peopleOutline,
    }
  }
})
</script> 