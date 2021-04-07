<template>
  <ion-page>
    <ion-custom-header>지도사 - Profile</ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">지도사 - Profile</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-custom-body class="justify-center">
        <div class="container mx-auto">
          <div class="px-6 py-6 bg-white rounded-lg shadow-md">
            <ion-list>
              
              <ion-list-header>
                Profile
              </ion-list-header>
              
              <ion-item-divider>
                <img slot="end" v-if="state.expert.extra__thumbImg != null" class="h-32 rounded-3xl" :src="'http://localhost:8090' + state.expert.extra__thumbImg">
                <img slot="end" v-else class="h-32 rounded-3xl" :src="'http://via.placeholder.com/300?text=NoImage'">
              </ion-item-divider>
              
              <ion-item>
                <ion-label>회원유형</ion-label>
                <ion-label slot="end" color="success">지도사</ion-label>
              </ion-item>

              <ion-item>
                <ion-label>이름</ion-label>
                <ion-label slot="end" color="tertiary">{{state.expert.name}}</ion-label>
              </ion-item>

              <ion-item>
                <ion-label>연락처</ion-label>
                <ion-label slot="end" color="tertiary">{{state.expert.cellphoneNo}}</ion-label>
              </ion-item>

              <ion-item>
                <ion-label>e-mail</ion-label>
                <ion-label slot="end" color="tertiary">{{state.expert.email}}</ion-label>
              </ion-item>

              <ion-item>
                <ion-label>지역</ion-label>
                <ion-label slot="end" color="warning">{{state.expert.region}}</ion-label>
              </ion-item>

              <ion-item>
                <ion-label>자격증</ion-label>
                <ion-label slot="end" color="warning">{{state.expert.license}}</ion-label>
              </ion-item>

              <ion-item>
                <ion-label>경력</ion-label>
                <ion-label slot="end" color="warning">{{state.expert.career}}</ion-label>
              </ion-item>

            </ion-list>
            <ion-list>
              <ion-item-divider class="btns mt-2">
                <ion-button slot="end" href="/expert/list">
                  리스트로 돌아가기
                </ion-button>
              </ion-item-divider>
              <ion-item-divider class="btns mt-2">
                <ion-button slot="end" @click="presentActionSheet">
                  전화하기
                </ion-button>
              </ion-item-divider>
            </ion-list>
          </div>
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
  IonListHeader,
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonList,
  IonItem,
  IonItemDivider,
  IonLabel,  
  IonButton,
  actionSheetController,
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, onMounted } from 'vue';
import { Expert } from '@/types'
import { useRoute } from 'vue-router';
import * as util from '@/utils';

export default  {
  name: 'Profile',

  components: { 
    IonCustomBody, 
    IonCustomHeader, 
    IonPage, 
    IonHeader,
    IonListHeader,
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonList,
    IonItem,
    IonItemDivider,
    IonLabel,  
    IonButton,
  },
  
  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();
    const route = useRoute();
    
    const state = reactive({
      expert: {} as Expert
    });

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

    async function presentActionSheet() {
      const actionSheet = await actionSheetController
        .create({
          header: '연락처',
          buttons: [
            {
              text: state.expert.cellphoneNo,
              handler: () => {
                console.log('call clicked')
              },
            },
          ],
        });
      return actionSheet.present();
    }

    return {
      globalState,
      state,
      presentActionSheet
    }
  }
}
</script> 