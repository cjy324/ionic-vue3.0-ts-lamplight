<template>
  <ion-base-layout pageTitle="후기">

    <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <ion-buttons>
      <ion-button color="" @click="historyBack">
        <font-awesome-icon class="text-gray-600 text-2xl mt-3" icon="arrow-left"/>
      </ion-button>
    </ion-buttons>

    <ion-list class="mb-12">
      <ion-list-header>
        <img class="rounded-full h-12 mr-2 mt-2 mb-2" :src="mainService.getExpertThumbImgUrl(state.expert.id)" @error="this.onerror=null;replaceByDefault($event)">
        <span class="text-lg mr-1 text-black">{{state.expert.name}}</span><span>님 후기</span>
      </ion-list-header>

      <div class="w-full border-b-2 pl-3 py-2 text-gray-600">
        Total: {{state.reviews.length}}
      </div>

      <div class="reviewList border-t border-b">
        <ion-item lines="none">
        <div class="flex-col w-full">
          <template v-if="state.reviews.length !== 0">
          <div class="border-b border-t bg-gray-100 rounded-xl mt-1 mb-1" v-bind:key="review.id" v-for="review in state.reviews.slice(0, state.limtNum)">
              <p class="text-gray-700 p-2 pb-0 text-md">
                {{review.body}}
              </p>
              <span class="text-gray-500 p-2 text-xs ">
                {{review.updateDate}} / {{review.extra__clientName}}님
              </span>
              <div v-if="globalState.loginedClient.id === review.clientId" class="w-full flex justify-end">
                <ion-buttons>
                  <ion-button slot="" :router-link="'/review/modify?relTypeCode=expert&relId=' + state.expert.id + '&id=' + review.id">
                    <span class="text-xs">수정</span>
                  </ion-button>
                  <ion-button color="" slot="end" @click="doDeleteReview(state.expert.id, review.id, globalState.loginedClient.id)">
                    <span class="text-xs text-red-900">삭제</span>
                  </ion-button>
                </ion-buttons>
              </div>
          </div>
          </template>
          <div v-else class="border-b border-t bg-gray-100 mt-1 mb-1 rounded-xl">
            <p class="text-gray-700 p-2 pb-4 text-sm">
              작성된 후기가 없습니다.
            </p>
          </div>
        </div>
        </ion-item>
      </div>
      <ion-button v-if="state.reviews.length >= state.limtNum" @click="showMoreList" size="small" color="medium" expand="block">
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

import { 
  IonListHeader, 
  IonList, 
  IonItem, 
  IonButton,
  IonButtons,
  //IonIcon,
  IonRefresher, 
  IonRefresherContent,

} from '@ionic/vue';
import {
  albumsOutline,
  peopleOutline,
} from 'ionicons/icons';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, onMounted, defineComponent } from 'vue';
import { Expert, Review } from '@/types';
import { useRoute, useRouter } from 'vue-router';
import * as util from '@/utils';

export default defineComponent ({
  name: 'ReviewList',
  
  components: {
    IonListHeader, 
    IonList, 
    IonItem, 
    IonButton,
    IonButtons,
    //IonIcon,
    IonRefresher, 
    IonRefresherContent,
  },
  
  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();
    const route = useRoute();
    const router = useRouter();useRouter

    const state = reactive({
      expert: {} as Expert,
      reviews: [] as Review[],
      limtNum: 10,
    });

    //기본이미지
    function replaceByDefault(e: any) {
      e.target.src = 'https://via.placeholder.com/500x500?text=NoImage'
    }

    const relTypeCode = 'expert';
    let relId = 0

    if ( route.query.expertId != null ) {
      relId = util.toIntOrNull(route.query.expertId);
    }

    async function loadExpert(relId: number) {
      const axRes = await mainService.expert_detail(relId)
      state.expert = axRes.data.body.expert;
    }
    
    async function loadReviews(relTypeCode: string, relId: number){
      const axRes = await mainService.review_list(relTypeCode, relId)
      state.reviews = axRes.data.body.reviews;
    }

    onMounted(() => {
      loadExpert(relId);
      loadReviews(relTypeCode, relId);
    });

    async function deleteReview(relTypeCode: string, relId: number, id: number, clientId: number) {

      const axRes = await mainService.review_doDelete(relTypeCode, relId, id, clientId)

          util.showAlert(axRes.data.msg);
          if ( axRes.data.fail ) {
            return;
          }
        window.location.reload();

    }

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

    function historyBack(){
      router.go(-1)
    }


    return {
      globalState,
      mainService,
      state,
      historyBack,
      doDeleteReview,
      replaceByDefault,
      albumsOutline,
      peopleOutline,
      showMoreList,
      doRefresh,
    }
  }
})


</script> 