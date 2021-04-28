<template>
  <ion-base-layout pageTitle="로그인">
      <ion-custom-body class="justify-center">
        <div class="logo-box text-center flex justify-center items-center mb-3">
            <div class="w-32 text-2xl font-bold border-b">
              Log-In
            </div>
        </div>
        <form @submit.prevent="checkAndLogin" class="mx-4">
          <div class="inputOutLine pb-3 pt-2 rounded-xl px-4 mx-2">
            <ion-item color="light" class="f_item">
              <ion-label position="floating">ID</ion-label>
              <ion-input v-model="loginFormState.loginId" maxlength="20" placeholder="ID를 입력해주세요."></ion-input>
            </ion-item>
            <ion-item color="light" class="s_item">
              <ion-label position="floating">PW</ion-label>
              <ion-input v-model="loginFormState.loginPw" maxlength="20" type="password" placeholder="PW를 입력해주세요."></ion-input>
            </ion-item>
          </div>
          <div class="pt-2 px-4">
            <ion-button type="submit" color="light" expand="block">
              <span class="font-semibold">
                로그인
              </span>
            </ion-button>
          </div>
          <div class="px-4 mb-4">
            <ion-button color="medium" @click="historyBack" type="button" expand="block">
              취소
            </ion-button>
          </div>
          <div class="pt-2 px-4 text-sm">
            아직 회원이 아니신가요? <ion-custom-link to="/member/signupMain">회원가입</ion-custom-link>
          </div>
          <div class="px-4 text-sm">
            ID/PW를 잊어버리셨다면? <ion-custom-link to="/client/findLoginId">ID찾기</ion-custom-link> / <ion-custom-link to="/client/findLoginPw">PW찾기</ion-custom-link>
          </div>
        </form>
      </ion-custom-body>
  </ion-base-layout>
</template>

<style>
.inputOutLine{
  background-color: #f4f5f8;
}

</style>

<script lang="ts">
import { IonCustomBody, IonCustomLink} from '@/components/';
import { 
  IonLabel, 
  IonInput, 
  IonItem, 
  IonButton,
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { reactive, onMounted, defineComponent } from 'vue';
//import { useMainApi } from '@/apis';  //mainService를 통해 mainAPI를 가져오는 방식으로 변경
import { useMainService } from '@/services';
import { useRoute, useRouter } from 'vue-router';
import * as util from '@/utils';

const useLoginFormState = () => {
  return reactive({
    loginId: '',
    loginPw: '',
  })
}

export default defineComponent ({
  name: 'Login',
  components: { 
    IonLabel, 
    IonInput, 
    IonItem,
    IonButton,
    IonCustomBody, 
    IonCustomLink 
},
  
  
  setup() {
    const globalState = useGlobalState();
    const loginFormState = useLoginFormState();
    const router = useRouter();
    const route = useRoute();
    //const mainApi = useMainApi();  //mainService를 통해 mainAPI를 가져오는 방식으로 변경
    const mainService = useMainService();

    onMounted(() => {
      // 만약, route로 들어온 쿼리의 loginId가 null이 아니면
      if ( route.query.loginId != null ) {

        // loginIdElRef 값에 route.query.loginId 정보 담기
        loginFormState.loginId = route.query.loginId as any;

      }
    })

    //await??
    //비동기식 로직을 동기식으로 바꿔주는 함수?
    //await을 쓰기 위해선 await이 달린 함수를 감싸고 있는 부모 함수에 async를 붙여줘야 함
    //기존 then()방식과 과정상 큰 차이는 없지만 아직 then의 개념은 익숙치 않아 await 방식으로 변경
    
    async function login(loginId: string, loginPw: string) {

      //21.04.28 PW sha256 암호화
      const crypto = require('crypto');
      const password = loginPw;
      const secret = 'MySecretKey1$1$234';
      loginPw = crypto.createHmac('sha256', secret).update(password).digest('hex');
      
      const axiosResponse = await mainService.client_authKey(loginId, loginPw)

      util.showAlert(axiosResponse.data.msg);
      if ( axiosResponse.data.fail ) {
        return;
      }
      const authKey = axiosResponse.data.body.authKey;
      const memberType = 'client' as string;
      const memberId = axiosResponse.data.body.client.id;
      const loginedClient = axiosResponse.data.body.client;
      globalState.setLoginedClient(authKey, memberType, memberId, loginedClient);
      
      router.replace('/order/main');
    }

    function checkAndLogin() {
      if ( loginFormState.loginId.trim().length == 0 ) {
        util.showAlert('아이디를 입력해주세요.');
        return;
      }
      if ( loginFormState.loginPw.trim().length == 0 ) {
        util.showAlert('비밀번호를 입력해주세요.');
        return;
      }
      login(loginFormState.loginId, loginFormState.loginPw);
    }

    function historyBack(){
      router.go(-1)
    }

    return {
      globalState,
      loginFormState,
      checkAndLogin,
      historyBack
    }
  }
})
</script> 