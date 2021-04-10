<template>
  <ion-app>
    <ion-content>
      <ion-tabs class="ion-tabs">
        <ion-tab-bar slot="bottom" class="">
          <!--홈-->
          <ion-tab-button tab="Home" :href="tabsState.hrefHome">
            <font-awesome-icon class="text-lg h-7" icon="home" />
          </ion-tab-button>

          <!--회원-->
          <ion-tab-button tab="Member" :href="tabsState.hrefMember">
            <font-awesome-icon class="text-lg h-7" icon="user-circle" />
          </ion-tab-button>
        
          <!--none-->
          <ion-tab-button disabled="true">
          </ion-tab-button>

          <!-- 의뢰 -->
          <!-- <ion-tab-button tab="Order" :href="tabsState.hrefOrder">
            <font-awesome-icon class="text-lg h-7" icon="clipboard-check" />
          </ion-tab-button> -->

          <!--리스트-->  
          <ion-tab-button tab="Expert" :href="tabsState.hrefExpert">
            <font-awesome-icon class="text-lg h-7" icon="users" />
          </ion-tab-button>

          <!--설정-->
          <ion-tab-button tab="Setting" :href="tabsState.hrefSetting">
            <font-awesome-icon class="text-lg h-7" icon="cog" />
          </ion-tab-button>
        
        </ion-tab-bar>
      </ion-tabs>
      <ion-fab vertical="bottom" horizontal="center">
        <ion-fab-button>
          <font-awesome-icon class="text-lg h-7" icon="clipboard-check" />
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button href="/order/list" color="light">
            <font-awesome-icon class="text-lg" icon="clipboard-list" />
          </ion-fab-button>
          <ion-fab-button href="/order/add" color="light">
            <ion-icon :icon="createOutline" />
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>
    </ion-content>
  </ion-app>
</template>

<style>
ion-fab{
  position: absolute;
  bottom:5px;
}

</style>

<script lang="ts">
import { 
  IonContent,
  IonTabBar, 
  IonTabButton,
  IonFabButton,
  IonFab,
  IonFabList,
  IonIcon,
  IonTabs,
  IonApp, 
} from '@ionic/vue';
import {
  createOutline
} from 'ionicons/icons';
import { useGlobalState } from '@/stores';
import { reactive } from 'vue';
//import { useRoute } from 'vue-router';


export default {
  name: 'Tabs',
  components: {
    IonContent, 
    IonTabs, 
    IonTabBar, 
    IonTabButton,
    IonFabButton,
    IonFab,
    IonFabList,
    IonIcon,
    IonApp,
  },
  setup() {
    const globalState = useGlobalState();

    const tabsState = reactive({
      'hrefHome':'/Home',
      'hrefMember':'/Member',
      'hrefExpert':'/Expert',
      'hrefOrder':'/Order',
      'hrefSetting':'/Setting',
    });
    /* ionic 리다이렉트 URL로의 다중클릭으로 인한 버그를 고치기 위한 코드 - 시작 */
    /* 버그가 해결되면 없애도 됩니다. */
    // const route = useRoute();
    // if ( route.path.startsWith("/Home") ) {
    //   tabsState.hrefHome = route.fullPath;
    // }
    // else if ( route.path.startsWith("/Client") ) {
    //   tabsState.hrefClient = route.fullPath;
    // }
    // else if ( route.path.startsWith("/Expert") ) {
    //   tabsState.hrefExpert = route.fullPath;
    // }
    // else if ( route.path.startsWith("/Order") ) {
    //   tabsState.hrefOrder = route.fullPath;
    // }
    // else if ( route.path.startsWith("/Setting") ) {
    //   tabsState.hrefSetting = route.fullPath;
    // }
    /* ionic 리다이렉트 URL로의 다중클릭으로 인한 버그를 고치기 위한 코드 - 끝 */

    return {
      globalState,
      tabsState,
      createOutline,
    }
  }
}
</script>
