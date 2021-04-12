<template>
  <ion-base-layout pageTitle="후기">
      <ion-custom-body class="justify-center">
        <div class="logo-box text-center flex justify-center items-center mb-3">
            <div class="w-32 text-2xl font-bold border-b">
              REVIEW
            </div>
        </div>
        <form v-if="globalState.isLogined" @submit.prevent="checkAndAddReview">
          <div>
            <ion-item>
              <ion-label position="floating">평점</ion-label>
              <ion-select v-model="reviewAddFormState.point" interface="action-sheet">
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
              <ion-label position="floating">후기</ion-label>
              <ion-textarea class="h-12" v-model="reviewAddFormState.body" placeholder="후기를 입력해주세요."></ion-textarea>
            </ion-item>
          </div>
          <div class="mb-2 mt-4 px-4">
            <ion-button type="submit" expand="block">작성 완료</ion-button>
          </div>
          <div class="px-4">
            <ion-button class="btn-cancel" router-link="/order/list" color="" type="button" expand="block">취소</ion-button>
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
.btn-cancel{
  --background:var(--ion-color-medium-shade)
}
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
import { reactive, defineComponent } from 'vue';

const useReviewAddFormState = () => {
  return reactive({
    point: '',
    body: '',
  })
}

export default defineComponent ({
  name: 'ReviewAdd',

  components: { 
    IonSelect, 
    IonSelectOption, 
    IonLabel, 
    IonTextarea,
    IonItem, 
    IonButton,
    IonCustomBody,
    IonCustomLink 
  },

  setup() {
    const globalState = useGlobalState();
    const reviewAddFormState = useReviewAddFormState();
    const router = useRouter();
    const route = useRoute();
    const mainService = useMainService();

    // function confirmAlert(){
    //   const msg = '해당 내용으로 가입하시겠습니까?'
    //   util.showAlertConfirm(msg)
    // }

    function checkAndAddReview() {
      
      // 평점 체크
      const point = parseInt(reviewAddFormState.point);
      
      if ( point == 0 ) {
        util.showAlert('평점을 입력해 주세요');
        return;
      }

      // 후기 체크
      const body = reviewAddFormState.body.trim();
      
      if ( body.length == 0 ) {
        util.showAlert('후기를 입력해 주세요');
        return;
      }

      let relTypeCode = '';

      if ( route.query.relTypeCode != null ) {
        relTypeCode = util.toStringOrNull(route.query.relTypeCode)
      }

      let relId = 0;

      if ( route.query.relId != null ) {
        relId = util.toIntOrUnd(route.query.relId)
      }

      async function ratingAdd(onSuccess: Function){
        const axRes = await mainService.rating_doAdd(relTypeCode, relId, point, globalState.loginedClient.id)

          if ( axRes.data.fail ) {
            util.showAlert(axRes.data.msg);
            return;
          }

          else{
            onSuccess();
          }
      }

      async function addReview(relTypeCode: string, relId: number, body: string, clientId: number) {
        const axRes = await mainService.review_doAdd(relTypeCode, relId, body, clientId);
  
          util.showAlert(axRes.data.msg);
          if ( axRes.data.fail ) {
            return;
          }
          //const newReviewId = axRes.data.body.id;

          router.replace('/order/list');
      }

      const startAddReview = () =>{
      // 작성 함수로 보내기
          addReview(relTypeCode, relId, body, globalState.loginedClient.id);
      }

      const msg = '해당 내용으로 작성하시겠습니까?'
      util.showAlertConfirm(msg).then(confirm => {
        if (confirm == false) {
          return
        } else{
          ratingAdd(startAddReview);
        }
      })

    }

    return {
      globalState,
      //confirmAlert,
      reviewAddFormState,
      checkAndAddReview,
      
    }
  }
})
</script> 