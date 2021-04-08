<template>
<ion-custom-header>My의뢰 - 리스트</ion-custom-header>
<ion-content >
  <ion-list class="mb-12">
    <ion-item>
    <ion-select v-model="searchState.selectStepLevel">
      <ion-select-option value="0">진행단계 전체</ion-select-option>
      <ion-select-option value="1">요청서 검토중</ion-select-option>
      <ion-select-option value="2">장례준비중</ion-select-option>
      <ion-select-option value="3">장례진행중</ion-select-option>
      <ion-select-option value="4">장례종료(확인대기중)</ion-select-option>
      <ion-select-option value="5">장례종료(최종종료)</ion-select-option>
    </ion-select>
    </ion-item>
    <ion-item>
    <ion-select v-model="searchState.searchKeywordType">
      <ion-select-option value="deceasedName">고인이름</ion-select-option>
      <ion-select-option value="bereavedName">상주이름</ion-select-option>
      <ion-select-option value="extra__clientName">의뢰인이름</ion-select-option>
      <ion-select-option value="region">지역</ion-select-option>
      <ion-select-option value="body">내용</ion-select-option>
      <ion-select-option value="funeralHome">장례식장</ion-select-option>
    </ion-select>
    </ion-item>
    <ion-item>
      <ion-searchbar show-cancel-button="focus" animated inputmode="search" enterkeyhint="enter" placeholder="검색어를 입력해주세요." :value="searchState.searchKeyword" @keyup.enter="onInput($event)"></ion-searchbar>
    </ion-item>
    <ion-list-header>MyOrderList</ion-list-header>
    <template v-bind:key="order.id" v-for="order in returnFilteredOrders">
    <ion-item>
      <!--진행단계-->
        <div v-if="order.stepLevel==1" class="btn-success">
          진행단계: {{returnToString(order.stepLevel)}}
        </div>
        <div v-if="order.stepLevel==2" class="btn-secondary">
          진행단계: {{returnToString(order.stepLevel)}}
        </div>
        <div v-if="order.stepLevel==3" class="btn-warning">
          진행단계: {{returnToString(order.stepLevel)}}
        </div>
        <div v-if="order.stepLevel==4" class="btn-primary">
          진행단계: {{returnToString(order.stepLevel)}}
        </div>
        <div v-if="order.stepLevel==5" class="btn-primary">
          진행단계: {{returnToString(order.stepLevel)}}
        </div>
      <ion-label>
        <ion-grid>
          <ion-row>
            <ion-col size="12" class="bg-gray-300 border rounded-md">
              고인명: {{order.deceasedName}}
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="4">
              상주명: {{order.bereavedName}}
            </ion-col>
            <ion-col size="10">
              의뢰인: {{order.extra__clientName}}
            </ion-col>
            <ion-col size="10">
              담당지도사: {{order.extra__expertName}}
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="10">
              지역: {{order.region}}
            </ion-col>
            <ion-col size="10">
              장례식장: {{order.funeralHome}}
            </ion-col>
            <ion-col size="10">
              종교: {{order.religion}}
            </ion-col>
            <ion-col size="10">
              장례시작일: {{order.startDate}}
            </ion-col>
            <ion-col size="10">
              장례종료일: {{order.endDate}}
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-label>
      <div class="flex-col">
        <ion-item-divider class="mt-2">
          <ion-button color="" slot="end" :href="'/order/detail?id=' + order.id">
            상세보기
          </ion-button>
        </ion-item-divider>
        <ion-item-divider class="mt-2">
          <ion-button v-if="globalState.loginedClient.id == order.clientId" color="" slot="end" :href="'/order/detail?id=' + order.id">
            연락처: {{order.extra__expertCellphoneNo}}
          </ion-button>
        </ion-item-divider>
        <ion-item-divider class="mt-2">
          <ion-button v-if="globalState.loginedClient.id == order.clientId" color="success" slot="end" :href="'/review/add?relTypeCode=expert&relId=' + order.expertId">
            후기/평점 작성
          </ion-button>
        </ion-item-divider>

        <ion-item-divider class="mt-2" v-if="globalState.loginedClient.id !== order.clientId">
          <ion-button v-if="order.stepLevel==1" color="success" slot="end" @click="changeStepLevel(order.id, order.stepLevel)">
            의뢰수락(장례준비)
          </ion-button>
          <ion-button v-if="order.stepLevel==2" color="success" slot="end" @click="changeStepLevel(order.id, order.stepLevel)">
            장례진행
          </ion-button>
          <ion-button v-if="order.stepLevel==3" color="success" slot="end" @click="changeStepLevel(order.id, order.stepLevel)">
            장례종료(확인요청)
          </ion-button>
        </ion-item-divider>

        <ion-item-divider class="mt-2" v-if="globalState.loginedClient.id == order.clientId">
          <ion-button v-if="order.stepLevel==2" color="success" slot="end">
            장례준비중
          </ion-button>
          <ion-button v-if="order.stepLevel==3" color="success" slot="end">
            장례진행중
          </ion-button>
          <ion-button v-if="order.stepLevel==4" color="success" slot="end" @click="changeStepLevel(order.id, order.stepLevel)">
            장례종료(확인)
          </ion-button>
        </ion-item-divider>
        

      </div>
      </ion-item>
    </template>
  </ion-list>
