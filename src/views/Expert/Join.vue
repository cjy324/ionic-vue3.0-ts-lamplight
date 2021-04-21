<template>
  <ion-base-layout pageTitle="회원가입">
    <ion-list>
      <ion-buttons>
        <ion-button color="dark" @click="historyBack">
          <font-awesome-icon class="text-2xl mt-3" icon="arrow-left"/>
        </ion-button>
      </ion-buttons>
      <form @submit.prevent="checkAndJoin" >
          <ion-item>
            <ion-label position="stacked">프로필 이미지</ion-label>
            <input class="mt-3" ref="profileImgElRef" type="file">
          </ion-item>

          <ion-item>
            <ion-label position="floating">ID</ion-label>
            <ion-input v-model="joinFormState.loginId" type="text" minlength="5" maxlength="12" placeholder="ID를 입력해주세요."></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">PW</ion-label>
            <ion-input v-model="joinFormState.loginPw" minlength="8" type="password" placeholder="PW를 입력해주세요."></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">PW 확인</ion-label>
            <ion-input v-model="joinFormState.loginPwConfirm" minlength="8" type="password" placeholder="PW 확인을 해주세요."></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">이름</ion-label>
            <ion-input v-model="joinFormState.name" minlength="2" placeholder="이름을 입력해주세요."></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">연락처</ion-label>
            <ion-input v-model="joinFormState.cellphoneNo" type="text" maxlength="13" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" required placeholder="010-0000-0000"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">이메일</ion-label>
            <ion-input v-model="joinFormState.email" type="email" placeholder="이메일을 입력해주세요."></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">지역</ion-label>
            <ion-select v-model="joinFormState.region">
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
            <ion-label position="floating">자격증</ion-label>
            <ion-input v-model="joinFormState.license" minlength="2" placeholder="ex) 장례지도사"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">지도사자격증 스캔본 첨부</ion-label>
            <input class="mt-3" ref="scanImgElRef" type="file">
          </ion-item>
          
          <ion-item>
            <ion-label position="floating">경력</ion-label>
            <ion-input v-model="joinFormState.career" type="text" placeholder="경력을 입력해주세요.(없으면 '없음')"></ion-input>
          </ion-item>

        <div class="py-1 px-4">
          <ion-button color="primary" type="submit" expand="block">가입</ion-button>
        </div>
        <div class="px-4">
          <ion-button color="light" type="reset" expand="block">초기화</ion-button>
        </div>
      </form>
    </ion-list>
  </ion-base-layout>
</template>

<style>
</style>

<script lang="ts">
import { 
  IonList,
  IonLabel, 
  IonInput, 
  IonItem,
  IonSelect,
  IonSelectOption,
  IonButtons, 
  IonButton, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { useRouter } from 'vue-router';
import * as util from '@/utils';
import { reactive, ref, defineComponent } from 'vue';


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
    license:'',
    career:'',
  })
}

