<template>
  <ion-base-layout pageTitle="ID찾기">
      <ion-custom-body class="justify-center">
        <div class="logo-box text-center flex justify-center items-center mb-3">
            <div class="w-32 text-2xl border-b">
              ID 찾기
            </div>
        </div>
        <form @submit.prevent="checkAndFindLoginId" class="mx-4">
          <div class="bg-white pb-3 pt-2 rounded-xl px-4 mx-2">
            <ion-item class="f_item">
              <ion-label position="floating">이름</ion-label>
              <ion-input v-model="findLoginIdFormState.name" maxlength="20" placeholder="이름을 입력해주세요."></ion-input>
            </ion-item>
            <ion-item class="s_item">
              <ion-label position="floating">이메일</ion-label>
              <ion-input v-model="findLoginIdFormState.email" maxlength="20" type="email" placeholder="email을 입력해주세요."></ion-input>
            </ion-item>
          </div>
          <div class="py-2 px-4">
            <ion-button type="submit" expand="block">찾기</ion-button>
          </div>
        </form>
      </ion-custom-body>
</ion-base-layout>
</template>

<style>


</style>

<script lang="ts">
import { IonCustomBody} from '@/components/';
import { 

  IonLabel, 
  IonInput, 
  IonItem, 
  IonButton 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { reactive, defineComponent } from 'vue';
//import { useMainApi } from '@/apis';  //mainService를 통해 mainAPI를 가져오는 방식으로 변경
import { useMainService } from '@/services';
import { useRouter } from 'vue-router';
import * as util from '@/utils';

const useFindLoginIdFormState = () => {
  return reactive({
    name: '',
    email: '',
  })
}

export default defineComponent ({
  name: 'FindLoginId',
  components: { 

    IonLabel, 
    IonInput, 
    IonItem, 
    IonButton, 
    IonCustomBody, 

},
  
  
  setup() {
    const globalState = useGlobalState();
    const findLoginIdFormState = useFindLoginIdFormState();
    const router = useRouter();
    const mainService = useMainService();
    
    async function findLoginId(name: string, email: string) {
      
      const axRes = await mainService.client_findLoginId(name, email)

      util.showAlert(axRes.data.msg);
      if ( axRes.data.fail ) {
        return;
      }

      const loginId = axRes.data.body.loginId;

      router.replace('/client/login?loginId=' + loginId)
    }

    function checkAndFindLoginId() {
      if ( findLoginIdFormState.name.trim().length == 0 ) {
        util.showAlert('이름을 입력해주세요.');
        return;
      }
      if ( findLoginIdFormState.email.trim().length == 0 ) {
        util.showAlert('이메일을 입력해주세요.');
        return;
      }
      findLoginId(findLoginIdFormState.name, findLoginIdFormState.email);
    }

    return {
      globalState,
      findLoginIdFormState,
      checkAndFindLoginId
    }
  }
})
</script> 