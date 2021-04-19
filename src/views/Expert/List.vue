<template>
  <ion-base-layout pageTitle="지도사 현황" >
    <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

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

      <div class="w-full border-t-4 border-b-2 pl-3 py-2 text-gray-600">
        Total: {{returnFilteredExperts.length}}
      </div>

      <template v-bind:key="expert.id" v-for="expert in returnFilteredExperts.slice(0, state.limtNum)">
      <div class="expertList border-t border-b">

        <div class="expertList_head">
          <div class="w-full flex justify-end">
            <ion-buttons>
              <ion-button color="dark" slot="start" :router-link="'/expert/profile?id=' + expert.id">
                <font-awesome-icon class="text-gray-800 mr-1 text-xs" icon="user-check"/>
                <span class="text-gray-600 text-xs">프로필</span>
              </ion-button>
              <ion-button v-if="globalState.memberType == 'client'" color="dark" :router-link="'/order/add?expertId=' + expert.id + '&clientId=' + globalState.loginedClient.id" >
                <font-awesome-icon class="text-gray-800 mr-1 text-xs" icon="edit"/>
                <span class="text-gray-600 text-xs">의뢰</span>
              </ion-button>
              <ion-button color="dark" :router-link="'/review/list?expertId=' + expert.id">
                <font-awesome-icon class="text-gray-800 mr-1 text-xs" icon="comment-dots"/>
                <span class="text-gray-600 text-xs">{{expert.extra__reviews.length}}</span>
              </ion-button>
            </ion-buttons>
          </div>
        </div>

        <div class="expertList_body mb-3">
          <!--정보-->
          <ion-item lines="none">
            <div class="w-36">
              <img class="h-20 rounded-full" :src="mainService.getExpertThumbImgUrl(expert.id)" @error="this.onerror=null;replaceByDefault($event)">
            </div>
            <div class="flex-col w-full mb-1">
              <span class="ml-5 font-bold text-black border-b-2">
                {{expert.name}}님
              </span>
              <div class="flex ml-5 text-xs  pt-2">
                <span class="mr-3">
                  지역: {{expert.region}}
                </span>
                <span>
                  경력: {{expert.career}}
                </span>
              </div>
            </div>
            <!--평점--> 
            <div class="w-32">
              <div class="flex justify-center items-center w-full text-center">
                <div class="border border-gray-800 mb-2 rounded-sm h-14 w-14 flex justify-center items-center mr-4 mt-2">
                  <div class="text-sm text-gray-500">
                    <span class="">평점</span>
                    {{ expert.extra__ratingPoint.toFixed(1) }}/5
                  </div>
                </div>
              </div>
            </div>
          </ion-item>  
        </div>
      </div> 
      </template>
      <ion-button v-if="returnFilteredExperts.length > state.limtNum" @click="showMoreList" size="small" color="medium" expand="block">
        더보기
      </ion-button>
    </ion-list>
  </ion-base-layout>
</template>

<style>
.ion-searchbar{
  --border-radius:10px 10px 10px 10px;
}
</style>

<script lang="ts">
import {  } from '@/components/';
import { 
  IonSelect, 
  IonSelectOption, 
  IonSearchbar, 
  IonLabel, 
  IonList, 
  IonItem, 
  //IonChip,
 // IonItemDivider,
  IonButton,
  IonButtons,
  IonRefresher, 
  IonRefresherContent,

} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, computed, onMounted, defineComponent } from 'vue';
import { Expert, Review } from '@/types';
import * as util from '@/utils';

const useSearchState = () => {
  return reactive({
    searchKeyword: '',
    searchKeywordType: 'region',
  })
}

export default defineComponent ({
  name: 'ExpertList',
  
  components: {
    IonSelect, 
    IonSelectOption, 
    IonSearchbar, 
    IonLabel,
   // IonChip, 
  //  IonAvatar, 
  //  IonListHeader, 
    IonList, 
    IonItem, 
  //  IonItemDivider,
    IonButton,
    IonButtons,
    IonRefresher, 
    IonRefresherContent,
  },
  
  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();
    const searchState = useSearchState();

    const state = reactive({
      experts: [] as Expert[],
      //searchKeyword: '' as string,
      reviews: [] as Review[],
      limtNum: 10,
    });

    function replaceByDefault(e: any) {
      e.target.src = 'https://via.placeholder.com/500x500?text=NoImage'
    }

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
      //util.showAlert("3");
      loadExperts();
     // loadReviews(relTypeCode);
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
      returnFilteredExperts,
      doDeleteReview,
      onInput,
      //onClickInput,
      replaceByDefault,
      showMoreList,
      doRefresh,
    }
  }
})


</script> 