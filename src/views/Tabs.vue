<template>
  <ion-app>
    <ion-tabs>
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
        <ion-fab vertical="center" horizontal="center" >
          <ion-fab-button tab="Order" :href="tabsState.hrefOrder">
            <font-awesome-icon class="text-lg h-7" icon="clipboard-check" />
          </ion-fab-button>
        </ion-fab>
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
  </ion-app>
</template>

<script lang="ts">
import { 
  IonTabBar, 
  IonTabButton,
  IonFabButton,
  IonFab,
  IonTabs, 
  //IonPage,
  IonApp, 
} from '@ionic/vue';
import { useGlobalState } from '@/stores';
import { reactive } from 'vue';
//import { useRoute } from 'vue-router';


export default {
  name: 'Tabs',
  components: { 
    IonTabs, 
    IonTabBar, 
    IonTabButton,
    IonFabButton,
    IonFab,
    //IonPage,
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
    }
  }
}
</script>
