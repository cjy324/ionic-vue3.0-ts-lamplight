<template>
<ion-custom-header>지도사 현황</ion-custom-header>
<ion-content >
  <ion-list class="mb-12">
    <ion-select v-model="searchState.searchKeywordType">
      <ion-select-option value="region">지역</ion-select-option>
      <ion-select-option value="name">이름</ion-select-option>
    </ion-select>
    <ion-item>
      <ion-searchbar show-cancel-button="focus" animated inputmode="search" enterkeyhint="enter" placeholder="검색어를 입력해주세요." :value="searchState.searchKeyword" @keyup.enter="onInput($event)"></ion-searchbar>
    </ion-item>
    <ion-list-header>지도사</ion-list-header>
    <template v-bind:key="expert.id" v-for="expert in returnFilteredExperts">
    <ion-item>
        <img slot="start" class="h-32 rounded-3xl" :src="mainService.getExpertThumbImgUrl(expert.id)">
      <ion-label>
        <ion-grid>
          <ion-row>
            <ion-col size="12" class="bg-gray-300 border rounded-md">
              {{expert.name}}
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="4">
              지역: {{expert.region}}
            </ion-col>
            <ion-col size="10">
              자격증: {{expert.license}}
            </ion-col>
            <ion-col size="10">
              경력: {{expert.career}}
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="10">
              연락처: {{expert.cellphoneNo}}
            </ion-col>
            <ion-col size="10">
              e-mail: {{expert.email}}
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-label>

      <!--평점-->
        <div class="flex justify-center items-center w-full text-center mt-3">
          <div class="font-bold text-xl mr-5">
            '{{ expert.name }}'님의 전체 평점
          </div>
          <div class="border rounded-full h-24 w-24 bg-yellow-500 flex justify-center items-center">
            <div class="font-bold text-2xl text-white">
              {{ expert.extra__ratingPoint.toFixed(1) }}/5
            </div>
          </div>
        </div>
        <!--후기-->
        <div class="flex justify-between items-end h-8 w-full border-b-4 font-semibold">
          <p class="pb-1">
            매칭 후기
          </p>
          <div class="text-sm cursor-pointer hover:text-blue-500">
            더보기
          </div>
        </div>
        <!--template를 활용하면 v-for문 내 v-for문 즉, 이중v-for문 사용이 가능해진다.-->
        <!--또한, vue3.0부터는 동일 태그내에 v-for랑 v-if를 사용할 수 없는 것 같다.(권장하는 방법이 아닌듯..) -->
        <!--하지만 template를 활용해 v-for를 분리해주면 v-for와 v-if를 동시에 사용가능해진다. -->
        <div class="mt-2 border-b-2 border-t-2" v-bind:key="review.id" v-for="review in expert.extra__reviews.slice(0, 3)">
            <p class="text-gray-900 p-2">
              {{review.body}}
            </p>
            <p class="text-gray-500 p-2 text-sm">
              {{review.updateDate}} / {{review.extra__clientName}}
            </p>
            <div class="btns" v-if="globalState.loginedClient.id === review.clientId">
                <ion-button :href="'/review/modify?relTypeCode=expert&relId=' + expert.id + '&id=' + review.id" class="btn-secondary">
                  수정
                </ion-button >
                <button class="btn-warning" @click="doDeleteReview(expert.id, review.id, globalState.loginedClient.id)">삭제</button>
            </div>
        </div>

      <div class="flex-col">
        <ion-item-divider class="mt-2">
          <ion-button color="" slot="end" :href="'/expert/profile?id=' + expert.id">
            상세보기
          </ion-button>
        </ion-item-divider>
        <ion-item-divider class="mt-2">
          <ion-button color="success" slot="end" :href="'/order/add?expertId=' + expert.id + '&clientId=' + globalState.loginedClient.id">
            의뢰요청
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
 // IonAvatar, 
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
 //   IonAvatar, 
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