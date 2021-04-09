import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
/* tailwind css 불러오기 */
import './index.css';

/* FontAwesome 불러오기 */
import { library } from '@fortawesome/fontawesome-svg-core'
//원하는 아이콘이 있을때마다 불러오고 library에 추가해야 함...
import { 
  faHome,
  faUserCircle, 
  faUser,
  faUsers, 
  faList, 
  faCheck, 
  faCog, 
  faPlus, 
  faRedoAlt, 
  faClipboardCheck, 
  faClipboardList,
  faEdit,
  faUserTie,
  faSignInAlt,
  faSignOutAlt,
  faUserEdit,
  faUserCog,
  faBan,   
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faHome,
  faUserCircle, 
  faUser,
  faUsers,  
  faList, 
  faCheck, 
  faCog, 
  faPlus, 
  faRedoAlt, 
  faClipboardCheck, 
  faClipboardList,
  faEdit,
  faUserTie,
  faSignInAlt,
  faSignOutAlt,
  faUserEdit,
  faUserCog,
  faBan,   
);

// 전역상태 불러오기
import { createGlobalState, globalStateSymbol } from "@/stores"
import { createMainApi, mainApiSymbol } from "@/apis"
import { createMainService, mainServiceSymbol } from "@/services"

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon) //FontAwesome component 추가
  .provide(globalStateSymbol, createGlobalState())//provide(A, B) : B를 A라는 이름으로 등록하는 함수
  .provide(mainApiSymbol, createMainApi())
  .provide(mainServiceSymbol, createMainService())
  

  
router.isReady().then(() => {
  app.mount('#app');
});