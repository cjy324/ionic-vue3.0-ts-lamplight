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
            >
            </ion-loading>
            <font-awesome-icon class="text-lg h-7" icon="users" />
          </ion-tab-button>

          <!--설정-->
          <ion-tab-button tab="Info" href="/Info">
            <font-awesome-icon class="text-lg h-7" icon="ellipsis-h" />
          </ion-tab-button>
        
        </ion-tab-bar>
      </ion-tabs>
      <!--의뢰 fab버튼-->
      <ion-fab vertical="bottom" horizontal="center">
        <ion-fab-button>
          <font-awesome-icon class="text-lg h-7 text-white" icon="clipboard-check" />
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button router-link="/order/list" @click="setOpen(true)" color="light">
            <ion-loading
              :is-open="isOpenRef"
              message="로딩중..."
              :duration="timeout"
              @onDidDismiss="setOpen(false)"
              spinner="dots"
            >
            </ion-loading>
            <font-awesome-icon class="text-lg text-gray-700" icon="clipboard-list" />
          </ion-fab-button>
          <ion-fab-button router-link="/order/add" color="light">
            <ion-icon :icon="createOutline" />
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
  //IonApp, 
} from '@ionic/vue';
import {
  createOutline
} from 'ionicons/icons';
import { useGlobalState } from '@/stores';
import { defineComponent, ref } from 'vue';
//21.04.12 Tabs버그 해결로 삭제
//import { useRoute } from 'vue-router';


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
    //IonApp,
  },
  setup() {
    const globalState = useGlobalState();

    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => isOpenRef.value = state;

    //21.04.12 Tabs버그 해결로 삭제
    // const tabsState = reactive({
    //   'hrefHome':'/Home',
    //   'hrefMember':'/Member',
    //   'hrefExpert':'/Expert',
    //   'hrefOrder':'/Order',
    //   'hrefInfo':'/Info',
    // });
    // /* ionic 리다이렉트 URL로의 다중클릭으로 인한 버그를 고치기 위한 코드 - 시작 */
    // /* 버그가 해결되면 없애도 됩니다. */
    // const route = useRoute();
    // if ( route.path.startsWith("/Home") ) {
    //   tabsState.hrefHome = route.fullPath;
    // }
    // else if ( route.path.startsWith("/Member") ) {
    //   tabsState.hrefMember = route.fullPath;
    // }
    // else if ( route.path.startsWith("/Expert") ) {
    //   tabsState.hrefExpert = route.fullPath;
    // }
    // else if ( route.path.startsWith("/Order") ) {
    //   tabsState.hrefOrder = route.fullPath;
    // }
    // else if ( route.path.startsWith("/Info") ) {
    //   tabsState.hrefInfo = route.fullPath;
    // }
    // /* ionic 리다이렉트 URL로의 다중클릭으로 인한 버그를 고치기 위한 코드 - 끝 */

    return {
      globalState,
      //tabsState,
      createOutline,
      //route
      isOpenRef, 
      setOpen,
    }
  }
})
</script>