export default defineComponent ({
  name: 'Join',

  components: { 
    IonList,
    IonLabel, 
    IonInput, 
    IonSelect,
    IonSelectOption,
    IonItem,
    IonButtons,  
    IonButton, 

  },

  setup() {
    const globalState = useGlobalState();
    const joinFormState = useJoinFormState();
    const router = useRouter();
    const mainService = useMainService();

    const profileImgElRef = ref<HTMLInputElement>();
    const scanImgElRef = ref<HTMLInputElement>();


    function checkAndJoin() {
       // 아이디 체크
      const loginId = joinFormState.loginId.trim();
      
      if ( joinFormState.loginId.trim().length == 0 ) {
        util.showAlert('아이디를 입력해주세요.');
        return;
      }
      // 비번 체크
      const loginPw = joinFormState.loginPw.trim();
      
      if ( loginPw.length == 0 ) {
        util.showAlert('비밀번호를 입력해주세요.');
        return;
      }
      
      // 비번확인 체크
      const loginPwConfirm = joinFormState.loginPwConfirm.trim();
      
      if ( loginPw != loginPwConfirm ) {
        util.showAlert('비밀번호가 일치하지 않습니다.');
        return;
      }

      // 이름 체크
      const name = joinFormState.name.trim();

      if ( name.length == 0 ) {
        util.showAlert('이름을 입력해주세요.');
        return;
      }
      
      // 전화번호 체크
      const cellphoneNo = joinFormState.cellphoneNo.trim();
      
      if ( cellphoneNo.length == 0 ) {
        util.showAlert('연락처를 입력해주세요.');
        return;
      }

      // 이메일 체크
      const email = joinFormState.email.trim();
      
      if ( email.length == 0 ) {
        util.showAlert('이메일을 입력해주세요.');
        return;
      }

      // 시/도 주소 체크
      const region = joinFormState.region.trim();
      
      if ( region.length == 0 ) {
        util.showAlert('지역(시/도)을 입력해주세요.');
        return;
      }

      // 자격증명 체크
      const license = joinFormState.license.trim();
      
      if ( license.length == 0 ) {
        util.showAlert("자격증명을 입력해주세요.(ex 장례지도사)");
        return;
      }

      // 증명서 첨부파일 체크
      if(scanImgElRef.value?.files == undefined || scanImgElRef.value?.files[0] == null){
        util.showAlert("자격증 스캔파일을 첨부해주세요.");
        return;
      }

      // 경력 체크
      const career = joinFormState.career.trim();
      
      if ( career.length == 0 ) {
        util.showAlert("경력을 입력해주세요.(없으면 '없음')");
        return;
      }

      async function startFileUpload1(onSuccess: Function){

        if(profileImgElRef.value?.files == undefined || profileImgElRef.value?.files[0] == null){
          //2차 업로드 진행
          onSuccess('')
          return;
        }
        
        const memberType = 'expert';

        const axRes = await mainService.common_genFile_doUpload(profileImgElRef.value?.files[0], memberType, 1)

        if ( axRes.data.fail ) {
          util.showAlert(axRes.data.msg);
          return;
        }
        else{
          onSuccess(axRes.data.body.genFileIdsStr);
          return;
        }
      }

      async function startFileUpload2(onSuccess: Function, genFileIdsStr1: string){

        if(scanImgElRef.value?.files == undefined || scanImgElRef.value?.files[0] == null){
          onSuccess(genFileIdsStr1, '')
          return;
        }

        const memberType = 'expert';

        const axRes = await mainService.common_genFile_doUpload(scanImgElRef.value?.files[0], memberType, 2)

        if ( axRes.data.fail ) {
          util.showAlert(axRes.data.msg);
          return;
        }
        else{
          onSuccess(genFileIdsStr1, axRes.data.body.genFileIdsStr);
          return;
        }
      }

      async function join(loginId: string, loginPw: string, name: string, cellphoneNo: string, email: string, region: string, license: string, career: string, genFileIdsStr1: string, genFileIdsStr2: string) {
        const axRes = await  mainService.expert_doJoin(loginId, loginPw, name, cellphoneNo, email, region, license, career, genFileIdsStr1, genFileIdsStr2);
  
          util.showAlert(axRes.data.msg);
        
          if ( axRes.data.fail ) {
            return;
          }

          router.replace('/expert/login?loginId=' + loginId)
      }

      const startJoin = (genFileIdsStr1: string, genFileIdsStr2: string) =>{
          join(loginId, loginPw, name, cellphoneNo, email, region, license, career, genFileIdsStr1, genFileIdsStr2);
      }

       const startSecondUpload = (genFileIdsStr1: string) =>{
          startFileUpload2(startJoin, genFileIdsStr1);
      }

      const msg = '해당 내용으로 가입하시겠습니까?'
      util.showAlertConfirm(msg).then(confirm => {
        if (confirm == false) {
          return
        } else{
          //startFileUpload(startJoin);
          startFileUpload1(startSecondUpload);
        }
      })
      
    }

    function historyBack(){
      router.go(-1)
    }

    
    return {
      globalState,
      historyBack,
      //confirmAlert,
      joinFormState,
      checkAndJoin,
      profileImgElRef,
      scanImgElRef,
      
    }
  }
})
</script>