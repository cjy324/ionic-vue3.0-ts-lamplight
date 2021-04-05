<template>
  <ion-page>
    <ion-custom-header>지도사 - 리스트</ion-custom-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">지도사 - 리스트</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-custom-body>
        <!-- Scrollable Segment -->
        <ion-segment scrollable :value="articleListState.boardId" @ionChange="changeBoardIdBySegment($event.detail.value);">
          <ion-segment-button value="1">
            공지사항
          </ion-segment-button>
          <ion-segment-button value="2">
            자유게시판
          </ion-segment-button>
        </ion-segment>

        <ion-list>
          <ion-list-header>
            {{articleListState.boardId == 1 ? '공지사항' : '자유'}} 게시물 리스트
          </ion-list-header>

          <ion-item v-for="article in articleListState.articles" :key="article.id">
            <ion-avatar slot="start">
              <img :src="mainService.getMemberThumbImgUrl(article.memberId)">
            </ion-avatar>
            <ion-label>
              <h2>{{ article.title }}</h2>
              <h2>{{ article.extra__writer }}</h2>
              <h2>{{ article.body }}</h2>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-custom-body>
    </ion-content>
  </ion-page>
</template>

<style>
</style>

<script lang="ts">
import { IonCustomBody, IonCustomHeader } from '@/components/';
import { IonLabel, IonAvatar, IonPage, IonHeader, IonToolbar, IonTitle, IonListHeader, IonList, IonItem, IonContent, IonSegment, IonSegmentButton } from '@ionic/vue';
import { useGlobalState } from '@/stores'
import { useMainService } from '@/services';
import { reactive, watch } from 'vue';
import { Article } from '@/types';
import { useRoute, useRouter } from 'vue-router';
import * as util from '@/utils';



export default  {
  name: 'List',
  
  components: { IonLabel, IonAvatar, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCustomBody, IonCustomHeader, IonSegment, IonSegmentButton, IonListHeader, IonList, IonItem },
  
  setup() {
    const route = useRoute();
    const router = useRouter();
    const globalState = useGlobalState();
    const mainService = useMainService();

    const articleListState = reactive({
      articles: ([] as Article[]),
      boardId: 0
    });

    //(1) route에 들어있는 boardId값을 가져온다(없으면 1로 치환)
    const boardIdInQuery = util.toInt(route.query.boardId, 1);

    //(3)
    async function loadArticles(boardId: number) {
      // articleListState의 boardId값을 들어온 값으로 바꿔준다.
      articleListState.boardId = boardId;

      // mainService를 통해 axiosResponse 요청하고 받는다
      const axRes = await mainService.article_list(boardId);

      // axiosResponse으로 받은 articles를 articleListState의 articles로 바꿔준다.
      articleListState.articles = axRes.data.body.articles;
    }

    //(4) 항상 route.query값을 모니터링하면서 boardId값이 바뀌면 (2),(3)번을 수행
    watch(() => route.query, () => {
      loadArticles(util.toInt(route.query.boardId, 1));
    })

    //(2) boardIdInQuery 값을 받아 loadArticles 함수 실행
    loadArticles(boardIdInQuery);


    //ion-segment-button 값의 따라 router값이 바뀜
    function changeBoardIdBySegment(boardId: number) {
      router.push('/article/list?boardId=' + boardId);
    }

    return {
      globalState,
      articleListState,
      mainService,
      changeBoardIdBySegment
    }
  }
}
</script> 