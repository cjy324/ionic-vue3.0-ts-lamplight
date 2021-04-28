<template>
  <ion-base-layout pageTitle="내 정보 수정" >

    <ion-buttons>
      <ion-button color="dark" @click="historyBack">
        <font-awesome-icon class="text-2xl mt-3" icon="arrow-left"/>
      </ion-button>
    </ion-buttons>

    <ion-list v-if="globalState.isLogined">
      <form @submit.prevent="checkAndModify" >
        <ion-item-divider class="dark-back bg-white pt-4">
          <img slot="start" class="h-32 w-32 rounded-full" :src="mainService.getExpertThumbImgUrl(globalState.loginedExpert.id)" @error="this.onerror=null;replaceByDefault($event)">
        </ion-item-divider>
          
        <ion-item>
          <ion-label position="stacked">프로필 이미지</ion-label>
          <input class="mt-3" ref="profileImgElRef" type="file">
        </ion-item>

        <ion-item>
          <ion-label position="stacked">아이디(변경불가)</ion-label>
          <ion-input readonly>{{state.expert.loginId}}</ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">비밀번호</ion-label>
          <ion-input v-model="modifyFormState.loginPw" minlength="8" type="password" placeholder="비밀번호를 입력해주세요."></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">비밀번호 확인</ion-label>
          <ion-input v-model="modifyFormState.loginPwConfirm" minlength="8" type="password" placeholder="비밀번호 확인을 해주세요."></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">이름</ion-label>
          <ion-input v-model="modifyFormState.name" minlength="2" :placeholder="state.expert.name"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">연락처</ion-label>
          <ion-input v-model="modifyFormState.cellphoneNo" type="tel" maxlength="13" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" :placeholder="state.expert.cellphoneNo"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">이메일</ion-label>
          <ion-input v-model="modifyFormState.email" type="email" :placeholder="state.expert.email"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">지역</ion-label>
          <ion-select v-model="modifyFormState.region" :placeholder="state.expert.region">>
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
          <ion-label position="stacked">자격증</ion-label>
          <ion-input readonly>{{state.expert.license}}</ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">경력</ion-label>
          <input class="mt-3" v-model="modifyFormState.career" type="text"  :placeholder="state.expert.career">
        </ion-item>

        <div class="pt-4 mb-2 px-4">
          <ion-button color="light" type="submit" size="default" expand="block">완료</ion-button>
        </div>
        <div class="px-4 mb-4">
          <ion-button color="medium" @click="historyBack" type="button" expand="block">
            취소
          </ion-button>
        </div>
      </form>
      <div class="px-4 mb-4">
        <ion-button @click="checkSecession" class="btn-cancel" color="warning" type="button" expand="block">
          회원탈퇴
        </ion-button>
      </div>

    </ion-list>
    <div v-else class="py-2 px-4">
      로그인 후 이용가능합니다. <ion-custom-link to="/expert/login">로그인</ion-custom-link> 하러 가기
    </div>
  </ion-base-layout>
</template>

<style>
.btn-success{
  --background:var(--ion-color-success-shade)
}
.btn-cancel{
  --background:var(--ion-color-medium-shade)
}
@media (prefers-color-scheme: dark) {
    .dark {
        color: white;
    }
    .dark-b{
      border-color: white;
    }
    .dark-back{
      background-color: black;
    }
}

</style>