</ion-content>
</template>

<style>
</style>

<script lang="ts">
import { IonCustomHeader } from '@/components/';
import { 
  IonSelect, 
  IonSelectOption, 
  IonSearchbar, 
  IonLabel, 
  IonListHeader, 
  IonList, 
  IonItem, 
  IonContent,
  IonItemDivider,
  IonCol,
  IonRow,
  IonGrid,
  IonButton,
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, computed, onMounted, watch } from 'vue';
import * as util from '@/utils';
import { Order } from '@/types';

const useSearchState = () => {
  return reactive({
    searchKeyword: '',
    searchKeywordType: 'deceasedName',
    selectStepLevel: '0',
  })
}

export default  {
  name: 'OrderList',
  
  components: { 
    IonSelect, 
    IonSelectOption, 
    IonSearchbar, 
    IonCustomHeader, 
    IonLabel, 
    IonListHeader, 
    IonList, 
    IonItem, 
    IonContent,
    IonItemDivider,
    IonCol,
    IonRow,
    IonGrid,
    IonButton,
  },
  
  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();
    const searchState = useSearchState();

    const state = reactive({
      orders: [] as Order[],
    });

    function returnToString(stepLevel: any) {
      let stepLevelToStr = ''; 
      if(stepLevel == 1){
        stepLevelToStr = '의뢰요청(의뢰검토중)';
      }
      if(stepLevel == 2){
        stepLevelToStr = '의뢰승인(장례준비중)';
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
        if(searchState.searchKeywordType == "body"){
          filteredOrders = state.orders.filter((order: Order) => order.body.includes(searchState.searchKeyword))
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
        if(searchState.searchKeywordType == "body"){
          filteredOrders = state.orders.filter((order: Order) => order.body.includes(searchState.searchKeyword) && order.stepLevel === parseInt(searchState.selectStepLevel))
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

    // function doDeleteReview(id: number) {
    //   if(confirm('정말 삭제하시겠습니까?') == false){
    //     return;
    //   }
    //   mainService.review_doDelete(id)
    //   .then(axiosResponse => {
    //       alert(axiosResponse.data.msg);
    //       if ( axiosResponse.data.fail ) {
    //         return;
    //       }
    //     window.location.reload();
    //   });
    // }

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
        loginedMemberType = 'client'
    }

    // onMounted 바로 실행하는 것이 아닌 모든 것이 준비되었을때 실행됨
    onMounted(() => {
      //alert("3");
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
      returnToString,
      changeStepLevel,
      //onClickInput,
    }
  }
}


</script> 