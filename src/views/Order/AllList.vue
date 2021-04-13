<template>
  <ion-base-layout pageTitle="의뢰 요청 현황">
  <ion-custom-body v-if="globalState.isLogined" class="justify-center">
    <ion-list v-if="state.orders.length !== 0">
      <ion-item>
        <ion-label>키워드 타입</ion-label>
        <ion-select v-model="searchState.searchKeywordType">
          <ion-select-option value="funeralHome">장례식장</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item lines="none">
        <ion-searchbar class="ion-searchbar" show-cancel-button="focus" animated inputmode="search" enterkeyhint="enter" placeholder="검색어를 입력해주세요." :value="searchState.searchKeyword" @keyup.enter="onInput($event)"></ion-searchbar>
      </ion-item>

      <div class="w-full border-t-4 border-b-2 pl-3 py-2 text-gray-600">
        Total: {{returnFilteredOrders.length}}
      </div>
      
      <template v-bind:key="order.id" v-for="order in returnFilteredOrders">
      <div class="orderAllList border-t border-b">
      <!--진행단계-->
        <div class="orderAllList_head">
          <div class="w-full flex justify-end">
            <ion-buttons>
              <ion-button color="dark" slot="start" :router-link="'/order/detail?id=' + order.id">
                <font-awesome-icon class="text-gray-800 mr-1 text-xs" icon="clipboard"/>
                <span class="text-gray-600 text-xs">상세보기</span>
              </ion-button>
            </ion-buttons>
          </div>
        </div>

        <div class="orderAllList_body mb-3">
          <ion-item lines="none">
        <div class="flex-col w-full mb-1">
          <div class="ml-2 font-bold text-gray-900 border-b-2">
            <span class="text-sm text-gray-400 ml-2">고인</span>
            <span class="ml-2">{{order.deceasedName}}님</span>
          </div>
          <div class="flex flex-col ml-3 text-xs pt-2">
            <span class="">
              의뢰인: {{order.extra__clientName}}
            </span>
            <span>
              장례식장: {{order.funeralHome}}
            </span>
            <span class="">
              시작일: {{order.startDate}}
            </span>
            <span class="">
              종료일: {{order.endDate}}
            </span>
          </div>
        </div>
        <!--수락--> 
        <div class="w-32">
          <div class="flex justify-center items-center w-full text-center">
            <ion-button :color="returnColorByLevel(order.stepLevel+1)" expand="block" slot="end" @click="changeStepLevel(order.id, order.stepLevel)">
              {{returnToString(order.stepLevel+1)}}
            </ion-button>
          </div>
        </div>
      </ion-item>
    </div>
      </div>
    </template>
    </ion-list>
    <div v-else class="ifEmptyOeders">
      <div class="py-2 px-4 w-full text-center">
        현재 요청중인 의뢰가 없습니다.
      </div>
    </div>
    </ion-custom-body>
  <ion-custom-body v-else class="justify-center">
    <div class="py-2 px-4">
      로그인 후 이용가능합니다.
      <ion-custom-link to="/member/main">Log-In</ion-custom-link>하러가기
    </div>
  </ion-custom-body>
</ion-base-layout>
</template>

<style>
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

.ion-searchbar{
  --border-radius:10px 10px 10px 10px;
}
.itemTitle{
  --padding-end:10px;
  --border-radius:0px 5px 20px 0px;
}

</style>

<script lang="ts">
import { IonCustomBody, IonCustomLink } from '@/components/';
import { 
  IonSelect, 
  IonSelectOption, 
  IonSearchbar, 
  IonLabel, 
  IonList, 
  IonItem, 
  IonButton,
  IonButtons,
  //IonChip,
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, computed, onMounted, defineComponent } from 'vue';
import * as util from '@/utils';
import { Order } from '@/types';

const useSearchState = () => {
  return reactive({
    searchKeyword: '',
    searchKeywordType: 'funeralHome',
  })
}

export default defineComponent ({
  name: 'OrderAllList',
  
  components: {
    IonSelect, 
    IonSelectOption,
    IonSearchbar, 
    IonCustomBody,
    IonCustomLink,
    IonLabel, 
    IonList, 
    IonItem, 
    IonButton,
    IonButtons,
    //IonChip,
  },
  
  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();
    const searchState = useSearchState();

    const state = reactive({
      orders: [] as Order[],
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
        stepLevelToStr = '장례종료(확인요청)';
      }
      if(stepLevel == 5){
        stepLevelToStr = '종료확인(최종종료)';
      }
      
      return stepLevelToStr;
    }

    function onInput(event: any){
      searchState.searchKeyword = event.target.value;
      return searchState.searchKeyword;
    }


    const returnFilteredOrders = computed(() => {

      let filteredOrders = state.orders;
      
        if(searchState.searchKeywordType == "funeralHome"){
          filteredOrders = state.orders.filter((order: Order) => order.funeralHome.includes(searchState.searchKeyword))
        }

      return filteredOrders
    })

    //백엔드랑 맞춰봐야함
    async function loadOrders(memberId: number, memberType: string){
      const axRes = await mainService.order_list(memberId, memberType)
      state.orders = axRes.data.body.orders;
    }


    async function doChangeStepLevel(id: number, stepLevel: number){
      const axRes = await mainService.order_changeStepLevel(id, stepLevel)
          util.showAlert(axRes.data.msg)

          if ( axRes.data.fail ) {
            return;
          }
          window.location.reload();
    }

    function changeStepLevel(id: number, stepLevel: number){
      
      const msg = '해당 의뢰를 수락하시겠습니까?'

      util.showAlertConfirm(msg).then(confirm => {
        if (confirm == false) {
          return
        } else{
          doChangeStepLevel(id, stepLevel)
        }
      })
      
    }

    let loginedMemberId = 0;
    let loginedMemberType = '';

    if(globalState.loginedClient.id != null){
        loginedMemberId = globalState.loginedClient.id
        loginedMemberType = globalState.memberType
    }

    // onMounted 바로 실행하는 것이 아닌 모든 것이 준비되었을때 실행됨
    onMounted(() => {
      //util.showAlert("3");
      loadOrders(loginedMemberId, loginedMemberType);
     // loadReviews(relTypeCode);
    });


    return {
      globalState,
      mainService,
      state,
      searchState,
      returnFilteredOrders,
      //doDeleteReview,
      onInput,
      returnColorByLevel,
      returnToString,
      changeStepLevel,

    }
  }
})

</script> 