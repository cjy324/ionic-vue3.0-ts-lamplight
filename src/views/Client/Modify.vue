<template>
  <ion-page>
    <ion-custom-header>회원 - 정보 수정</ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">회원 - 정보 수정</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-custom-body class="justify-center mt-8">
        <form v-if="globalState.isLogined" @submit.prevent="checkAndModify">
          <div>
            <ion-item>
              <img v-if="globalState.loginedClient.extra__thumbImg != null" class="h-96 rounded-lg object-cover object-center" :src="'http://localhost:8090' + globalState.loginedClient.extra__thumbImg">
              <img v-if="globalState.loginedClient.extra__thumbImg == null" class="h-96 rounded-lg object-cover object-center" :src="'http://via.placeholder.com/300?text=NoImage'">
            </ion-item>
            <ion-item>
              <ion-label position="stacked">프로필 이미지</ion-label>
              <ion-input v-model="modifyFormState.profileImg" type="file"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="floating">아이디</ion-label>
              <ion-input v-model="modifyFormState.loginId" type="text" minlength="5" :placeholder="globalState.loginedClient.loginId"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="floating">비밀번호</ion-label>
              <ion-input v-model="modifyFormState.loginPw" minlength="8" type="password" placeholder="비밀번호를 입력해주세요."></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="floating">비밀번호 확인</ion-label>
              <ion-input v-model="modifyFormState.loginPwConfirm" minlength="8" type="password" placeholder="비밀번호 확인을 해주세요."></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="floating">이름</ion-label>
              <ion-input v-model="modifyFormState.name" minlength="2" :placeholder="globalState.loginedClient.name"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="floating">연락처</ion-label>
              <ion-input v-model="modifyFormState.cellphoneNo" type="tel" maxlength="11" :placeholder="globalState.loginedClient.cellphoneNo"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="floating">이메일</ion-label>
              <ion-input v-model="modifyFormState.email" type="email" :placeholder="globalState.loginedClient.email"></ion-input>
            </ion-item>
          </div>
          <div>
            <ion-item>
              <ion-label position="floating">지역</ion-label>
              <ion-input v-model="modifyFormState.region" :placeholder="globalState.loginedClient.region"></ion-input>
            </ion-item>
          </div>
          <div class="py-2 px-4">
            <ion-button type="submit" expand="block">수정</ion-button>
          </div>
          <div class="px-4">
            <ion-button color="secondary" type="reset" expand="block">초기화</ion-button>
          </div>
        </form>
      </ion-custom-body>
    </ion-content>
  </ion-page>
</template>

<style>
</style>

<script lang="ts">
import { IonCustomBody, IonCustomHeader } from '@/components/';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonLabel, 
  IonInput, 
  IonItem, 
  IonButton, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { useRouter } from 'vue-router';
import * as util from '@/utils';
import { reactive, onMounted } from 'vue';
import { Client } from '@/types';


const useModifyFormState = () => {
  return reactive({
    profileImg: [] as File[],
    loginId: '',
    loginPw: '',
    loginPwConfirm: '',
    name: '',
    cellphoneNo: '',
    email: '',
    region: '',
  })
}

export default {
  name: 'Modify',

  components: { 
    IonHeader, 
    IonToolbar, 
    IonTitle,
    IonLabel, 
    IonInput, 
    IonItem, 
    IonButton, 
    IonContent, 
    IonPage, 
    IonCustomBody, 
    IonCustomHeader 
  },

  setup() {
    const globalState = useGlobalState();
    const modifyFormState = useModifyFormState();
    const router = useRouter();
    const mainService = useMainService();

    const id = globalState.loginedClient.id;

    // function confirmAlert(){
    //   const msg = '해당 내용으로 수정하시겠습니까?'
    //   util.showAlertConfirm(msg)
    // }

    function checkAndModify() {

       // 아이디 체크
      const loginId = modifyFormState.loginId.trim();
      
      if ( modifyFormState.loginId.trim().length == 0 ) {
        alert('아이디를 입력해주세요.');
        return;
      }
      // 비번 체크
      const loginPw = modifyFormState.loginPw.trim();
      
      if ( loginPw.length == 0 ) {
        alert('비밀번호를 입력해주세요.');
        return;
      }
      
      // 비번확인 체크
      const loginPwConfirm = modifyFormState.loginPwConfirm.trim();
      
      if ( loginPw != loginPwConfirm ) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      // 이름 체크
      const name = modifyFormState.name.trim();

      if ( name.length == 0 ) {
        alert('이름을 입력해주세요.');
        return;
      }
      
      // 전화번호 체크
      const cellphoneNo = modifyFormState.cellphoneNo.trim();
      
      if ( cellphoneNo.length == 0 ) {
        alert('연락처를 입력해주세요.');
        return;
      }

      // 이메일 체크
      const email = modifyFormState.email.trim();
      
      if ( email.length == 0 ) {
        alert('이메일을 입력해주세요.');
        return;
      }

      // 시/도 주소 체크
      const region = modifyFormState.region.trim();
      
      if ( region.length == 0 ) {
        alert('지역을 입력해주세요.');
        return;
      }

      async function startFileUpload(onSuccess: Function){
        // ! => 반전
        // a = undefinded(or null) / !a = true / !!a = flase란 의미
        // ? => 만약 profileImgElRef.value?까지가 null이면 여기까지만 실행하겠다라는 의미
        // 즉, !!!profileImgElRef.value?.files의 의미는 해당 파일이 없는지 물어보는 것
        // 없으면 true
        if(modifyFormState.profileImg == null){
          onSuccess("");  //파일이 없으면 다음 과정 생략하고 onSuccess() 즉시 실행
          return;
        }
        const axRes = await mainService.common_genFile_doUpload(modifyFormState.profileImg[0])

        if ( axRes.data.fail ) {
          util.showAlert(axRes.data.msg);
          return;
        }
        else{
            onSuccess(axRes.data.body.genFileIdsStr);
        }
      }

      async function modify(id: number, loginId: string, loginPw: string, name: string, cellphoneNo: string, email: string, region: string, genFileIdsStr: string) {
        const axRes = await  mainService.client_doModify(id, loginId, loginPw, name, cellphoneNo, email, region, genFileIdsStr);
  
          util.showAlert(axRes.data.msg);
        
          if ( axRes.data.fail ) {
            return;
          }

          router.replace('/client/myPage?id=' + id)
      }

      const startModify = (genFileIdsStr: string) =>{
          modify(id, loginId, loginPw, name, cellphoneNo, email, region,  genFileIdsStr);
      }
 
      startFileUpload(startModify);
    }

    

    return {
      globalState,
      //confirmAlert,
      modifyFormState,
      checkAndModify,
      
    }
  }
}
</script>