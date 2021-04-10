<template>
  <ion-custom-header>정보 수정</ion-custom-header>
  <ion-custom-body class="justify-center mt-8">
    <ion-content v-if="globalState.isLogined" :fullscreen="true" >
      <form @submit.prevent="checkAndModify" class="mb-24">
        <div >
          <ion-item-divider>
            <img slot="start" class="h-32 rounded-full" :src="mainService.getClientThumbImgUrl(globalState.loginedClient.id)">
            <ion-buttons slot="end" >
              <ion-button color="medium" type="reset" size="small">
                초기화<font-awesome-icon class="text-gray-600 ml-2 mr-4" icon="redo-alt"/>
              </ion-button>
            </ion-buttons>
          </ion-item-divider>
          
          <ion-item>
            <ion-label position="stacked">프로필 이미지</ion-label>
            <input class="mt-3" ref="profileImgElRef" type="file">
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="stacked">아이디(변경불가)</ion-label>
            <ion-input readonly>{{state.client.loginId}}</ion-input>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="stacked">비밀번호</ion-label>
            <ion-input v-model="modifyFormState.loginPw" minlength="8" type="password" placeholder="비밀번호를 입력해주세요."></ion-input>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="stacked">비밀번호 확인</ion-label>
            <ion-input v-model="modifyFormState.loginPwConfirm" minlength="8" type="password" placeholder="비밀번호 확인을 해주세요."></ion-input>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="stacked">이름</ion-label>
            <ion-input v-model="modifyFormState.name" minlength="2" :placeholder="state.client.name"></ion-input>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="stacked">연락처</ion-label>
            <ion-input v-model="modifyFormState.cellphoneNo" type="tel" maxlength="13" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" :placeholder="state.client.cellphoneNo"></ion-input>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="stacked">이메일</ion-label>
            <ion-input v-model="modifyFormState.email" type="email" :placeholder="state.client.email"></ion-input>
          </ion-item>
        </div>
        <div>
          <ion-item>
            <ion-label position="stacked">지역</ion-label>
            <ion-input v-model="modifyFormState.region" :placeholder="state.client.region"></ion-input>
          </ion-item>
        </div>
        <ion-list>
          <div class="mb-2 px-4">
            <ion-button class="btn-success" type="submit" size="default" expand="block">완료</ion-button>
          </div>
          <div class="px-4">
            <ion-button class="btn-cancel" :href="'/client/myPage?id=' + globalState.loginedClient.id" color="" type="button" expand="block">취소</ion-button>
          </div>
        </ion-list>
      </form>
    </ion-content>
    <div v-else class="py-2 px-4">
      로그인 후 이용가능합니다. <ion-custom-link to="/client/login">Log-In</ion-custom-link> 하러 가기
    </div>
  </ion-custom-body>
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
  //IonPage, 
  //IonHeader, 
  //IonToolbar, 
  //IonTitle,
  IonList,
  IonContent,
  IonLabel, 
  IonInput,
  IonItemDivider, 
  IonItem, 
  IonButton,
  IonButtons, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { useRouter } from 'vue-router';
import * as util from '@/utils';
import { reactive, onMounted, ref } from 'vue';
import { Client } from '@/types';


const useModifyFormState = () => {
  return reactive({
    //profileImg: [] as File[],
    //loginId: '',
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
    //IonHeader, 
    //IonToolbar, 
    //IonTitle,
    IonLabel, 
    IonInput,
    IonList,
    IonItemDivider,  
    IonItem, 
    IonButton,
    IonButtons,  
    IonContent, 
    //IonPage, 
    IonCustomBody, 
    IonCustomHeader,
    IonCustomLink, 
  },

  setup() {
    const globalState = useGlobalState();
    const modifyFormState = useModifyFormState();
    const router = useRouter();
    const mainService = useMainService();

    const profileImgElRef = ref<HTMLInputElement>();

    const state = reactive({
      client: {} as Client
    });

    const id = globalState.loginedClient.id;

    async function loadClient(id: number) {
      const axRes = await mainService.client_detail(id)
      state.client = axRes.data.body.client;
    }
    onMounted(() => {
      loadClient(id);
    });


    function checkAndModify() {

      // 아이디 체크
      // let loginId = modifyFormState.loginId.trim();
      
      // if ( modifyFormState.loginId.trim().length == 0 ) {
      //   // alert('아이디를 입력해주세요.');
      //   // return;
      //   loginId = state.client.loginId;
      // }

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
      let name = modifyFormState.name.trim();

      if ( name.length == 0 ) {
        // alert('이름을 입력해주세요.');
        // return;
        name = state.client.name;
      }
      
      // 전화번호 체크
      let cellphoneNo = modifyFormState.cellphoneNo.trim();
      
      if ( cellphoneNo.length == 0 ) {
        // alert('연락처를 입력해주세요.');
        // return;
        cellphoneNo = state.client.cellphoneNo;
      }

      // 이메일 체크
      let email = modifyFormState.email.trim();
      
      if ( email.length == 0 ) {
        // alert('이메일을 입력해주세요.');
        // return;
        email = state.client.email;
      }

      // 시/도 주소 체크
      let region = modifyFormState.region.trim();
      
      if ( region.length == 0 ) {
        // alert('지역을 입력해주세요.');
        // return;
        region = state.client.region;
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

      async function modify(id: number, loginPw: string, name: string, cellphoneNo: string, email: string, region: string, genFileIdsStr: string) {
        const axRes = await  mainService.client_doModify(id, loginPw, name, cellphoneNo, email, region, genFileIdsStr);
  
          util.showAlert(axRes.data.msg);
        
          if ( axRes.data.fail ) {
            return;
          }

          router.replace('/client/myPage?id=' + id)
      }

      const startModify = (genFileIdsStr: string) =>{
          modify(id, loginPw, name, cellphoneNo, email, region,  genFileIdsStr);
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

    

    return {
      globalState,
      mainService,
      state,
      profileImgElRef,
      //confirmAlert,
      modifyFormState,
      checkAndModify,
      
    }
  }
}
</script>