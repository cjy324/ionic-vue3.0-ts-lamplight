import { GlobalState } from '@/types'
import { reactive } from "@vue/reactivity"
import { inject, computed } from "vue"
import { Client, Expert } from "@/types";

//Symbol()
//'심볼(symbol)'은 유일한 식별자(unique identifier)를 만들고 싶을 때 사용합니다.
//자바스크립트는 객체 프로퍼티 키로 오직 문자형과 심볼형만을 허용합니다. 숫자형, 불린형 모두 불가능하고 오직 문자형과 심볼형만 가능하죠.
//Symbol()을 사용하면 심볼값을 만들 수 있습니다.
//심볼을 만들 때 심볼 이름이라 불리는 설명을 붙일 수도 있습니다.
//여기에서 심볼이릉은 'globalState'
//심볼은 유일성이 보장되는 자료형이기 때문에, 설명이 동일한 심볼을 여러 개 만들어도 각 심볼값은 다릅니다. 심볼에 붙이는 설명(심볼 이름)은 어떤 것에도 영향을 주지 않는 이름표 역할만을 합니다.
//설명 더보기 https://ko.javascript.info/symbol

export const globalStateSymbol = Symbol('globalState');

//Singleton??
//싱글톤 패턴
//애플리케이션이 시작될 때 어떤 클래스가 최초 한번만 메모리를 할당하고(Static) 그 메모리에 인스턴스를 만들어 사용하는 디자인패턴.
//=> 싱글톤 패턴은 단 하나의 인스턴스를 생성해 사용하는 디자인 패턴이다.
//(인스턴스가 필요 할 때 똑같은 인스턴스를 만들어 내는 것이 아니라, 동일(기존) 인스턴스를 사용하게함)
//싱글톤 패턴을 쓰는 이유
//고정된 메모리 영역을 얻으면서 한번의 new로 인스턴스를 사용하기 때문에 메모리 낭비를 방지할 수 있음
//싱글톤 패턴의 문제점
//싱글톤 인스턴스가 너무 많은 일을 하거나 많은 데이터를 공유시킬 경우 다른 클래스의 인스턴스들 간에 결합도가 높아져 "개방-폐쇄 원칙" 을 위배하게 된다. (=객체 지향 설계 원칙에 어긋남)
//따라서 수정이 어려워지고 테스트하기 어려워진다. 
//But, 적절히 사용하면 매우 유용하다.
//출처: https://jeong-pro.tistory.com/86 [기본기를 쌓는 정아마추어 코딩블로그]

class Singleton{
  static globalState: GlobalState;
}


