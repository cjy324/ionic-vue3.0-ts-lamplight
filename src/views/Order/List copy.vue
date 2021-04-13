<template>
<ion-custom-header>요청 현황</ion-custom-header>
<ion-content :fullscreen="true">
  <div class="justify-center">
    <ion-list v-if="state.orders.length !== 0" class="mb-12">      
      <ion-list-header>My Order List</ion-list-header>
      <template v-bind:key="order.id" v-for="order in state.orders">
      <ion-item>
      <!--진행단계-->
        <div  class="btn-success">
          {{order.extra__clientName}}님
        </div>        
        <ion-label class="text-center">
          <ion-grid>
            <ion-row>              
              <ion-col size="10" >
                {{order.extra__clientName}}님의 의뢰
              </ion-col>              
            </ion-row>
          </ion-grid>
        </ion-label>
        <div class="flex-col">
          <ion-item-divider class="mt-2">
            <ion-button color="" slot="end" :href="'/expertOrder/detail?id=' + order.id">
              상세보기
            </ion-button>
          </ion-item-divider>                              
        </div>
      </ion-item>
    </template>
    </ion-list>
    <div v-else class="ifEmptyOeders">
      <div class="py-2 px-4 w-full text-center">
        현재 요청받은 의뢰가 없습니다.
      </div>      
    </div>
  </div>
</ion-content>
</template>

<style>
.btn-primary{
  --background:var(--ion-color-tertiary-shade)
}
</style>

<script lang="ts">
import { IonCustomHeader, IonCustomBody } from '@/components/';
import { 
  IonSelect, 
  IonSelectOption, 
  IonSearchbar, 
  IonLabel, 
  IonListHeader, 
  IonList, 
  IonItem, 
  IonContent,
  IonItemDivider,
  IonCol,
  IonRow,
  IonGrid,
  IonButton,
} from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, computed, onMounted, watch } from 'vue';
import * as util from '@/utils';
import { Order } from '@/types';

const useSearchState = () => {
  return reactive({
    searchKeyword: '',
    searchKeywordType: 'deceasedName',
    selectStepLevel: '0',
  })
}

export default  {
  name: 'List',
  
  components: {             
    IonCustomHeader,
    
    IonLabel, 
    IonListHeader, 
    IonList, 
    IonItem, 
    IonContent,
    IonItemDivider,
    IonCol,
    IonRow,
    IonGrid,
    IonButton,
  },
  
  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();
    const searchState = useSearchState();

    const state = reactive({
      orders: [] as Order[],
    });            

    async function loadOrders(memberId: number, memberType: string){
      const axRes = await mainService.expertOrder_list(memberId, memberType)
      state.orders = axRes.data.body.orders;
    }          

    let loginedMemberId = 0;
    let loginedMemberType = '';

    if(globalState.loginedClient.id != null){
        loginedMemberId = globalState.loginedClient.id
        loginedMemberType = 'expert'
    }

    // onMounted 바로 실행하는 것이 아닌 모든 것이 준비되었을때 실행됨
    onMounted(() => {

      loadOrders(loginedMemberId, loginedMemberType);
     
    });


    return {
      globalState,
      mainService,
      state,
      searchState,                  
    }
  }
}


</script> 