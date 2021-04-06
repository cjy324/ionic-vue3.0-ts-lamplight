<template>
<ion-custom-header>지도사 - 리스트</ion-custom-header>
<ion-content >
  <ion-list class="mb-12">
    <ion-select v-model="searchKeywordState.searchKeywordType">
      <ion-select-option value="region">지역</ion-select-option>
      <ion-select-option value="name">이름</ion-select-option>
    </ion-select>
    <ion-item>
      <ion-searchbar show-cancel-button="focus" animated inputmode="search" enterkeyhint="enter" placeholder="검색어를 입력해주세요." :value="searchKeywordState.searchKeyword" @keyup.enter="onInput($event)"></ion-searchbar>
    </ion-item>
    <ion-list-header>지도사</ion-list-header>
    <template v-bind:key="expert.id" v-for="expert in returnFilteredExperts">
    <ion-item>
      <ion-avatar class="w-24 mb-14" slot="start">
        <img class="" :src="'http://via.placeholder.com/300?text=NoImage'">
      </ion-avatar>
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
      <div class="flex-col">
        <ion-item-divider class="mt-2">
          <ion-button color="" slot="end" :href="'/expert/detail?id=' + expert.id">
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
  IonAvatar, 
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

const useSearchKeywordState = () => {
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
    IonAvatar, 
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
    const searchKeywordState = useSearchKeywordState();

    const state = reactive({
      experts: [] as Expert[],
      //searchKeyword: '' as string,
      reviews: [] as Review[],
    });

    function onInput(event: any){
      searchKeywordState.searchKeyword = event.target.value;
      return searchKeywordState.searchKeyword;
    }


    const returnFilteredExperts = computed(() => {

      let filteredExperts = state.experts;
      
      if(searchKeywordState.searchKeywordType == "name"){
        filteredExperts = state.experts.filter((expert: Expert) => expert.name.includes(searchKeywordState.searchKeyword))
      }
      if(searchKeywordState.searchKeywordType == "region"){
        filteredExperts = state.experts.filter((expert: Expert) => expert.region.includes(searchKeywordState.searchKeyword))
      }
      return filteredExperts
    })

    async function loadExperts(){
      const axRes = await mainService.expert_list()
      state.experts = axRes.data.body.experts;
    }

    function doDeleteReview(id: number) {
      if(confirm('정말 삭제하시겠습니까?') == false){
        return;
      }
      mainService.review_doDelete(id)
      .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          if ( axiosResponse.data.fail ) {
            return;
          }
        window.location.reload();
      });
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
      searchKeywordState,
      returnFilteredExperts,
      doDeleteReview,
      onInput,
      //onClickInput,
    }
  }
}


</script> 