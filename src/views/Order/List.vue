<template>
  <ion-base-layout pageTitle="내 의뢰 관리">

    <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <ion-custom-body v-if="state.orders.length !== 0" class="mb-8">
      <ion-list v-if="globalState.isLogined">
        <ion-item >
          <ion-label>진행단계</ion-label>
          <ion-select v-model="searchState.selectStepLevel">
            <ion-select-option value="0">전체</ion-select-option>
            <ion-select-option value="1">의뢰요청중</ion-select-option>
            <ion-select-option value="2">준비중</ion-select-option>
            <ion-select-option value="3">장례 진행중</ion-select-option>
            <ion-select-option value="4">장례 종료(확인요청)</ion-select-option>
            <ion-select-option value="5">장례 종료</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>키워드 타입</ion-label>
          <ion-select v-model="searchState.searchKeywordType">
            <ion-select-option value="deceasedName">고인 이름</ion-select-option>
            <ion-select-option value="bereavedName">상주 이름</ion-select-option>
            <ion-select-option value="extra__clientName">의뢰인 이름</ion-select-option>
            <ion-select-option value="region">지역</ion-select-option>
            <ion-select-option value="funeralHome">장례식장</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item lines="none">
          <ion-searchbar class="ion-searchbar" show-cancel-button="focus" animated inputmode="search" enterkeyhint="enter" placeholder="검색어를 입력해주세요." :value="searchState.searchKeyword" @keyup.enter="onInput($event)"></ion-searchbar>
        </ion-item>

        <div class="w-full border-t-4 border-b-2 pl-3 py-2 text-gray-600">
          Total: {{returnFilteredOrders.length}}
        </div>
      
        <template v-bind:key="order.id" v-for="order in returnFilteredOrders.slice(0, state.limtNum)">
        <div class="orderList">
          <!--진행단계-->
          <div class="orderList_head flex justify-between items-center h-12 border-b-2 border-t-4 bg-gray-800 mb-2 rounded-t-xl">
            <ion-buttons>
              <ion-button :router-link="'/order/detail?id=' + order.id" slot="" color="dark">
                <font-awesome-icon class="text-white text-xs ml-4 mr-1" icon="clipboard"/>
                <span class="text-white text-xs">상세보기</span>
              </ion-button>
              <ion-button v-if="order.stepLevel > 3 && globalState.memberType == 'client'" :router-link="'/review/add?relTypeCode=expert&relId=' + order.expertId" color="dark" slot="end">
                <font-awesome-icon class="text-white text-xs mr-1" icon="comment-dots"/>
                <span class="text-white text-xs">후기작성</span>
              </ion-button>
            </ion-buttons>
            <div class="">
              <!-- 의뢰 요청일 경우 -->
              <ion-chip v-if="order.stepLevel == 1" class="bg-blue-600" :router-link="'/order/detail?id=' + order.id">
                <font-awesome-icon class="text-xl text-white" icon="caret-right"/>
                <font-awesome-icon class="text-xl mr-1 text-white" icon="caret-right"/>
                <ion-label class="text-white">
                  {{returnToString(order.stepLevel)}}
                </ion-label>
              </ion-chip>
              <!-- 2,3,4 단계일 경우 -->
              <ion-chip v-if="order.stepLevel > 1 && order.stepLevel < 5" class="bg-gray-200" :router-link="'/order/detail?id=' + order.id">
                <font-awesome-icon class="text-xl text-gray-700" icon="caret-right"/>
                <font-awesome-icon class="text-xl mr-1 text-gray-700" icon="caret-right"/>
                <ion-label class="text-gray-700">
                  {{returnToString(order.stepLevel)}}
                </ion-label>
              </ion-chip>
              <!-- 종료된 장례일 경우 -->
              <ion-chip v-if="order.stepLevel == 5" class="bg-black" :router-link="'/order/detail?id=' + order.id">
                <ion-label class="text-white">
                  {{returnToString(order.stepLevel)}}
                </ion-label>
              </ion-chip>
            </div>
          </div>
          <!--정보-->
          <div class="orderList_body mb-2 border-b">
            <ion-item color="" lines="none">
              <ion-chip color="dark" class="mr-3">
                <ion-label color="">
                  고인
                </ion-label>
              </ion-chip>
              <ion-label color=""> 
                <span class="text-gray-900">{{order.deceasedName}}</span>
              </ion-label>
            </ion-item>
            <ion-item v-if="globalState.memberType == 'expert'" color="" lines="none">
              <ion-chip color="dark" class="mr-3">
                <ion-label color="">
                  의뢰인
                </ion-label>
              </ion-chip>
              <ion-label color="">
                <span class="text-gray-900">{{order.extra__clientName}}</span>
              </ion-label>
              <ion-button color="" slot="end" @click="callNumber(order.extra__clientCellphoneNo)">
                <font-awesome-icon class="mr-2" icon="phone-alt"/>
                  {{order.extra__clientCellphoneNo}}
              </ion-button>
            </ion-item>
            <ion-item v-if="order.expertId > 0 && globalState.memberType == 'client'" color="" lines="none">
              <ion-chip color="dark" class="mr-3">
                <ion-label color="">
                  지도사
                </ion-label>
              </ion-chip>
              <ion-buttons>
                <span class="text-gray-900">{{order.extra__expertName}}</span>
                <ion-button color="primary" :router-link="'/expert/profile?id=' + order.expertId">  
                  <font-awesome-icon class="text-gray-800 text-sm" icon="user-check"/>
                </ion-button>          
              </ion-buttons>
              <ion-button color="primary" slot="end" @click="callNumber(order.extra__expertCellphoneNo)">
                <font-awesome-icon class="mr-1" icon="phone-alt"/>
                {{order.extra__expertCellphoneNo}}
              </ion-button>
            </ion-item>
            <ion-item color="" lines="none">
              <ion-chip color="dark" class="mr-3">
                <ion-label color="">
                  지역
                </ion-label>
              </ion-chip>
              <ion-label slot="" color="">
                <span class="text-gray-900">{{order.region}}</span>
              </ion-label>
            </ion-item>
            <ion-item color="" lines="none">
              <ion-chip color="dark" class="mr-3">
                <ion-label color="">
                  장례 시작일/종료일
                </ion-label>
              </ion-chip>
              <ion-label slot="" color="">
                <span class="text-gray-900">{{order.startDate}}/{{order.endDate}}</span>
              </ion-label>
            </ion-item>
          </div>
          <!--단계 버튼(의뢰인)-->
          <div class="w-full px-10 pb-4 mb-2 mt-4 border-gray-800 border-b-8 rounded-b-xl" v-if="globalState.loginedClient.id == order.clientId && order.stepLevel == 4">
            <ion-button v-if="globalState.memberType == 'client'" :class="returnColorByLevel(order.stepLevel)" slot="end" expand="block" @click="changeStepLevel(order.id, order.stepLevel)">
              장례 종료 확인
            </ion-button>
          </div>
          <!--단계 버튼(지도사)-->
          <div class="w-full px-10 pb-4 mb-2 mt-4 border-gray-800 border-b-8 rounded-b-xl" v-if="globalState.loginedExpert.id == order.expertId">
            <ion-button v-if="globalState.memberType == 'expert' && order.stepLevel == 1" class="step-second" expand="block" slot="end" @click="accept(order.id, globalState.loginedExpert.id)">
              의뢰접수
            </ion-button>
            <!-- 거절 -->
            <ion-button v-if="globalState.memberType == 'expert' && order.stepLevel == 1" class="btn-cancel2 mt-2" @click="reject(order.id, globalState.loginedExpert.id)" expand="block">
              의뢰 거절
            </ion-button>
            <ion-button v-if="globalState.memberType == 'expert' && order.stepLevel < 4 && order.stepLevel > 1" :class="returnColorByLevel(order.stepLevel+1)" expand="block" slot="end" @click="changeStepLevel(order.id, order.stepLevel)">
              다음단계 진행
              (
              <font-awesome-icon class="text-xl ml-1 text-white" icon="caret-right"/>
              <font-awesome-icon class="text-xl mr-1 text-white" icon="caret-right"/>
              {{returnToString(order.stepLevel+1)}}
              )
            </ion-button>
          </div>
        </div>
        </template>
        <ion-button v-if="returnFilteredOrders.length > state.limtNum" @click="showMoreList" size="small" color="medium" expand="block">
          더보기
        </ion-button>
      </ion-list>
      
      <div v-else class="ifEmptyOeders my-auto mx-auto">
        <div class="py-2 px-4">
          로그인 후 이용가능합니다.
          <ion-custom-link to="/member/main">Log-In</ion-custom-link>하러가기
        </div>
      </div>
    </ion-custom-body>
    
    <ion-custom-body v-else class="justify-center">
      <div class="py-2 px-4 w-full text-center">
        현재 진행중인 의뢰가 없습니다.
      </div>
      <!-- 의뢰인 -->
      <div v-if="globalState.memberType == 'client'" class="px-4">
        <ion-button class="btn-primary" color="" type="button" expand="block" router-link="/order/add">
          <font-awesome-icon class="mr-2" icon="edit"></font-awesome-icon>
          새 의뢰 요청
        </ion-button>
      </div>
      <!-- 지도사 -->
      <div v-if="globalState.memberType == 'expert'" class="px-4">
        <ion-button class="btn-primary" color="" type="button" expand="block" router-link="/order/allList">
          <ion-icon class="mr-1" :icon="searchCircleOutline" /> 
          의뢰 요청 현황
        </ion-button>
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
  IonChip,
  IonIcon,
  IonRefresher, 
  IonRefresherContent,
} from '@ionic/vue';
import {
  searchCircleOutline
} from 'ionicons/icons'
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, computed, onMounted, defineComponent } from 'vue';
import * as util from '@/utils';
import { Order } from '@/types';
import { CallNumber } from "@ionic-native/call-number";

