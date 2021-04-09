<template>
  <ion-custom-header>의뢰 정보</ion-custom-header>
  <ion-custom-body class="justify-center">
    <ion-content :fullscreen="true">
      <ion-list v-if="globalState.isLogined" class="mb-14">
        
        <ion-item-divider :color="returnColorByLevel(state.order.stepLevel)">
          <ion-label color="">진행 현황 : {{returnToString(state.order.stepLevel)}}</ion-label>
        </ion-item-divider>

        <div class="flex justify-end mr-2 mt-2">
          <ion-buttons color="light">
            <ion-button :href="'/order/modify?id=' + state.order.id">
              <font-awesome-icon class="text-lg h-7" icon="edit" />
            </ion-button>
            <ion-button v-if="state.order.stepLevel < 3" @click="deleteOrder(globalState.loginedClient.id)">
              <font-awesome-icon class="text-lg h-7" icon="ban" />
            </ion-button>
          </ion-buttons>
        </div>

        <ion-item color="light">
          <ion-label color="medium">고인 이름</ion-label>
          <ion-label slot="end" color="dark">{{state.order.deceasedName}}</ion-label>
        </ion-item>
              
        <ion-item>
          <ion-label color="medium">상주 이름</ion-label>
          <ion-label slot="end" color="dark">{{state.order.bereavedName}}</ion-label>
        </ion-item>

        <ion-item v-if="globalState.loginedClient.id == state.order.clientId">
            <ion-label color="medium">담당지도사</ion-label>
            <ion-label slot="end" color="dark">{{state.order.extra__expertName}}</ion-label>
        </ion-item>

        <ion-item v-if="globalState.loginedClient.id == state.order.clientId">
          <ion-label slot="" color="medium">연락처</ion-label>
          <ion-label slot="end" color="">
            <ion-button v-if="globalState.loginedClient.id == state.order.clientId" color="" slot="end">
              {{state.order.extra__expertCellphoneNo}}
            </ion-button>
          </ion-label>
        </ion-item>

        <!-- <ion-item v-if="globalState.loginedExpert.id == state.order.expertId">
          <ion-label>의뢰인</ion-label>
          <ion-label slot="end" color="tertiary">{{state.order.extra__clientName}}</ion-label>
          <ion-button v-if="globalState.loginedExpert.id == state.order.expertId" color="" slot="end">
            연락처: {{state.order.extra__expertCellphoneNo}}
          </ion-button>
        </ion-item> -->

        <ion-item>
          <ion-label color="medium">장례식장</ion-label>
          <ion-label slot="end" color="dark">{{state.order.funeralHome}}</ion-label>
        </ion-item>

        <ion-item>
          <ion-label color="medium">종교</ion-label>
          <ion-label slot="end" color="dark">{{state.order.religion}}</ion-label>
        </ion-item>

        <ion-item>
          <ion-label color="medium">시작일</ion-label>
          <ion-label slot="end" color="dark">{{state.order.startDate}}</ion-label>
        </ion-item>

        <ion-item>
          <ion-label color="medium">종료일</ion-label>
          <ion-label slot="end" color="dark">{{state.order.endDate}}</ion-label>
        </ion-item>

        <ion-item>
          <ion-label color="medium">추가 요청 사항</ion-label>
        </ion-item>
        <ion-item-divider>
          <ion-text slot="start" color="dark">{{state.order.body}}</ion-text>
        </ion-item-divider>

        <div class="btns mt-2 w-full flex justify-end">
          <ion-button v-if="globalState.memberType !== 'expert'" :color="returnColorByLevel(state.order.stepLevel+1)" slot="end" @click="changeStepLevel(state.order.id, state.order.stepLevel)">
            {{returnToString(state.order.stepLevel+1)}}
          </ion-button>
        </div>
      </ion-list>
      <div v-else class="py-2 px-4">
        로그인 후 이용가능합니다. <ion-custom-link to="/client/login">로그인</ion-custom-link> 하러 가기
      </div>
    </ion-content>
  </ion-custom-body>
</template>

<style>
.btn-cancel2{
  --background:var(--ion-color-danger-shade)
}
</style>

<script lang="ts">
import { IonCustomBody, IonCustomHeader, IonCustomLink } from '@/components/';
import { 
  //IonPage, 
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
  //IonButtons,
  IonButton, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as util from '@/utils';
import { Order } from '@/types';

export default  {
  name: 'MyOrder',

  components: { 
    IonCustomBody, 
    IonCustomHeader, 
    IonCustomLink,
    //IonPage, 
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
    //IonButtons,  
    IonButton, 
  },
  
  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();
    const route = useRoute();
    const router = useRouter();
    
    let id = 0;

    if ( route.query.id != null ) {
      id = util.toIntOrUnd(route.query.id)
    }
    
    const state = reactive({
      order: {} as Order
    });

    async function loadOrder(id: number) {
      const axRes = await mainService.order_detail(id)
      state.order = axRes.data.body.order;
    }
    onMounted(() => {
      loadOrder(id);
    });

    function returnColorByLevel(stepLevel: any) {
      let stepLevelToStr = ''; 
      if(stepLevel == 1){
        stepLevelToStr = 'medium';
      }
      if(stepLevel == 2){
        stepLevelToStr = 'success';
      }
      if(stepLevel == 3){
        stepLevelToStr = 'primary';
      }
      if(stepLevel == 4){
        stepLevelToStr = 'warning';
      }
      if(stepLevel == 5){
        stepLevelToStr = 'daek';
      }
      
      return stepLevelToStr;
    }

    function returnToString(stepLevel: any) {
      let stepLevelToStr = ''; 
      if(stepLevel == 1){
        stepLevelToStr = '의뢰요청';
      }
      if(stepLevel == 2){
        stepLevelToStr = '의뢰검토(장례준비중)';
      }
      if(stepLevel == 3){
        stepLevelToStr = '장례진행중';
      }
      if(stepLevel == 4){
        stepLevelToStr = '장례종료(종료확인요청)';
      }
      if(stepLevel == 5){
        stepLevelToStr = '종료확인(최종종료)';
      }
      
      return stepLevelToStr;
    }

    async function doChangeStepLevel(id: number, stepLevel: number){
      const axRes = await mainService.order_changeStepLevel(id, stepLevel)

          util.showAlert(axRes.data.msg)
          if ( axRes.data.fail ) {
            return;
          }
        window.location.reload();
    }

    async function changeStepLevel(id: number, stepLevel: number){
      const msg = '다음 단계를 진행하시겠습니까?'

      util.showAlertConfirm(msg).then(confirm => {
        if (confirm == false) {
          return
        } else {
          doChangeStepLevel(id, stepLevel)
        }
      })
    }

    async function doDeleteOrder(id: number) {
      const axRes = await mainService.order_delete(id)
      
      util.showAlert(axRes.data.msg)
      if(axRes.data.fail){
        return
      }
      
      router.replace("list");
    }

    async function deleteOrder(id: number){
      const msg = '정말 취소하시겠습니까?'

      util.showAlertConfirm(msg).then(confirm => {
        if (confirm == false) {
          return
        } else {
          doDeleteOrder(id)
        }
      })
    }

    return {
      globalState,
      state,
      returnColorByLevel,
      returnToString,
      changeStepLevel,
      deleteOrder
    }
  }
}
</script> 