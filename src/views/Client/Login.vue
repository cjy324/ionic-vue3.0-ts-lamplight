<template>
  <ion-page>
    <ion-custom-header>회원 - 로그인</ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">회원 - 로그인</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-custom-body class="justify-center">
        <div class="logo-box text-center">
          <span>
            <span class="text-3xl">
              <font-awesome-icon icon="lemon" />
            </span>
            <span class="font-bold text-3xl">
              DESIGN LEMON
            </span>
          </span>
        </div>
        <form @submit.prevent="checkAndLogin">
          <div>
            <ion-item>
              <ion-label position="floating">로그인아이디</ion-label>
              <ion-input v-model="loginFormState.loginId" maxlength="20"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="floating">로그인비번</ion-label>
              <ion-input v-model="loginFormState.loginPw" maxlength="20" type="password"></ion-input>
            </ion-item>
          </div>
          <div class="py-2 px-4">
            <ion-button type="submit" expand="block">로그인</ion-button>
          </div>
          <div class="py-2 px-4">
            아직 회원이 아니신가요? <ion-custom-link to="/client/join">회원가입</ion-custom-link>
          </div>
        </form>
      </ion-custom-body>
    </ion-content>
  </ion-page>
</template>

<style>
</style>

<script lang="ts">
import { IonCustomHeader, IonCustomBody, IonCustomLink} from '@/components/';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonInput, IonItem, IonButton } from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { reactive, onMounted } from 'vue';
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

export default  {
  name: 'Login',
  components: { IonHeader, IonToolbar, IonTitle, IonLabel, IonInput, IonItem, IonButton, IonContent, IonPage, IonCustomHeader, IonCustomBody, IonCustomLink },
  
  
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
      
      const axiosResponse = await mainService.client_authKey(loginId, loginPw)

      util.showAlert(axiosResponse.data.msg);
      if ( axiosResponse.data.fail ) {
        return;
      }
      const authKey = axiosResponse.data.body.authKey;
      const memberType = 'client' as string;
      const loginedClient = axiosResponse.data.body.client;
      globalState.setLoginedClient(authKey, memberType, loginedClient);
      
      router.replace('/');
    }

    function checkAndLogin() {
      if ( loginFormState.loginId.trim().length == 0 ) {
        alert('아이디를 입력해주세요.');
        return;
      }
      if ( loginFormState.loginPw.trim().length == 0 ) {
        alert('비밀번호를 입력해주세요.');
        return;
      }
      login(loginFormState.loginId, loginFormState.loginPw);
    }

    return {
      globalState,
      loginFormState,
      checkAndLogin
    }
  }
}
</script> 