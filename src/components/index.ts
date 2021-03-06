//components 폴더에 있는 vue들을 다른 곳에서 사용할 때 
//import { IonCustomBody } from '@/components'; 이런식으로 쉽게 가져올 수 있게 index를 통해 리턴
//index.ts가 없으면
//import  IonCustomBody  from '@/components/IonCustomBody.vue';
//이런식으로 경로를 전부 적어주었어야 함

import IonBaseLayout from './IonBaseLayout.vue';
import IonCustomHeader from './IonBaseLayout.vue';
import IonCustomBody from './IonCustomBody.vue';
import IonCustomLink from './IonCustomLink.vue';
import IonCustomGridBody from './IonCustomGridBody.vue';

export {
  IonBaseLayout,
  IonCustomHeader,
  IonCustomBody,
  IonCustomLink,
  IonCustomGridBody,
}; 