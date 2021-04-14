<template>
  <ion-base-layout pageTitle="의뢰요청">
    <ion-list v-if="globalState.isLogined">
      <form @submit.prevent="checkAndAddOrder" >
        <ion-item>
          <ion-label position="floating">고인 이름</ion-label>
          <ion-input v-model="orderAddFormState.deceasedName" type="text" placeholder="고인의 이름을 입력해주세요."></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">상주 이름</ion-label>
          <ion-input v-model="orderAddFormState.bereavedName" type="text" placeholder="상주의 이름을 입력해주세요."></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">지역</ion-label>
          <ion-select v-model="orderAddFormState.region">
            <ion-select-option value="서울특별시">서울특별시</ion-select-option>
            <ion-select-option value="부산광역시">부산광역시</ion-select-option>
            <ion-select-option value="대구광역시">대구광역시</ion-select-option>
            <ion-select-option value="인천광역시">인천광역시</ion-select-option>
            <ion-select-option value="광주특별시">광주특별시</ion-select-option>
            <ion-select-option value="대전광역시">대전광역시</ion-select-option>
            <ion-select-option value="울산광역시">울산광역시</ion-select-option>
            <ion-select-option value="세종특별자치시">세종특별자치시</ion-select-option>
            <ion-select-option value="경기도">경기도</ion-select-option>
            <ion-select-option value="강원도">강원도</ion-select-option>
            <ion-select-option value="충청북도">충청북도</ion-select-option>
            <ion-select-option value="충청남도">충청남도</ion-select-option>
            <ion-select-option value="전라북도">전라북도</ion-select-option>
            <ion-select-option value="전라남도">전라남도</ion-select-option>
            <ion-select-option value="경상북도">경상북도</ion-select-option>
            <ion-select-option value="경상남도">경상남도</ion-select-option>
            <ion-select-option value="제주득별자치도">제주득별자치도</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-label position="floating">장례식장</ion-label>
          <ion-input v-model="orderAddFormState.funeralHome" type="text" placeholder="장례식장을 입력해주세요.(미정이면 '미정'입력)"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">종교</ion-label>
          <ion-select v-model="orderAddFormState.religion">
            <ion-select-option value="기독교">기독교</ion-select-option>
            <ion-select-option value="천주교">천주교</ion-select-option>
            <ion-select-option value="불교">불교</ion-select-option>
            <ion-select-option value="기타">기타</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">시작일</ion-label>
          <ion-input v-model="orderAddFormState.startDate" type="date"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">종료일</ion-label>
          <ion-input v-model="orderAddFormState.endDate" type="date"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">추가 요청 사항</ion-label>
          <ion-textarea v-model="orderAddFormState.body" placeholder="추가 요청 사항을 입력해주세요."></ion-textarea>
        </ion-item>

        <div class="pt-2 mb-2 px-4">
          <ion-button class="btn-success" type="submit" size="default" expand="block">완료</ion-button>
        </div>
        <div class="px-4">
          <ion-button router-link="/order/main" class="btn-cancel" color="" type="button" expand="block">
            취소('내 의뢰 관리'로 가기)
          </ion-button>
        </div>
        <div class="px-4">
          <ion-button router-link="/expert/list" class="btn-cancel2" color="" type="button" expand="block">
            취소('지도사 현황'으로 가기)
          </ion-button>
        </div>
      </form>
    </ion-list>
    <ion-custom-body v-else class="justify-center">
      <div class="py-2 px-4">
        로그인 후 이용가능합니다.
        <ion-custom-link to="/member/main">로그인</ion-custom-link>하러가기
      </div>
    </ion-custom-body>
  </ion-base-layout>
</template>

<style>
.btn-success{
  --background:var(--ion-color-success-shade)
}
.btn-cancel{
  --background:var(--ion-color-medium-shade)
}
.btn-cancel2{
  --background:var(--ion-color-medium-tint)
}
</style>

<script lang="ts">
import { IonCustomBody, IonCustomLink } from '@/components/';
import { 
  IonSelect, 
  IonSelectOption, 
  IonLabel,
  IonList, 
  IonInput,
  IonTextarea, 
  IonItem, 
  IonButton, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { useRoute, useRouter } from 'vue-router';
import * as util from '@/utils';
import { reactive, defineComponent } from 'vue';

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

export default defineComponent ({
  name: 'OrderAdd',

  components: { 
    IonSelect, 
    IonSelectOption, 
    IonList,
    IonLabel, 
    IonInput,
    IonTextarea,
    IonItem, 
    IonButton,
    IonCustomBody,
    IonCustomLink, 

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
        util.showAlert('고인의 이름을 입력해주세요.');
        return;
      }
      // 상주 이름 체크
      const bereavedName = orderAddFormState.bereavedName.trim();
      
      if ( bereavedName.length == 0 ) {
        util.showAlert('상주의 이름를 입력해주세요.');
        return;
      }

      // 장례식장 체크
      const funeralHome = orderAddFormState.funeralHome.trim();
      
      if ( funeralHome.length == 0 ) {
        util.showAlert('장례식장을 입력해주세요.');
        return;
      }

      // 지역 체크
      const region = orderAddFormState.region.trim();
      
      if ( region.length == 0 ) {
        util.showAlert('지역을 입력해주세요.');
        return;
      }
      
      // // 예상 인원 체크
      // const head = parseInt(orderAddFormState.head);
      
      // if ( head == 0 ) {
      //   util.showAlert('예상 조문인원을 입력해주세요.');
      //   return;
      // }

      // 종교 체크
      const religion = orderAddFormState.religion.trim();

      if ( religion.length == 0 ) {
        util.showAlert('종교를 입력해주세요.');
        return;
      }
      
      // 시작일 체크
      const startDate = orderAddFormState.startDate.trim();
      
      if ( startDate.length == 0 ) {
        util.showAlert('장례 시작일을 입력해주세요.');
        return;
      }

      // 종료일 체크
      const endDate = orderAddFormState.endDate.trim();
      
      if ( endDate.length == 0 ) {
        util.showAlert('장례 종료일을 입력해주세요.');
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

          window.location.replace("/order/detail?id=" + newOrderId);
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
})
</script> 