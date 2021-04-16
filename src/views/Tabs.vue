<template>
  <ion-page>
    <ion-content>
      <ion-tabs class="ion-tabs">
        <ion-tab-bar slot="bottom" class="">
          <!--홈-->
          <ion-tab-button tab="Home" href="/Home">
            <font-awesome-icon class="text-lg h-7" icon="home" />
          </ion-tab-button>

          <!--회원-->
          <ion-tab-button tab="Member" href="/Member">
            <font-awesome-icon class="text-lg h-7" icon="user-circle" />
          </ion-tab-button>
        
          <!--none-->
          <ion-tab-button disabled>
          </ion-tab-button>

          <!-- 의뢰 -->
          <!-- <ion-tab-button tab="Order" href="/Order">
            <font-awesome-icon class="text-lg h-7" icon="clipboard-check" />
          </ion-tab-button> -->

          <!--리스트-->  
          <ion-tab-button tab="Expert" @click="setOpen(true)" href="/Expert">
            <ion-loading
              :is-open="isOpenRef"
              message="로딩중..."
              :duration="timeout"
              @onDidDismiss="setOpen(false)"
              spinner="dots"
            />
            <font-awesome-icon class="text-lg h-7" icon="users" />
          </ion-tab-button>

          <!--설정-->
          <ion-tab-button tab="Info" href="/Info">
            <font-awesome-icon class="text-lg h-7" icon="ellipsis-h" />
          </ion-tab-button>
        
        </ion-tab-bar>
      </ion-tabs>
      <!--의뢰 fab버튼-->
      <ion-fab vertical="bottom" horizontal="center" @click="resetEvent(state.memberType, state.memberId)">
        
        <!-- 뱃지아이콘
        <div v-if="globalState.isLogined && state.alertCheckStatus == 'no'">
          <ion-badge v-if="state.totalCount > 0" class="badge_totalCount" color="danger">{{state.totalCount}}</ion-badge>
        </div> -->
        
        <ion-fab-button>
          <font-awesome-icon class="text-xl h-7 text-white" icon="clipboard-check" />          
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button class="fab_button" href="/order/list" @click="setOpen(true)" color="light">
            <!-- 뱃지아이콘
            <div>
              <ion-badge v-if="state.allListCount > 0" class="badge_menuCount" color="danger">{{state.allListCount}}</ion-badge>
            </div> -->
            <ion-loading
              :is-open="isOpenRef"
              message="로딩중..."
              :duration="timeout"
              @onDidDismiss="setOpen(false)"
              spinner="dots"
            />
            <font-awesome-icon class="text-xl text-gray-700" icon="clipboard-list" />
          </ion-fab-button>
          <ion-fab-button class="fab_button" v-if="globalState.memberType == 'client'" href="/order/add" color="light">
            <ion-icon class="createOutline" :icon="createOutline" />
          </ion-fab-button>
          <ion-fab-button class="fab_button" v-if="globalState.memberType == 'expert'" @click="setOpen(true)" href="/order/allList" color="light">
            <!-- 뱃지아이콘
            <div>
              <ion-badge v-if="state.myListCount > 0" class="badge_menuCount" color="danger">{{state.myListCount}}</ion-badge>
            </div> -->
            <ion-loading
              :is-open="isOpenRef"
              message="로딩중..."
              :duration="timeout"
              @onDidDismiss="setOpen(false)"
              spinner="dots"
            />
            <ion-icon class="searchCircleOutline" :icon="searchCircleOutline" />
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<style>
ion-fab{
  position: absolute;
  bottom:5px;
}

/* 뱃지관련
ion-fab > div{
  position: relative;
}
.badge_totalCount{
  position: absolute;
  right: 0%;
  z-index: 500;
}

ion-fab-list > ion-fab-button{
  height: 50px;
  width: 50px;
}

.createOutline{

}

.searchCircleOutline{
  font-size: 26px;
}

.badge_menuCount{
  position: absolute;
  right: 15%;
  top: 10%;
  z-index: 500;
} */


</style>

<script lang="ts">
import {
  IonLoading, 
  IonPage,
  IonContent,
  IonTabBar, 
  IonTabButton,
  IonFabButton,
  IonFab,
  IonFabList,
  IonIcon,
  IonTabs,
  //IonBadge, 
} from '@ionic/vue';
import {
  createOutline,
  searchCircleOutline,
} from 'ionicons/icons';
import { useGlobalState } from '@/stores';
import { useMainService } from '@/services';
import { defineComponent, ref } from 'vue';

export default defineComponent ({
  name: 'Tabs',
  props: {
    timeout: { type: Number, default: 1000 },
  },
  components: {
    IonLoading,
    IonPage,
    IonContent, 
    IonTabs, 
    IonTabBar, 
    IonTabButton,
    IonFabButton,
    IonFab,
    IonFabList,
    IonIcon,
    //IonBadge,
  },
  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();

    //로딩 관련
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => isOpenRef.value = state;



    // //뱃지 관련(21.04.16 보류)
    // const state = reactive({
    //   totalCount: 0,
    //   allListCount: 0,
    //   myListCount: 0,
    //   alertCheckStatus: 'no',
    //   alertCheckStatus: 'no',
    //   alertCheckStatus: 'no',
    //   memberType: 'member',
    //   memberId: 0,
    // });

    // if(globalState.isLogined){
    //   state.memberType = globalState.memberType;
    //   state.memberId = globalState.memberId;
    // }

    // async function getEventTotalCount(memberType: string, memberId: number){
    //   const axRes = await mainService.event_getEventTotalCount(memberType, memberId)
    //   state.totalCount = axRes.data.body.totalCount
    // }

    // async function getEventAllListCount(memberType: string, memberId: number){
    //   const axRes = await mainService.event_getEventAllListCount(memberType, memberId)
    //   state.allListCount = axRes.data.body.allListCount
    // }

    // async function getEventMyListCount(memberType: string, memberId: number){
    //   const axRes = await mainService.event_getEventMyListCount(memberType, memberId)
    //   state.myListCount = axRes.data.body.myListCount
    // }


    // onMounted(() => {
    //   if(globalState.isLogined && state.alertCheckStatus == 'no'){
    //     getEventTotalCount(state.memberType, state.memberId);
    //   }
    // });

    // async function resetEvent(memberType: string, memberId: number){
    //   if(memberType == 'member' || memberId == 0){
    //     return
    //   }
    //   //alert(memberType + memberId)
    //   await mainService.event_resetEvent(memberType, memberId)
    //   state.alertCheckStatus = 'yes'
    // }


    return {
      globalState,
      createOutline,
      //mainService,
      //tabsState,
      //route
      isOpenRef, 
      setOpen,
      searchCircleOutline,
      // state,
      // resetEvent
    }
  }
})
</script>
