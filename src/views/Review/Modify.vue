<template>
  <ion-base-layout pageTitle="후기 수정">
      <ion-custom-body class="justify-center">
        <div class="logo-box text-center flex justify-center items-center mb-3">
            <div class="w-32 text-2xl font-bold border-b">
              REVIEW
            </div>
        </div>
        <form v-if="globalState.isLogined" @submit.prevent="checkAndModifyReview">
          <div>
            <ion-item>
              <ion-label position="floating">평점</ion-label>
              <ion-select v-model="reviewModifyFormState.point" interface="action-sheet" :placeholder="state.rating.point">
                <ion-select-option value="5">5점</ion-select-option>
                <ion-select-option value="4">4점</ion-select-option>
                <ion-select-option value="3">3점</ion-select-option>
                <ion-select-option value="2">2점</ion-select-option>
                <ion-select-option value="1">1점</ion-select-option>
              </ion-select>
            </ion-item>
          </div>

          <div>
            <ion-item >
              <ion-label position="stacked">후기</ion-label>
              <ion-textarea class="h-12" v-model="reviewModifyFormState.body" :placeholder="state.review.body"></ion-textarea>
            </ion-item>
          </div>
          <div class="mb-2 mt-4 px-4">
            <ion-button color="primary" type="submit" expand="block">수정 완료</ion-button>
          </div>
          <div class="px-4">
            <ion-button @click="historyBack" color="light" type="button" expand="block">취소</ion-button>
          </div>
        </form>
        <div v-else class="py-2 px-4">
          로그인 후 이용가능합니다.
          <ion-custom-link to="/member/main">Log-In</ion-custom-link>하러가기
        </div>
      </ion-custom-body>
  </ion-base-layout>
</template>

<style>

</style>

<script lang="ts">
import { IonCustomBody, IonCustomLink } from '@/components/';
import { 
  IonSelect, 
  IonSelectOption, 
  IonLabel, 
  IonTextarea, 
  IonItem, 
  IonButton, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { useRoute, useRouter } from 'vue-router';
import * as util from '@/utils';
import { reactive, onMounted, defineComponent } from 'vue';
import { Rating, Review } from '@/types';

const useReviewModifyFormState = () => {
  return reactive({
    point: '',
    body: '',
  })
}

export default defineComponent ({
  name: 'ReviewModify',

  components: { 
    IonSelect, 
    IonSelectOption, 
    IonLabel, 
    IonTextarea,
    IonItem, 
    IonButton,
    IonCustomBody,
    IonCustomLink, 
  },

  setup() {
    const globalState = useGlobalState();
    const reviewModifyFormState = useReviewModifyFormState();
    const router = useRouter();
    const route = useRoute();
    const mainService = useMainService();

    const state = reactive({
      rating: {} as Rating,
      review: {} as Review,
    })

    let id = 0;
    let relTypeCode = '';
    let relId = 0;

    if ( route.query.id != null ) {
      id = util.toIntOrNull(route.query.id);
    }
    if ( route.query.relTypeCode != null ) {
      relTypeCode = util.toStringOrNull(route.query.relTypeCode);
    }
    if ( route.query.relId != null ) {
      relId = util.toIntOrNull(route.query.relId);
    }
    
    async function loadRating(relTypeCode: string, relId: number, clientId: number) {
      const axRes = await mainService.rating_getRatingRelClient(relTypeCode, relId, clientId)

        state.rating = axRes.data.body.rating;

    }

    async function loadReview(id: number) {
      const axRes = await mainService.review_detail(id)

        state.review = axRes.data.body.review;

    }

    onMounted(() => {
      loadReview(id);
      loadRating(relTypeCode, relId, globalState.loginedClient.id);
    });


    function checkAndModifyReview() {
      
      // 평점 체크
      let point = parseInt(reviewModifyFormState.point);
      
      if ( isNaN(point) || point == 0 ) {
        point = state.rating.point;
      }

      // 후기 체크
      let body = reviewModifyFormState.body.trim();
      
      if ( body.length == 0 ) {
        body = state.review.body;
      }

      let relTypeCode = '';

      if ( route.query.relTypeCode != null ) {
        relTypeCode = util.toStringOrNull(route.query.relTypeCode)
      }

      let relId = 0;

      if ( route.query.relId != null ) {
        relId = util.toIntOrUnd(route.query.relId)
      }

      async function ratingModify(onSuccess: Function){
        const axRes = await mainService.rating_doModify(relTypeCode, relId, point, globalState.loginedClient.id)

          if ( axRes.data.fail ) {
            util.showAlert(axRes.data.msg);
            return;
          }

          else{
            onSuccess();
          }
      }

      async function modifyReview(id: number, body: string, clientId: number) {
        const axRes = await mainService.review_doModify(id, body, clientId);
  
          util.showAlert(axRes.data.msg);
          if ( axRes.data.fail ) {
            return;
          }
          //const newReviewId = axRes.data.body.id;

          window.location.replace('/review/list?expertId='+ relId);
      }

      const startModifyReview = () =>{
      // 작성 함수로 보내기
          modifyReview(id, body, globalState.loginedClient.id);
      }

      const msg = '해당 내용으로 수정하시겠습니까?'
      util.showAlertConfirm(msg).then(confirm => {
        if (confirm == false) {
          return
        } else{
          ratingModify(startModifyReview);
        }
      })

    }

    function historyBack(){
      router.go(-1)
    }

    return {
      globalState,
      state,
      historyBack,
      //confirmAlert,
      reviewModifyFormState,
      checkAndModifyReview,
      
    }
  }
})
</script> 