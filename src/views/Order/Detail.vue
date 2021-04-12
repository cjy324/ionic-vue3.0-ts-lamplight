<template>
  <ion-base-layout pageTitle="의뢰 정보">
    <ion-list v-if="globalState.isLogined">
        
        <ion-item-divider :class="returnColorByLevel(state.order.stepLevel)">
          <ion-label color="light">진행 현황 : {{returnToString(state.order.stepLevel)}}</ion-label>
        </ion-item-divider>

        <div class="flex justify-end mr-2 mt-2 pb-1">
          <ion-buttons>
            <ion-button v-if="state.order.stepLevel < 4" :router-link="'/order/modify?id=' + state.order.id" color="dark">
              <font-awesome-icon class="text-sm mr-1" icon="edit" />
              <span class="text-gray-600 text-xs">수정</span>
            </ion-button>
            <ion-button v-if="state.order.stepLevel < 3" @click="deleteOrder(globalState.loginedClient.id)" color="dark">
              <font-awesome-icon class="text-sm mr-1" icon="ban" />
              <span class="text-gray-600 text-xm">의뢰취소</span>
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

        <ion-item>
          <ion-label color="medium">의뢰인</ion-label>
          <ion-label slot="end" color="dark">{{state.order.extra__clientName}}</ion-label>
        </ion-item>

        <!-- 지도사생성 후 주석 풀 것
        <ion-item v-if="globalState.loginedExpert.id == state.order.expertId">
          <ion-label slot="" color="medium">연락처</ion-label>
          <ion-label slot="end" color="">
            <ion-button color="" slot="end">
              <font-awesome-icon class="mr-2" icon="phone-alt"/>
              {{state.order.extra__clientCellphoneNo}}
            </ion-button>
          </ion-label>
        </ion-item> -->

        <ion-item>
          <ion-label color="medium">담당지도사</ion-label>
          <ion-label slot="end" color="dark">{{state.order.extra__expertName}}</ion-label>
          <ion-buttons>
            <ion-button color="" :router-link="'/expert/profile?id=' + state.order.expertId">  
              <span class="">프로필</span>
            </ion-button>          
          </ion-buttons>
        </ion-item>

        <ion-item v-if="globalState.loginedClient.id == state.order.clientId">
          <ion-label slot="" color="medium">연락처</ion-label>
          <ion-label slot="end" color="">
            <ion-button color="" slot="end">
              <font-awesome-icon class="mr-2" icon="phone-alt"/>
              {{state.order.extra__expertCellphoneNo}}
            </ion-button>
          </ion-label>
        </ion-item>

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

        <div class="btns mt-2 px-2 w-full">
          <ion-button v-if="globalState.memberType == 'client' && state.order.stepLevel > 3" :class="returnColorByLevel(state.order.stepLevel)" @click="changeStepLevel(state.order.id, state.order.stepLevel)" expand="block">
            {{returnToString(state.order.stepLevel)}}
          </ion-button>
        </div>
        <div class="btns mt-2 w-full flex justify-end">
          <ion-button v-if="globalState.memberType == 'expert'" :class="returnColorByLevel(state.order.stepLevel+1)" @click="changeStepLevel(state.order.id, state.order.stepLevel)" expand="block">
            {{returnToString(state.order.stepLevel+1)}}
          </ion-button>
        </div>

    </ion-list>
    <ion-custom-body v-else class="justify-center" >
      <div class="py-2 px-4">
        로그인 후 이용가능합니다.
        <ion-custom-link to="/member/main">Log-In</ion-custom-link>하러가기
      </div>
    </ion-custom-body>
  </ion-base-layout>
</template>

<style>
.btn-cancel2{
  --background:var(--ion-color-danger-shade)
}
.step-first{
  --background:var(--ion-color-medium-tint);
}
.step-second{
  --background:var(--ion-color-medium-shade);
}
.step-third{
  --background:var(--ion-color-secondary-shade);
}
.step-fourth{
  --background:var(--ion-color-primary-tint);
}
.step-fifth{
  --background:var(--ion-color-primary-shade);
}
</style>

<script lang="ts">
import { IonCustomBody, IonCustomLink } from '@/components/';
import { 
  IonList,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonText,
  IonButtons,
  IonButton, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, onMounted, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as util from '@/utils';
import { Order } from '@/types';

export default defineComponent ({
  name: 'MyOrder',

  components: { 
    IonCustomBody,
    IonCustomLink, 
    IonList,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonText,
    IonButtons,  
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
        stepLevelToStr = 'step-first';
      }
      if(stepLevel == 2){
        stepLevelToStr = 'step-second';
      }
      if(stepLevel == 3){
        stepLevelToStr = 'step-third';
      }
      if(stepLevel == 4){
        stepLevelToStr = 'step-fourth';
      }
      if(stepLevel == 5){
        stepLevelToStr = 'step-fifth';
      }
      
      return stepLevelToStr;
    }

    function returnToString(stepLevel: any) {
      let stepLevelToStr = ''; 
      if(stepLevel == 1){
        stepLevelToStr = '의뢰요청중';
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
})
</script> 