const useSearchState = () => {
  return reactive({
    searchKeyword: '',
    searchKeywordType: 'deceasedName',
    selectStepLevel: '0',
  })
}

export default defineComponent ({
  name: 'OrderList',
  
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
    IonChip,
    IonIcon,
    IonRefresher, 
    IonRefresherContent,
  },
  
  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();
    const searchState = useSearchState();

    const state = reactive({
      orders: [] as Order[],
      limtNum: 5,
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

    function onInput(event: any){
      searchState.searchKeyword = event.target.value;
      return searchState.searchKeyword;
    }


    const returnFilteredOrders = computed(() => {

      let filteredOrders = state.orders;
      
      if(searchState.selectStepLevel == '0'){
        if(searchState.searchKeywordType == "deceasedName"){
          filteredOrders = state.orders.filter((order: Order) => order.deceasedName.includes(searchState.searchKeyword))
        }
        if(searchState.searchKeywordType == "bereavedName"){
          filteredOrders = state.orders.filter((order: Order) => order.bereavedName.includes(searchState.searchKeyword))
        }
        if(searchState.searchKeywordType == "extra__clientName"){
          filteredOrders = state.orders.filter((order: Order) => order.extra__clientName.includes(searchState.searchKeyword))
        }
        if(searchState.searchKeywordType == "region"){
          filteredOrders = state.orders.filter((order: Order) => order.region.includes(searchState.searchKeyword))
        }
        if(searchState.searchKeywordType == "funeralHome"){
          filteredOrders = state.orders.filter((order: Order) => order.funeralHome.includes(searchState.searchKeyword))
        }
      }
      else{
        if(searchState.searchKeywordType == "deceasedName"){
          filteredOrders = state.orders.filter((order: Order) => order.deceasedName.includes(searchState.searchKeyword) && order.stepLevel === parseInt(searchState.selectStepLevel))
        }
        if(searchState.searchKeywordType == "bereavedName"){
          filteredOrders = state.orders.filter((order: Order) => order.bereavedName.includes(searchState.searchKeyword) && order.stepLevel === parseInt(searchState.selectStepLevel))
        }
        if(searchState.searchKeywordType == "extra__clientName"){
          filteredOrders = state.orders.filter((order: Order) => order.extra__clientName.includes(searchState.searchKeyword) && order.stepLevel === parseInt(searchState.selectStepLevel))
        }
        if(searchState.searchKeywordType == "region"){
          filteredOrders = state.orders.filter((order: Order) => order.region.includes(searchState.searchKeyword) && order.stepLevel === parseInt(searchState.selectStepLevel))
        }
        if(searchState.searchKeywordType == "funeralHome"){
          filteredOrders = state.orders.filter((order: Order) => order.funeralHome.includes(searchState.searchKeyword) && order.stepLevel === parseInt(searchState.selectStepLevel))
        }
      }
      return filteredOrders
    })

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
      
      const msg = '다음 단계를 진행하시겠습니까?'

      util.showAlertConfirm(msg).then(confirm => {
        if (confirm == false) {
          return
        } else{
          doChangeStepLevel(id, stepLevel)
        }
      })
      
    }

    //접수(지도사)
    async function doAccept(id: number, expertId: number){
      const axRes = await mainService.order_accept(id, expertId)

      util.showAlert(axRes.data.msg);                    
      if ( axRes.data.fail ) {
        return;
      }
      window.location.replace('/order/detail?id=' + id);        
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
      const msg = '해당 의뢰를 거절하시겠습니까?'

      util.showAlertConfirm(msg).then(confirm => {
        if (confirm == false) {
          return
        } else {
          doReject(id, expertId)
        }
      })
    }

    let loginedMemberId = 0;
    let loginedMemberType = '';

    if(globalState.loginedClient.id != 0){
        loginedMemberId = globalState.loginedClient.id
        loginedMemberType = globalState.memberType
    }

    if(globalState.loginedExpert.id != 0){
        loginedMemberId = globalState.loginedExpert.id
        loginedMemberType = globalState.memberType
    }

    // onMounted 바로 실행하는 것이 아닌 모든 것이 준비되었을때 실행됨
    onMounted(() => {
      //util.showAlert("3");
      loadOrders(loginedMemberId, loginedMemberType);
     // loadReviews(relTypeCode);
    });


    //Native 전화연결
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


    //더보기
    function showMoreList(){
      state.limtNum = state.limtNum + 5;
    }

    //리프레시
    const doRefresh = (event: any) => {
      console.log('Begin Refresh');

      setTimeout(() => {
        console.log('Refresh has ended');
        event.target.complete();
      }, 2000);
    }


    return {
      globalState,
      mainService,
      state,
      searchState,
      returnFilteredOrders,
      onInput,
      returnColorByLevel,
      returnToString,
      changeStepLevel,
      callNumber,
      searchCircleOutline,
      accept,
      reject,
      showMoreList,
      doRefresh,
    }
  }
})

</script> 