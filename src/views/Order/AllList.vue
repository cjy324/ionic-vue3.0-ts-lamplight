<template >
  <ion-base-layout pageTitle="의뢰 요청 현황" >

    <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <ion-custom-body v-if="state.orders.length !== 0" class="mb-8">
      <ion-list v-if="globalState.isLogined">
        <ion-item>
          <ion-label>키워드 타입</ion-label>
          <ion-select v-model="searchState.searchKeywordType">
            <ion-select-option value="funeralHome">장례식장</ion-select-option>
            <ion-select-option value="startDate">시작일</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item lines="none">
          <ion-searchbar class="ion-searchbar" show-cancel-button="focus" animated inputmode="search" enterkeyhint="enter" placeholder="검색어를 입력해주세요." :value="searchState.searchKeyword" @keyup.enter="onInput($event)"></ion-searchbar>
        </ion-item>

        <div class="w-full border-t-4 border-b-2 pl-3 py-2 text-gray-600">
          Total: {{returnFilteredOrders.length}}
        </div>

        <template v-bind:key="order.id" v-for="order in returnFilteredOrders.slice(0, state.limtNum)">
          
        <div class="orderAllList border-t border-b">
          <div class="orderAllList_head">
            <div class="w-full flex justify-between">
                <span class="ml-3 pt-3 text-gray-800 text-xs">No. {{order.id}}</span>

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
              <div class="flex-col w-full">
                <div class="ml-2 font-bold text-gray-900 border-b-2">
                  <span class="text-sm text-gray-400 ml-2">고인</span>
                  <span class="ml-2">{{order.deceasedName}}</span>
                </div>
                <div class="flex flex-col ml-3 text-xs pt-2">
                  <span class="">
                    의뢰인: {{order.extra__clientName}}님
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
              <!--접수--> 
              <div class="w-32">
                <div class="flex justify-center items-center w-full text-center">
                  <ion-button class="step-second" expand="block" slot="end" @click="accept(order.id, globalState.loginedExpert.id)">
                    의뢰접수
                  </ion-button>
                </div>
              </div>
            </ion-item>
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
          <ion-custom-link to="/member/main">로그인</ion-custom-link>하러가기
        </div>
      </div>
    </ion-custom-body>
    <ion-custom-body v-else class="justify-center">
      <div class="py-2 px-4 w-full text-center">
        현재 요청중인 의뢰가 없습니다.
      </div>
    </ion-custom-body>
  </ion-base-layout>
</template>

<style>
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
  IonRefresher, 
  IonRefresherContent,
  //IonChip,
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, computed, onMounted, defineComponent } from 'vue';
//import { useRouter } from 'vue-router';
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
    IonRefresher, 
    IonRefresherContent,
    //IonChip,
  },
  
  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();
    const searchState = useSearchState();
    //const router = useRouter();

    const state = reactive({
      orders: [] as Order[],
      limtNum: 10,
    });

    function onInput(event: any){
      searchState.searchKeyword = event.target.value;
      return searchState.searchKeyword;
    }

    const returnFilteredOrders = computed(() => {

      let filteredOrders = state.orders;
      
        if(searchState.searchKeywordType == "funeralHome"){
          filteredOrders = state.orders.filter((order: Order) => order.funeralHome.includes(searchState.searchKeyword))
        }
        if(searchState.searchKeywordType == "startDate"){
          filteredOrders = state.orders.filter((order: Order) => order.startDate.includes(searchState.searchKeyword))
        }

      return filteredOrders
    })

    async function loadOrders(loginedMemberId: number){
      const axRes = await mainService.order_requestListInExpertRegion(loginedMemberId)
      state.orders = axRes.data.body.orders;
    }

    //접수(지도사)
    async function doAccept(id: number, expertId: number){
      const axRes = await mainService.order_accept(id, expertId)

      util.showAlert(axRes.data.msg);                    
      if ( axRes.data.fail ) {
        return;
      }
      window.location.replace('/order/list');        
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

    let loginedMemberId = 0;

    if(globalState.loginedExpert.id != 0){
        loginedMemberId = globalState.loginedExpert.id
    }

    onMounted(() => {
      loadOrders(loginedMemberId);
    });

    //더보기
    function showMoreList(){
      state.limtNum = state.limtNum + 10;
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
      accept,
      showMoreList,
      doRefresh,
    }
  }
})

</script> 