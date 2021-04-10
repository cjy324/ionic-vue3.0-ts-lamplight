<template>
  <ion-page>
  <ion-custom-header>가입</ion-custom-header>
  <ion-custom-body class="justify-center mt-6">
    <ion-content :fullscreen="true">
      <form @submit.prevent="checkAndJoin" class="mb-24">
        <div>
          <ion-item>
            <ion-label position="stacked">프로필 이미지</ion-label>
            <input class="mt-3" ref="profileImgElRef" type="file">
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="floating">ID</ion-label>
            <ion-input v-model="joinFormState.loginId" type="text" minlength="5" maxlength="12" placeholder="ID를 입력해주세요."></ion-input>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="floating">PW</ion-label>
            <ion-input v-model="joinFormState.loginPw" minlength="8" type="password" placeholder="PW를 입력해주세요."></ion-input>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="floating">PW 확인</ion-label>
            <ion-input v-model="joinFormState.loginPwConfirm" minlength="8" type="password" placeholder="PW 확인을 해주세요."></ion-input>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="floating">이름</ion-label>
            <ion-input v-model="joinFormState.name" minlength="2" placeholder="이름을 입력해주세요."></ion-input>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="floating">연락처</ion-label>
            <ion-input v-model="joinFormState.cellphoneNo" type="tel" maxlength="13" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" required placeholder="010-0000-0000"></ion-input>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="floating">이메일</ion-label>
            <ion-input v-model="joinFormState.email" type="email" placeholder="이메일을 입력해주세요."></ion-input>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="floating">지역</ion-label>
            <ion-select v-model="joinFormState.region">
              <ion-select-option value="서울특별시">서울</ion-select-option>
              <ion-select-option value="대전광역시">대전</ion-select-option>
              <ion-select-option value="인천광역시">인천</ion-select-option>
              <ion-select-option value="부산광역시">부산</ion-select-option>
            </ion-select>
          </ion-item>
        </div>
        <div class="py-1 px-4">
          <ion-button color="primary" type="submit" expand="block">가입</ion-button>
        </div>
        <div class="px-4">
          <ion-button color="secondary" type="reset" expand="block">초기화</ion-button>
        </div>
      </form>
    </ion-content>
  </ion-custom-body>
  </ion-page>
</template>

<style>
</style>

<script lang="ts">
import { IonCustomBody, IonCustomHeader } from '@/components/';
import { 
  IonPage, 
  //IonHeader, 
  //IonToolbar, 
  //IonTitle, 
  IonContent,
  IonLabel, 
  IonInput, 
  IonItem,
  IonSelect,
  IonSelectOption,
  IonButton, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { useRouter } from 'vue-router';
import * as util from '@/utils';
import { reactive, ref } from 'vue';


const useJoinFormState = () => {
  return reactive({
    //profileImg: [] as File[],
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
  name: 'Join',

  components: { 
    //IonHeader, 
  //IonToolbar, 
  //IonTitle, 
    IonLabel, 
    IonInput, 
    IonSelect,
    IonSelectOption,
    IonItem, 
    IonButton, 
    IonContent, 
    IonPage, 
    IonCustomBody, 
    IonCustomHeader 
  },

  setup() {
    const globalState = useGlobalState();
    const joinFormState = useJoinFormState();
    const router = useRouter();
    const mainService = useMainService();

    const profileImgElRef = ref<HTMLInputElement>();

    // function confirmAlert(){
    //   const msg = '해당 내용으로 가입하시겠습니까?'
    //   util.showAlertConfirm(msg)
    // }

    function checkAndJoin() {
       // 아이디 체크
      const loginId = joinFormState.loginId.trim();
      
      if ( joinFormState.loginId.trim().length == 0 ) {
        alert('아이디를 입력해주세요.');
        return;
      }
      // 비번 체크
      const loginPw = joinFormState.loginPw.trim();
      
      if ( loginPw.length == 0 ) {
        alert('비밀번호를 입력해주세요.');
        return;
      }
      
      // 비번확인 체크
      const loginPwConfirm = joinFormState.loginPwConfirm.trim();
      
      if ( loginPw != loginPwConfirm ) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      // 이름 체크
      const name = joinFormState.name.trim();

      if ( name.length == 0 ) {
        alert('이름을 입력해주세요.');
        return;
      }
      
      // 전화번호 체크
      const cellphoneNo = joinFormState.cellphoneNo.trim();
      
      if ( cellphoneNo.length == 0 ) {
        alert('연락처를 입력해주세요.');
        return;
      }

      // 이메일 체크
      const email = joinFormState.email.trim();
      
      if ( email.length == 0 ) {
        alert('이메일을 입력해주세요.');
        return;
      }

      // 시/도 주소 체크
      const region = joinFormState.region.trim();
      
      if ( region.length == 0 ) {
        alert('지역(시/도)을 입력해주세요.');
        return;
      }

      async function startFileUpload(onSuccess: Function){
        // ! => 반전
        // a = undefinded(or null) / !a = true / !!a = flase란 의미
        // ? => 만약 profileImgElRef.value?까지가 null이면 여기까지만 실행하겠다라는 의미
        // 즉, !!!profileImgElRef.value?.files의 의미는 해당 파일이 없는지 물어보는 것
        // 없으면 true
        if(profileImgElRef.value?.files == undefined || profileImgElRef.value?.files == null){
          onSuccess("");  //파일이 없으면 다음 과정 생략하고 onSuccess() 즉시 실행
          alert("파일 업로드 안됨")
          return;
        }
        const axRes = await mainService.common_genFile_doUpload(profileImgElRef.value?.files[0])

        if ( axRes.data.fail ) {
          util.showAlert(axRes.data.msg);
          return;
        }
        else{
            onSuccess(axRes.data.body.genFileIdsStr);
        }
      }

      async function join(loginId: string, loginPw: string, name: string, cellphoneNo: string, email: string, region: string, genFileIdsStr: string) {
        const axRes = await  mainService.client_doJoin(loginId, loginPw, name, cellphoneNo, email, region, genFileIdsStr);
  
          util.showAlert(axRes.data.msg);
        
          if ( axRes.data.fail ) {
            return;
          }

          router.replace('/client/login?loginId=' + loginId)
      }

      const startJoin = (genFileIdsStr: string) =>{
          join(loginId, loginPw, name, cellphoneNo, email, region,  genFileIdsStr);
      }

      const msg = '해당 내용으로 가입하시겠습니까?'
      util.showAlertConfirm(msg).then(confirm => {
        if (confirm == false) {
          return
        } else{
          startFileUpload(startJoin);
        }
      })
      
    }

    

    return {
      globalState,
      //confirmAlert,
      joinFormState,
      checkAndJoin,
      profileImgElRef,
      
    }
  }
}
</script>