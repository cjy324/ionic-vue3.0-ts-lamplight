<template>
  <ion-content class="ion-padding">
  </ion-content>
</template>

<script lang="ts">
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services'
import { defineComponent } from 'vue';
import { 
  IonContent,
} from '@ionic/vue';

export default defineComponent({
  name: 'IonCustomPopver',

  components: { 
    IonContent,
    
  },

  setup() {
    const globalState = useGlobalState();
    const mainService = useMainService();

    return {
      globalState,
      mainService,

    }
  }
})
</script> 