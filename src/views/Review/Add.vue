<template>
  <ion-page>
    <ion-custom-header>후기/평점 작성</ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">후기/평점 작성</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-custom-body class="justify-center">
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
          <div class="py-2 px-4">
            <ion-button type="submit" expand="block">작성 완료</ion-button>
          </div>
          <div class="px-4">
            <ion-button color="secondary" type="reset" expand="block">초기화</ion-button>
          </div>
          <div class="px-4">
            <ion-button href="/order/list" color="secondary" type="button" expand="block">취소</ion-button>
          </div>
        </form>
        <div v-else class="py-2 px-4">
          로그인 후 이용가능합니다. <ion-custom-link to="/client/login">로그인</ion-custom-link> 하러 가기
        </div>
      </ion-custom-body>
    </ion-content>
  </ion-page>
</template>

<style>
</style>

<script lang="ts">
import { IonCustomBody, IonCustomHeader, IonCustomLink } from '@/components/';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonSelect, 
  IonSelectOption, 
  IonLabel, 
  //IonInput,
  IonTextarea, 
  IonItem, 
  IonButton, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { useRoute, useRouter } from 'vue-router';
import * as util from '@/utils';
import { reactive } from 'vue';

const useReviewAddFormState = () => {
  return reactive({
    point: '',
    body: '',
  })
}

export default {
  name: 'ReviewAdd',

  components: { 
    IonHeader, 
    IonToolbar,
    IonCustomLink, 
    IonTitle,
    IonSelect, 
    IonSelectOption, 
    IonLabel, 
    //IonInput,
    IonTextarea,
    IonItem, 
    IonButton, 
    IonContent, 
    IonPage, 
    IonCustomBody, 
    IonCustomHeader 
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
        alert('평점을 입력해 주세요');
        return;
      }

      // 후기 체크
      const body = reviewAddFormState.body.trim();
      
      if ( body.length == 0 ) {
        alert('후기를 입력해 주세요');
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

          router.replace("/");
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
}
</script> 