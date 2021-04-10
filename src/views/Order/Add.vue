<template>
<ion-page>
  <ion-custom-header>의뢰요청</ion-custom-header>
  <ion-custom-body class="justify-center">
    <ion-content v-if="globalState.isLogined" :fullscreen="true">
      <form @submit.prevent="checkAndAddOrder" class="mb-24">
        <div>
          <ion-item>
            <ion-label position="floating">고인 이름</ion-label>
            <ion-input v-model="orderAddFormState.deceasedName" type="text" placeholder="고인의 이름을 입력해주세요."></ion-input>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="floating">상주 이름</ion-label>
            <ion-input v-model="orderAddFormState.bereavedName" type="text" placeholder="상주의 이름을 입력해주세요."></ion-input>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="floating">지역</ion-label>
            <ion-select v-model="orderAddFormState.region">
              <ion-select-option value="서울특별시">서울</ion-select-option>
              <ion-select-option value="대전광역시">대전</ion-select-option>
              <ion-select-option value="인천광역시">인천</ion-select-option>
              <ion-select-option value="부산광역시">부산</ion-select-option>
            </ion-select>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="floating">장례식장</ion-label>
            <ion-input v-model="orderAddFormState.funeralHome" type="text" placeholder="장례식장을 입력해주세요.(미정이면 '미정'입력)"></ion-input>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="floating">종교</ion-label>
            <ion-select v-model="orderAddFormState.religion">
              <ion-select-option value="기독교">기독교</ion-select-option>
              <ion-select-option value="천주교">천주교</ion-select-option>
              <ion-select-option value="불교">불교</ion-select-option>
              <ion-select-option value="기타">기타</ion-select-option>
            </ion-select>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="stacked">시작일</ion-label>
            <ion-input v-model="orderAddFormState.startDate" type="date"></ion-input>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="stacked">종료일</ion-label>
            <ion-input v-model="orderAddFormState.endDate" type="date"></ion-input>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="stacked">추가 요청 사항</ion-label>
            <ion-textarea v-model="orderAddFormState.body" placeholder="추가 요청 사항을 입력해주세요."></ion-textarea>
          </ion-item>
        </div>
        <ion-list>
          <div class="mb-2 px-4">
            <ion-button class="btn-success" type="submit" size="default" expand="block">완료</ion-button>
          </div>
          <div class="px-4">
            <ion-button class="btn-cancel" href='/order/main' color="" type="button" expand="block">취소</ion-button>
          </div>
        </ion-list>
      </form>
    </ion-content>
    <div v-else class="py-2 px-4">
        로그인 후 이용가능합니다. <ion-custom-link to="/client/login">Log-In</ion-custom-link> 하러 가기
    </div>
  </ion-custom-body>
</ion-page>
</template>

<style>
.btn-success{
  --background:var(--ion-color-success-shade)
}
.btn-cancel{
  --background:var(--ion-color-medium-shade)
}
</style>

<script lang="ts">
import { IonCustomBody, IonCustomHeader, IonCustomLink } from '@/components/';
import { 
  IonPage,
  IonContent,
  IonSelect, 
  IonSelectOption, 
  IonLabel, 
  IonInput,
  IonTextarea, 
  IonItem, 
  IonButton, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { useRoute, useRouter } from 'vue-router';
import * as util from '@/utils';
import { reactive } from 'vue';

const useOrderAddFormState = () => {
  return reactive({
    deceasedName: '',
    bereavedName: '',
    funeralHome:'',
    region:'',
    religion: '',
    startDate: '',
    endDate: '',
    body: '',
  })
}

export default {
  name: 'OrderAdd',

  components: { 
    IonCustomLink, 
    IonSelect, 
    IonSelectOption, 
    IonLabel, 
    IonInput,
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
    const orderAddFormState = useOrderAddFormState();
    const router = useRouter();
    const route = useRoute();
    const mainService = useMainService();

    // function confirmAlert(){
    //   const msg = '해당 내용으로 가입하시겠습니까?'
    //   util.showAlertConfirm(msg)
    // }

    function checkAndAddOrder() {

      // 고인 이름 체크
      const deceasedName = orderAddFormState.deceasedName.trim();
      
      if ( deceasedName.length == 0 ) {
        alert('고인의 이름을 입력해주세요.');
        return;
      }
      // 상주 이름 체크
      const bereavedName = orderAddFormState.bereavedName.trim();
      
      if ( bereavedName.length == 0 ) {
        alert('상주의 이름를 입력해주세요.');
        return;
      }

      // 장례식장 체크
      const funeralHome = orderAddFormState.funeralHome.trim();
      
      if ( funeralHome.length == 0 ) {
        alert('장례식장을 입력해주세요.');
        return;
      }

      // 지역 체크
      const region = orderAddFormState.region.trim();
      
      if ( region.length == 0 ) {
        alert('지역을 입력해주세요.');
        return;
      }
      
      // // 예상 인원 체크
      // const head = parseInt(orderAddFormState.head);
      
      // if ( head == 0 ) {
      //   alert('예상 조문인원을 입력해주세요.');
      //   return;
      // }

      // 종교 체크
      const religion = orderAddFormState.religion.trim();

      if ( religion.length == 0 ) {
        alert('종교를 입력해주세요.');
        return;
      }
      
      // 시작일 체크
      const startDate = orderAddFormState.startDate.trim();
      
      if ( startDate.length == 0 ) {
        alert('장례 시작일을 입력해주세요.');
        return;
      }

      // 종료일 체크
      const endDate = orderAddFormState.endDate.trim();
      
      if ( endDate.length == 0 ) {
        alert('장례 종료일을 입력해주세요.');
        return;
      }

      // 추가 요청 사항 체크
      let body = orderAddFormState.body.trim();
      
      if ( body.length == 0 ) {
        body = '추가 요청 사항이 없습니다.';
      }

      let expertId = '0';

      if ( route.query.expertId != null ) {
        expertId = util.toIntOrUnd(route.query.expertId)
      }

      async function addOrder(deceasedName: string, bereavedName: string, funeralHome: string, region: string, religion: string, startDate: string, endDate: string, body: string, expertId: number, clientId: number) {
        const axRes = await mainService.order_doAdd(deceasedName, bereavedName, funeralHome, region, religion, startDate, endDate, body, expertId, clientId);
  
          if ( axRes.data.fail ) {
            return;
          }
          util.showAlert(axRes.data.msg);
          const newOrderId = axRes.data.body.id;

          router.replace("detail?id=" + newOrderId);
      }

      const msg = '해당 내용으로 의뢰하시겠습니까?'
      util.showAlertConfirm(msg).then(confirm => {
        if (confirm == false) {
          return
        } else{
          addOrder(deceasedName, bereavedName, funeralHome, region, religion, startDate, endDate, body, parseInt(expertId), globalState.loginedClient.id);
        }
      })

    }

    return {
      globalState,
      //confirmAlert,
      orderAddFormState,
      checkAndAddOrder,
      
    }
  }
}
</script> 