//전역적으로 사용할 것들 이곳에 등록
//그리고 types에서도 자료형? 등록 필요
//전역상태를 셋팅해놓는 이유는 여러 페이지에서 사용하기 위함
export const createGlobalState = () => {
  //만약, Singleton에 globalState가 없으면 다시 생성
  if( Singleton.globalState == null){
    const globalState: any = reactive({
      // 의뢰인
      loginedClient: {
        id:0,
        regDate:"",
        updateDate:"",
        cellphoneNo:"",
        email:"",
        /* eslint-disable @typescript-eslint/camelcase */
        extra__thumbImg:"",
        loginId:"",
        name:"",
        region:"",
      },

      // 지도사
      loginedExpert: {
        id:0,
        regDate:"",
        updateDate:"",
        cellphoneNo:"",
        email:"",
        /* eslint-disable @typescript-eslint/camelcase */
        extra__thumbImg:"",
        acknowledgment_step:0,
        loginId:"",
        name:"",
        region:"",
        license:"",
        career:"",
      },

      authKey: "",
      memberType: "",
      memberId: 0,

      isLogined: computed(() => globalState.loginedClient.id != 0 || globalState.loginedExpert.id != 0),

      setLoginedClient: function(authKey: string, memberType: string, memberId: number, client: Client) {
        localStorage.setItem("authKey", authKey);
        localStorage.setItem("memberType", memberType);
        localStorage.setItem("memberId", String(memberId));

        localStorage.setItem("loginedClientJsonStr", JSON.stringify(client));

        globalState.authKey = authKey;
        globalState.memberType = memberType;
        globalState.memberId = memberId;
        globalState.loginedClient = client;
      },

      setLoginedExpert: function(authKey: string, memberType: string, memberId: number, expert: Expert) {
        localStorage.setItem("authKey", authKey);
        localStorage.setItem("memberType", memberType);
        localStorage.setItem("memberId", String(memberId));

        localStorage.setItem("loginedExpertJsonStr", JSON.stringify(expert));

        globalState.authKey = authKey;
        globalState.memberType = memberType;
        globalState.memberId = memberId;
        globalState.loginedExpert = expert;
      },

      setLogouted: function() {
        // member 공통
        globalState.authKey = "";
        globalState.memberType = "";
        globalState.memberId = 0;

        // 의뢰인
        globalState.loginedClient.id = 0;
        globalState.loginedClient.regDate = "";
        globalState.loginedClient.updateDate = "";
        globalState.loginedClient.cellphoneNo = "";
        globalState.loginedClient.email = "";
        globalState.loginedClient.extra__thumbImg = "";
        globalState.loginedClient.loginId = "";
        globalState.loginedClient.name = "";
        globalState.loginedClient.region = "";

        // 지도사
        globalState.loginedExpert.id = 0;
        globalState.loginedExpert.regDate = "";
        globalState.loginedExpert.updateDate = "";
        globalState.loginedExpert.cellphoneNo = "";
        globalState.loginedExpert.email = "";
        globalState.loginedExpert.extra__thumbImg = "";
        globalState.loginedExpert.loginId = "";
        globalState.loginedExpert.name = "";
        globalState.loginedExpert.region = "";
        globalState.loginedExpert.license = "";
        globalState.loginedExpert.career = "";
        globalState.loginedExpert.acknowledgment_step = 0;


        localStorage.removeItem("authKey");
        localStorage.removeItem("memberType");
        localStorage.removeItem("memberId");
        localStorage.removeItem("loginedClientJsonStr");
        localStorage.removeItem("loginedExpertJsonStr");
      }
    });
    const loadLoginInfoFromLocalStorage = () => {
      const authKey = localStorage.getItem("authKey");
      const memberType = localStorage.getItem("memberType");
      const memberId = localStorage.getItem("memberId");
      const loginedClientJsonStr = localStorage.getItem("loginedClientJsonStr");
      const loginedExpertJsonStr = localStorage.getItem("loginedExpertJsonStr");

      if ( !!authKey && !!memberType && !!loginedClientJsonStr ) {
        const loginedClient: Client = JSON.parse(loginedClientJsonStr);

        globalState.setLoginedClient(authKey, memberType, memberId, loginedClient);
      }

      if ( !!authKey && !!memberType && !!loginedExpertJsonStr ) {
        const loginedExpert: Expert = JSON.parse(loginedExpertJsonStr);

        globalState.setLoginedExpert(authKey, memberType, memberId, loginedExpert);
      }
    }

    // 이 함수는 브라우저를 열때(혹은 새로고침, F5키 누를 때)마다 1번씩 실행됨
    loadLoginInfoFromLocalStorage();

    Singleton.globalState = globalState;
  }
  
  return Singleton.globalState;
  
};

//useGlobalState 함수가 GlobalState 객체를 리턴한다
export const useGlobalState = (): GlobalState => inject(globalStateSymbol) as GlobalState;
//다른곳에서 createGlobalState라고 그대로 사용해도 크게 문제는 없음
//다만, 이해하기 쉽기 위해 useGlobalStateOnOutsideOfVue라고 명명해서 리턴하는 것
//그리고
//(): GlobalState => inject(globalStateSymbol) as GlobalState;와
//createGlobalState는 결국 같은 의미
export const getGlobalState = createGlobalState;