<template>
  <ion-page>
    <ion-content>
      <ion-tabs class="ion-tabs">
        <ion-tab-bar slot="bottom" class="" color="dark">
          <!--홈-->
          <ion-tab-button tab="Home" href="/Home">
            <font-awesome-icon class="text-lg text-white h-7" icon="home" />
          </ion-tab-button>

          <!--회원-->
          <ion-tab-button tab="Member" href="/Member">
            <font-awesome-icon class="text-lg text-white h-7" icon="user-circle" />
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
            <font-awesome-icon class="text-lg text-white h-7" icon="users" />
          </ion-tab-button>

          <!--설정-->
          <ion-tab-button tab="Info" href="/Info">
            <font-awesome-icon class="text-lg text-white h-7" icon="ellipsis-h" />
          </ion-tab-button>
        
        </ion-tab-bar>
      </ion-tabs>
      <!--의뢰 fab버튼-->
      <ion-fab vertical="bottom" horizontal="center">
        
        <!-- 뱃지아이콘 -->
        <div v-if="globalState.isLogined">
          <ion-badge v-if="totalCount > 0" class="badge_totalCount" color="danger">
            {{totalCount}}
          </ion-badge>
        </div>
        <!-- @click="resetEvent(state.memberType, state.memberId)" -->
        <ion-fab-button>
          <font-awesome-icon class="text-xl h-7 text-white" icon="clipboard-check" />          
        </ion-fab-button>
        <ion-fab-list side="top">
          <!-- 내 의뢰 현황 메뉴 -->
          <ion-fab-button class="fab_button" href="/order/list" @click="setOpen(true), resetMyEvent(state.memberType, state.memberId)" color="light" >
            <!-- 뱃지아이콘 -->
            <div>
              <ion-badge v-if="state.myListCount > 0" class="badge_menuCount" color="danger">
                {{state.myListCount}}
              </ion-badge>
            </div>
            <ion-loading
              :is-open="isOpenRef"
              message="로딩중..."
              :duration="timeout"
              @onDidDismiss="setOpen(false)"
              spinner="dots"
            />
            <font-awesome-icon class="text-xl text-gray-700" icon="clipboard-list" />
          </ion-fab-button>
           <!-- 새 의뢰 요청 추가 메뉴 -->
          <ion-fab-button class="fab_button" v-if="globalState.memberType == 'client'" href="/order/add" color="light">
            <ion-icon class="createOutline" :icon="createOutline" />
          </ion-fab-button>
          <!-- 지역 의뢰 요청 현황 메뉴 -->
          <ion-fab-button class="fab_button" v-if="globalState.memberType == 'expert'" @click="setOpen(true), resetRegionEvent(state.memberType, state.memberId)" href="/order/allList" color="light">
            <!-- 뱃지아이콘 -->
            <div>
              <ion-badge v-if="state.regionListCount > 0" class="badge_menuCount" color="danger">
                {{state.regionListCount}}
              </ion-badge>
            </div>
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
ion-content{
  position: relative;
}
ion-fab{
  position: absolute;
  bottom:5px;
}

/* 뱃지관련 */
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

.searchCircleOutline{
  font-size: 26px;
}

.badge_menuCount{
  position: absolute;
  right: 15%;
  top: 10%;
  z-index: 500;
}


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
  IonBadge, 
} from '@ionic/vue';
import {
  createOutline,
  searchCircleOutline,
} from 'ionicons/icons';
import { useGlobalState } from '@/stores';
import { useMainService } from '@/services';
import { defineComponent, ref, reactive, onMounted, computed } from 'vue';

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
    IonBadge,
  },
  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();

    //로딩 관련
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => isOpenRef.value = state;



    //뱃지 관련
    const state = reactive({
      regionListCount: 0,
      myListCount: 0,
      memberType: 'member',
      memberId: 0,
    });

    if(globalState.isLogined){
      state.memberType = globalState.memberType;
      state.memberId = globalState.memberId;
    }

    //지역별 알림 뱃지 load
    async function getEventRegionListCount(memberType: string, memberId: number){
      const eventType = 'region'
      const axRes = await mainService.event_getEventCount(memberType, memberId, eventType)
      state.regionListCount = axRes.data.body.count
    }

    //내 의뢰 알림 뱃지 load
    async function getEventMyListCount(memberType: string, memberId: number){
      const eventType = 'my'
      const axRes = await mainService.event_getEventCount(memberType, memberId, eventType)
      state.myListCount = axRes.data.body.count
    }

    onMounted(() => {
      if(globalState.isLogined){
        getEventRegionListCount(state.memberType, state.memberId);
        getEventMyListCount(state.memberType, state.memberId);
      }
    });

    async function resetRegionEvent(memberType: string, memberId: number){
      const eventType = 'region'
      if(memberType == 'member' || memberId == 0){
        return
      }
      await mainService.event_resetEvent(memberType, memberId, eventType)
    }

    async function resetMyEvent(memberType: string, memberId: number){
      const eventType = 'my'
      if(memberType == 'member' || memberId == 0){
        return
      }
      await mainService.event_resetEvent(memberType, memberId, eventType)
    }

    const totalCount = computed(() => {
      return state.regionListCount + state.myListCount
    })


    return {
      globalState,
      createOutline,
      mainService,
      isOpenRef, 
      setOpen,
      searchCircleOutline,
      state,
      resetRegionEvent,
      resetMyEvent,
      totalCount
    }
  }
})
</script>
