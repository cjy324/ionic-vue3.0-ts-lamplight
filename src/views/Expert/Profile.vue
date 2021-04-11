<template>
  <ion-page>
    <ion-custom-header>프로필</ion-custom-header>
    
      <ion-custom-body class="justify-center">
        <ion-content :fullscreen="true">

            <ion-list>
              
              <ion-item-divider class="pt-4">
                <img slot="start" class="h-32 rounded-full mr-4 mb-4" :src="mainService.getExpertThumbImgUrl(state.expert.id)">
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
            <div class="px-4">
              <ion-button router-link="/expert/list" color="medium" type="button" expand="block">
                리스트로 돌아가기
              </ion-button>
            </div>

        </ion-content>
      </ion-custom-body>
    
  </ion-page>
</template>

<style>
</style>

<script lang="ts">
import { IonCustomBody, IonCustomHeader } from '@/components/';
import { 
  IonPage, 
  //IonHeader,
  //IonListHeader,
  //IonToolbar, 
  //IonTitle, 
  IonContent,
  IonList,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonText,  
  IonButton,
  //actionSheetController,
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, onMounted, defineComponent } from 'vue';
import { Expert } from '@/types'
import { useRoute } from 'vue-router';
import * as util from '@/utils';

export default defineComponent ({
  name: 'Profile',

  components: { 
    IonCustomBody, 
    IonCustomHeader, 
    IonPage, 
    //IonHeader,
    //IonListHeader,
    //IonToolbar, 
    //IonTitle, 
    IonContent,
    IonList,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonText,    
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

    // async function presentActionSheet() {
    //   const actionSheet = await actionSheetController
    //     .create({
    //       header: '연락처',
    //       buttons: [
    //         {
    //           text: state.expert.cellphoneNo,
    //           handler: () => {
    //             console.log('call clicked')
    //           },
    //         },
    //       ],
    //     });
    //   return actionSheet.present();
    // }

    return {
      globalState,
      mainService,
      state,
    //  presentActionSheet
    }
  }
})
</script> 