<template>
  <ion-base-layout pageTitle="의뢰 정보">
    <ion-list v-if="globalState.isLogined">

        <div class="w-full flex justify-start p-2 bg-gray-800">
          <ion-buttons>
            <ion-button color="" @click="historyBack">
              <font-awesome-icon class="text-white text-lg" icon="arrow-left"/>
            </ion-button>
          </ion-buttons>
          <!-- 의뢰 요청일 경우 -->
          <ion-chip v-if="state.order.stepLevel == 1" class="bg-blue-600">
            <font-awesome-icon class="text-xl text-white" icon="caret-right"/>
            <font-awesome-icon class="text-xl mr-1 text-white" icon="caret-right"/>
            <ion-label class="text-white">
              {{returnToString(state.order.stepLevel)}}
            </ion-label>
          </ion-chip>
          <!-- 2,3,4 단계일 경우 -->
          <ion-chip v-if="state.order.stepLevel > 1 && state.order.stepLevel < 5" class="bg-gray-200">
            <font-awesome-icon class="text-xl text-gray-700" icon="caret-right"/>
            <font-awesome-icon class="text-xl mr-1 text-gray-700" icon="caret-right"/>
            <ion-label class="text-gray-700">
              {{returnToString(state.order.stepLevel)}}
            </ion-label>
          </ion-chip>
          <!-- 종료된 장례일 경우 -->
          <ion-chip v-if="state.order.stepLevel == 5" class="bg-black">
            <ion-label class="text-white">
              {{returnToString(state.order.stepLevel)}}
            </ion-label>
          </ion-chip>
        </div>

        <div class="flex justify-end mr-2 pb-1">
          <ion-buttons>
            <ion-button v-if="globalState.memberType == 'client' && state.order.stepLevel < 4" :router-link="'/order/modify?id=' + state.order.id" color="dark">
              <font-awesome-icon class="text-sm mr-1" icon="edit" />
              <span class="text-gray-600 text-xs">수정</span>
            </ion-button>
            <ion-button v-if="globalState.loginedClient.id == state.order.clientId && globalState.memberType == 'client' && state.order.stepLevel < 3" @click="deleteOrder(state.order.id)" color="dark">
              <font-awesome-icon class="text-sm mr-1 text-red-800" icon="ban" />
              <span class="text-red-800 text-xs">의뢰취소</span>
            </ion-button>
          </ion-buttons>
        </div>

        <ion-item color="medium">
          <ion-label color="">고인 이름</ion-label>
          <ion-label slot="end" color="">{{state.order.deceasedName}}</ion-label>
        </ion-item>
              
        <ion-item>
          <ion-label color="medium">상주 이름</ion-label>
          <ion-label slot="end" color="dark">{{state.order.bereavedName}}</ion-label>
        </ion-item>

        <ion-item>
          <ion-label color="medium">의뢰인</ion-label>
          <ion-label slot="end" color="dark">{{state.order.extra__clientName}}</ion-label>
        </ion-item>

        <ion-item v-if="state.order.expertId > 0 && globalState.loginedExpert.id == state.order.expertId">
          <ion-label slot="" color="medium">연락처</ion-label>
          <ion-label slot="end" color="">
            <ion-button color="secondary" slot="end" @click="callNumber(state.order.extra__clientCellphoneNo)">
              <font-awesome-icon class="mr-2" icon="phone-alt"/>
              {{state.order.extra__clientCellphoneNo}}
            </ion-button>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label color="medium">담당지도사</ion-label>
          <ion-label slot="end" color="dark">{{state.order.extra__expertName}}</ion-label>
          <ion-buttons v-if="globalState.memberType == 'client'">
            <ion-button color="secondary" :router-link="'/expert/profile?id=' + state.order.expertId">  
              <span class="">프로필</span>
            </ion-button>          
          </ion-buttons>
        </ion-item>

        <ion-item v-if="state.order.expertId > 0 && globalState.loginedClient.id == state.order.clientId">
          <ion-label slot="" color="medium">연락처</ion-label>
          <ion-label slot="end" color="">
            <ion-button color="secondary" slot="end" @click="callNumber(state.order.extra__expertCellphoneNo)">
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

        <ion-item lines="none">
          <ion-label color="medium">추가 요청 사항</ion-label>
        </ion-item>
        <ion-item-divider>
          <ion-text slot="start" color="dark">{{state.order.body}}</ion-text>
        </ion-item-divider>


        <div v-if="globalState.memberType == 'client' && state.order.stepLevel > 3" class="btns mt-2 px-2 w-full">
          <ion-button color="primary" @click="changeStepLevel(state.order.id, state.order.stepLevel)" expand="block">
            {{returnToString(state.order.stepLevel)}}
          </ion-button>
        </div>
        <div v-if="globalState.memberType == 'expert'" class="btns mt-2 px-2 w-full">
          <ion-button v-if="state.order.stepLevel > 1 && state.order.stepLevel < 4" color="primary" @click="changeStepLevel(state.order.id, state.order.stepLevel)" expand="block">
            다음 단계 진행 
            (
            <font-awesome-icon class="text-xl ml-1 text-white" icon="caret-right"/>
            <font-awesome-icon class="text-xl mr-1 text-white" icon="caret-right"/>
            {{returnToString(state.order.stepLevel+1)}}
            )
          </ion-button>
          <!-- 수락 -->
          <ion-button color="secondary" v-if="state.order.stepLevel == 1" class="mt-2" @click="accept(state.order.id, globalState.loginedExpert.id)" expand="block">
            의뢰 접수
          </ion-button>
          <!-- 거절 -->
          <ion-button color="light" v-if="state.order.stepLevel == 1 && state.order.expertId == globalState.loginedExpert.id" class="mt-2" @click="reject(state.order.id, globalState.loginedExpert.id)" expand="block">
            의뢰 거절
          </ion-button>
          <!-- 포기 -->
          <ion-button color="light" v-if="state.order.stepLevel == 2 && state.order.expertId == globalState.loginedExpert.id" class="mt-2" @click="reject(state.order.id, globalState.loginedExpert.id)" expand="block">
            의뢰 포기
          </ion-button>
        </div>

    </ion-list>
    <ion-custom-body v-else class="justify-center" >
      <div class="py-2 px-4">
        로그인 후 이용가능합니다.
        <ion-custom-link to="/member/main">로그인</ion-custom-link>하러가기
      </div>
    </ion-custom-body>
  </ion-base-layout>
