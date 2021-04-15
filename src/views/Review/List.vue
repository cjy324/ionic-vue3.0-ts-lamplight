<template>
  <ion-base-layout pageTitle="후기">

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
          <div class="border-b border-t bg-gray-100 rounded-xl mt-1 mb-1" v-bind:key="review.id" v-for="review in state.reviews">
              <p class="text-gray-700 p-2 pb-0 text-sm">
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
    </ion-list>
    <div class="px-4">
      <ion-button href="/expert/list" color="medium" type="button" expand="block">
        리스트로 돌아가기
      </ion-button>
    </div>
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

} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, onMounted, defineComponent } from 'vue';
import { Expert, Review } from '@/types';
import { useRoute } from 'vue-router';
import * as util from '@/utils';

export default defineComponent ({
  name: 'ReviewList',
  
  components: {
    IonListHeader, 
    IonList, 
    IonItem, 
    IonButton,
    IonButtons,
  },
  
  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();
    const route = useRoute();

    const state = reactive({
      expert: {} as Expert,
      reviews: [] as Review[],
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


    return {
      globalState,
      mainService,
      state,
      doDeleteReview,
      replaceByDefault,
    }
  }
})


</script> 