<script lang="ts">
import { IonCustomLink } from '@/components/';
import { 
  IonList,
  IonLabel, 
  IonInput,
  IonSelect,
  IonSelectOption,
  IonItemDivider, 
  IonItem, 
  IonButton,
  IonButtons, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { useRouter } from 'vue-router';
import * as util from '@/utils';
import { reactive, onMounted, ref, defineComponent } from 'vue';
import { Expert } from '@/types';


const useModifyFormState = () => {
  return reactive({
    loginPw: '',
    loginPwConfirm: '',
    name: '',
    cellphoneNo: '',
    email: '',
    region: '',
    career: '',
  })
}

export default defineComponent ({
  name: 'Modify',

  components: { 

    IonLabel, 
    IonInput,
    IonSelect,
    IonSelectOption,
    IonList,
    IonItemDivider,  
    IonItem, 
    IonButton,
    IonButtons,  
    IonCustomLink, 
  },

  setup() {
    const globalState = useGlobalState();
    const modifyFormState = useModifyFormState();
    const router = useRouter();
    const mainService = useMainService();

    const profileImgElRef = ref<HTMLInputElement>();

    //기본이미지
    function replaceByDefault(e: any) {
      e.target.src = 'https://via.placeholder.com/500x500?text=NoImage'
    }

    const state = reactive({
      expert: {} as Expert
    });

    const id = globalState.loginedExpert.id;

    async function loadExpert(id: number) {
      const axRes = await mainService.expert_detail(id)
      state.expert = axRes.data.body.expert;
    }
    onMounted(() => {
      loadExpert(id);
    });


    function checkAndModify() {

      // 비번 체크
      const loginPw = modifyFormState.loginPw.trim();
      
      if ( loginPw.length == 0 ) {
        util.showAlert('비밀번호를 입력해주세요.');
        return;
      }
      
      // 비번확인 체크
      const loginPwConfirm = modifyFormState.loginPwConfirm.trim();
      
      if ( loginPw != loginPwConfirm ) {
        util.showAlert('비밀번호가 일치하지 않습니다.');
        return;
      }

      // 이름 체크
      let name = modifyFormState.name.trim();

      if ( name.length == 0 ) {
        // util.showAlert('이름을 입력해주세요.');
        // return;
        name = state.expert.name;
      }
      
      // 전화번호 체크
      let cellphoneNo = modifyFormState.cellphoneNo.trim();
      
      if ( cellphoneNo.length == 0 ) {
        // util.showAlert('연락처를 입력해주세요.');
        // return;
        cellphoneNo = state.expert.cellphoneNo;
      }

      // 이메일 체크
      let email = modifyFormState.email.trim();
      
      if ( email.length == 0 ) {
        // util.showAlert('이메일을 입력해주세요.');
        // return;
        email = state.expert.email;
      }

      // 시/도 주소 체크
      let region = modifyFormState.region.trim();
      
      if ( region.length == 0 ) {
        // util.showAlert('지역을 입력해주세요.');
        // return;
        region = state.expert.region;
      }

      // 경력 체크
      let career = modifyFormState.career.trim();
      
      if ( career.length == 0 ) {
        // util.showAlert('지역을 입력해주세요.');
        // return;
        career = state.expert.career;
      }

      async function startFileUpload(onSuccess: Function){
        // ! => 반전
        // a = undefinded(or null) / !a = true / !!a = flase란 의미
        // ? => 만약 profileImgElRef.value?까지가 null이면 여기까지만 실행하겠다라는 의미
        // 즉, !!!profileImgElRef.value?.files의 의미는 해당 파일이 없는지 물어보는 것
        // 없으면 true
        if(profileImgElRef.value?.files == undefined || profileImgElRef.value?.files[0] == null){
          onSuccess("");  //파일이 없으면 다음 과정 생략하고 onSuccess() 즉시 실행
          return;
        }

         //기존 이미지 삭제
        const memberType = 'expert';
        await mainService.common_genFile_doDelete( memberType, id, 1);
        
        const axRes = await mainService.common_genFile_doUpload(profileImgElRef.value?.files[0], memberType, 1)

        if ( axRes.data.fail ) {
          util.showAlert(axRes.data.msg);
          return;
        }
        else{
            onSuccess(axRes.data.body.genFileIdsStr);
        }
      }

      async function modify(id: number, loginPw: string, name: string, cellphoneNo: string, email: string, region: string, career: string, genFileIdsStr1: string) {
        
        //21.04.28 PW sha256 암호화
        const crypto = require('crypto');
        const password = loginPw;
        const secret = 'SecretKey2$5$984';
        loginPw = crypto.createHmac('sha256', secret).update(password).digest('hex');
        
        const axRes = await  mainService.expert_doModify(id, loginPw, name, cellphoneNo, email, region, career, genFileIdsStr1);
  
          util.showAlert(axRes.data.msg);
        
          if ( axRes.data.fail ) {
            return;
          }

          window.location.replace('/expert/myPage?id=' + id)
      }

      const startModify = (genFileIdsStr: string) =>{
          modify(id, loginPw, name, cellphoneNo, email, region, career, genFileIdsStr);
      }

      const msg = '해당 내용으로 수정하시겠습니까?'
      util.showAlertConfirm(msg).then(confirm => {
        if (confirm == false) {
          return
        } else{
          startFileUpload(startModify);
        }
      })
 
    }
    
    //회원탈퇴
    async function doSecession(id: number, memberType: string){
     
      const axRes = await mainService.member_secession(id, memberType);

      const name = axRes.data.body.name;

      //기존 이미지 삭제
      await mainService.common_genFile_doDelete( memberType, id, 1);
      await mainService.common_genFile_doDelete( memberType, id, 2);
      
      util.showAlert(name + '님 회원탈퇴 처리되었습니다.');
      
      globalState.setLogouted();

      window.location.replace('/home/main');
    }

    function checkSecession(){      

      const loginPw = modifyFormState.loginPw.trim();
      
      if ( loginPw.length == 0 ) {
        util.showAlert('비밀번호를 입력해주세요.');
        return;
      }
      
      // 비번확인 체크
      const loginPwConfirm = modifyFormState.loginPwConfirm.trim();
      
      if ( loginPw != loginPwConfirm ) {
        util.showAlert('비밀번호가 일치하지 않습니다.');
        return;
      }
      
       const memberType = globalState.memberType;

      util.showAlertConfirm('정말 탈퇴 하시겠습니까?').then(confirm => {
        if (confirm == false) {
          return
        } else{
          doSecession(id, memberType);
        }
      })
    }

    function historyBack(){
      router.go(-1)
    }

  
    return {
      globalState,
      mainService,
      state,
      historyBack,
      replaceByDefault,
      profileImgElRef,
      //confirmAlert,
      modifyFormState,
      checkAndModify,
      checkSecession
      
    }
  }
})
</script>