</template>

<style>
.btn-cancel2{
  --background:var(--ion-color-danger-shade)
}
.step-first{
  --background:var(--ion-color-primary-tint);
}
.step-second{
  --background:var(--ion-color-primary-shade);
}
.step-third{
  --background:var(--ion-color-secondary-shade);
}
.step-fourth{
  --background:var(--ion-color-dark-tint);
}
.step-fifth{
  --background:var(--ion-color-medium-shade);
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
  IonChip, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, onMounted, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as util from '@/utils';
import { Order } from '@/types';
import { CallNumber } from "@ionic-native/call-number";

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
    IonChip, 
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
        stepLevelToStr = '준비중';
      }
      if(stepLevel == 3){
        stepLevelToStr = '장례 진행중';
      }
      if(stepLevel == 4){
        stepLevelToStr = '장례 종료(확인요청)';
      }
      if(stepLevel == 5){
        stepLevelToStr = '장례 종료';
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

    //의뢰 취소(의뢰인)
    async function doDeleteOrder(id: number) {
      const axRes = await mainService.order_delete(id)
      
      util.showAlert(axRes.data.msg)
      if(axRes.data.fail){
        return
      }
      window.location.replace('/order/list');
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

    function doCallNumber(cellphoneNo: string){
      CallNumber.callNumber(cellphoneNo,true)
        .then((res) => console.log("전화 연결", res))
        .catch((err) => console.log("전화 연결 실패", err));
    }

    async function callNumber(cellphoneNo: string){
      const msg = '전화 연결하시겠습니까?'

      util.showAlertConfirm(msg).then(confirm => {
        if (confirm == false) {
          return
        } else {
          doCallNumber(cellphoneNo)
        }
      })
    }



    //수락(지도사)
    async function doAccept(id: number, expertId: number){
      const axRes = await mainService.order_accept(id, expertId)

      util.showAlert(axRes.data.msg);                    
      if ( axRes.data.fail ) {
        return;
      }
      window.location.reload();
    }

    async function accept(id: number, expertId: number){
      const msg = '해당 의뢰를 수락하시겠습니까?'

      util.showAlertConfirm(msg).then(confirm => {
        if (confirm == false) {
          return
        } else {
          doAccept(id, expertId)
        }
      })
    }

    //거절/포기(지도사)
    async function doReject(id: number, expertId: number) {
      const axRes = await mainService.order_reject(id, expertId)
      
      util.showAlert(axRes.data.msg)
      if(axRes.data.fail){
        return
      }      
      window.location.replace('/order/list');
    }

    async function reject(id: number, expertId: number){
      const msg = '해당 의뢰를 포기하시겠습니까?'

      util.showAlertConfirm(msg).then(confirm => {
        if (confirm == false) {
          return
        } else {
          doReject(id, expertId)
        }
      })
    }

    function historyBack(){
      router.go(-1)
    }

    return {
      globalState,
      state,
      historyBack,
      returnColorByLevel,
      returnToString,
      changeStepLevel,
      deleteOrder,
      callNumber,
      accept,
      reject,
    }
  }
})
</script> 