<template>
<ion-custom-header>지도사 현황</ion-custom-header>
<ion-custom-body class="justify-center">
<ion-content :fullscreen="true">
  <ion-list class="mb-12">
    <ion-item>
      <ion-label>키워드 타입</ion-label>
      <ion-select v-model="searchState.searchKeywordType">
        <ion-select-option value="region">지역</ion-select-option>
        <ion-select-option value="name">이름</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item lines="none">
      <ion-searchbar class="ion-searchbar" show-cancel-button="focus" animated inputmode="search" enterkeyhint="enter" placeholder="검색어를 입력해주세요." :value="searchState.searchKeyword" @keyup.enter="onInput($event)"></ion-searchbar>
    </ion-item>

    <template v-bind:key="expert.id" v-for="expert in returnFilteredExperts">
    <div class="expertList border-t-2 border-b-8">

    <div class="expertList_head">
      <div class="w-full flex justify-end">
        <ion-buttons >
          <ion-button slot="" :href="'/expert/profile?id=' + expert.id">
            <font-awesome-icon class="text-gray-600 mr-1" icon="user-check"/>프로필
          </ion-button>
          <ion-button color="" slot="end" :href="'/order/add?expertId=' + expert.id + '&clientId=' + globalState.loginedClient.id">
            <font-awesome-icon class="text-gray-600 mr-1" icon="edit"/>의뢰
          </ion-button>
        </ion-buttons>
      </div>
    </div>

    <div class="expertList_body">
      <!--정보-->
      <ion-item lines="none">
        <div class="w-36">
          <img class="h-20 rounded-full" :src="mainService.getExpertThumbImgUrl(expert.id)">
        </div>
        <div class="flex-col w-full">
          <span class="ml-5 font-bold text-gray-700 border-b-2">
            {{expert.name}}
          </span>
          <div class="flex ml-2">
            <ion-chip color="primary">
              {{expert.region}}
            </ion-chip>
            <ion-chip color="">
              {{expert.career}}
            </ion-chip>
          </div>
        </div>
        <!--평점--> 
        <div class="w-32">
          <div class="flex justify-center items-center w-full text-center">
            <div class="border rounded-full h-14 w-14 flex justify-center items-center mr-4 mt-2">
              <div class="text-sm text-gray-500">
                <span class="">평점</span>
                {{ expert.extra__ratingPoint.toFixed(1) }}/5
              </div>
            </div>
          </div>
        </div>
      </ion-item>  
      <!--후기-->
      <ion-item lines="none">
      <div class="flex-col w-full">
        <div class="flex justify-between items-end h-8 w-full border-b">
          <span class="text-sm">
            후기
          </span>
          <div class="text-sm cursor-pointer hover:text-blue-500">
            더보기
          </div>
        </div>
        <template v-if="expert.extra__reviews.length !== 0">
        <div class="border-b border-t bg-gray-100 mb-1" v-bind:key="review.id" v-for="review in expert.extra__reviews.slice(0, 3)">
            <p class="text-gray-700 p-2 pb-0 text-sm">
              {{review.body}}
            </p>
            <span class="text-gray-500 p-2 text-xs ">
              {{review.updateDate}} / {{review.extra__clientName}}
            </span>
            <div v-if="globalState.loginedClient.id === review.clientId" class="w-full flex justify-end">
              <ion-buttons >
                <ion-button slot="" :href="'/review/modify?relTypeCode=expert&relId=' + expert.id + '&id=' + review.id">
                  <span class="text-xs">수정</span>
                </ion-button>
                <ion-button color="" slot="end" @click="doDeleteReview(expert.id, review.id, globalState.loginedClient.id)">
                  <span class="text-xs text-red-900">삭제</span>
                </ion-button>
              </ion-buttons>
            </div>
        </div>
        </template>
        <div v-else>
          <p class="text-gray-700 p-2 pb-4 text-sm">
              작성된 후기가 없습니다.
          </p>
        </div>
      </div>

      </ion-item>

    </div>
    </div> 
    </template>
  </ion-list>
</ion-content>
</ion-custom-body>
</template>

<style>
.ion-searchbar{
  --border-radius:10px 10px 10px 10px;
}
</style>

<script lang="ts">
import { IonCustomHeader } from '@/components/';
import { 
  IonSelect, 
  IonSelectOption, 
  IonSearchbar, 
  IonLabel, 
  //IonAvatar, 
 // IonListHeader, 
  IonList, 
  IonItem, 
  IonContent,
 // IonItemDivider,
  IonButton,
  IonButtons,

} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, computed, onMounted  } from 'vue';
import { Expert, Review } from '@/types';
import * as util from '@/utils';

const useSearchState = () => {
  return reactive({
    searchKeyword: '',
    searchKeywordType: 'region',
  })
}

export default  {
  name: 'ExpertList',
  
  components: { 
    IonSelect, 
    IonSelectOption, 
    IonSearchbar, 
    IonCustomHeader, 
    IonLabel, 
  //  IonAvatar, 
  //  IonListHeader, 
    IonList, 
    IonItem, 
    IonContent,
  //  IonItemDivider,
    IonButton,
    IonButtons,
  },
  
  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();
    const searchState = useSearchState();

    const state = reactive({
      experts: [] as Expert[],
      //searchKeyword: '' as string,
      reviews: [] as Review[],
    });

    function onInput(event: any){
      searchState.searchKeyword = event.target.value;
      return searchState.searchKeyword;
    }


    const returnFilteredExperts = computed(() => {

      let filteredExperts = state.experts;
      
      if(searchState.searchKeywordType == "name"){
        filteredExperts = state.experts.filter((expert: Expert) => expert.name.includes(searchState.searchKeyword))
      }
      if(searchState.searchKeywordType == "region"){
        filteredExperts = state.experts.filter((expert: Expert) => expert.region.includes(searchState.searchKeyword))
      }
      return filteredExperts
    })

    async function loadExperts(){
      const axRes = await mainService.expert_list()
      state.experts = axRes.data.body.experts;
    }

    async function deleteReview(relTypeCode: string, relId: number, id: number, clientId: number) {

      const axRes = await mainService.review_doDelete(relTypeCode, relId, id, clientId)

          util.showAlert(axRes.data.msg);
          if ( axRes.data.fail ) {
            return;
          }
        window.location.reload();

    }

    const relTypeCode = 'expert';

    function doDeleteReview(relId: number, id: number, clientId: number) { 
    const msg = '해당 리뷰를 삭제하시겠습니까?'
    
      util.showAlertConfirm(msg).then(confirm => {
        if (confirm == false) {
          return
        } else{
          deleteReview(relTypeCode, relId, id, clientId);
        }
      })
    }

    // onMounted 바로 실행하는 것이 아닌 모든 것이 준비되었을때 실행됨
    onMounted(() => {
      //alert("3");
      loadExperts();
     // loadReviews(relTypeCode);
    });


    return {
      globalState,
      mainService,
      state,
      searchState,
      returnFilteredExperts,
      doDeleteReview,
      onInput,
      //onClickInput,
    }
  }
}


</script> 