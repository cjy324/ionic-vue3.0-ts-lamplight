<template>


  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-menu-button auto-hide="false"></ion-menu-button>
    </ion-buttons>
    <ion-buttons slot="primary">
      <ion-button>
        <ion-icon slot="icon-only" :icon="personCircle"></ion-icon>
      </ion-button>
    </ion-buttons>
    <ion-title slot="secondary">Lamplight</ion-title>
  </ion-toolbar>



  
</template>

<style>
</style>

<script lang="ts">
import {  } from '@/components/';
import { 
  IonButton, 
  IonButtons, 
  IonIcon,
  IonTitle, 
  IonToolbar

} from '@ionic/vue';
import { 
  ellipsisHorizontal,
  ellipsisVertical, 
  helpCircle, 
  personCircle, 
  search, 
  star
} from 'ionicons/icons';
import { useGlobalState } from '@/stores'

export default  {
  name: 'Main',
  
  components: { 
    IonButton, 
  IonButtons, 
  IonIcon,
  IonTitle, 
  IonToolbar
  },
  
  setup() {


    return {
      ellipsisHorizontal,
      ellipsisVertical, 
      helpCircle, 
      personCircle, 
      search, 
      star
    }
  }
}
</script>