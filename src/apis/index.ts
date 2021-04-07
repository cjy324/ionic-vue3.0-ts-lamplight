import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { inject } from 'vue';
import { Client, Order, Expert, Assistant, Review, Funeral, Rating } from '@/types'

// API 원형
abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(instance: AxiosInstance) {
    this.instance = instance;

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  private _initializeRequestInterceptor() {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  }

  private _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  }

  protected _handleRequest(config: AxiosRequestConfig): AxiosRequestConfig {
    return config;
  }

  protected _handleResponse(axiosResponse: AxiosResponse): AxiosResponse {
    return axiosResponse;
  }

  protected _handleError(error: AxiosError) {
    if (error.response) {
      // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
      alert('요청을 처리하는 중에 오류가 발생하였습니다.');
    }
    else if (error.request) {
      // 요청이 이루어 졌으나 응답을 받지 못했습니다.
      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      // Node.js의 http.ClientRequest 인스턴스입니다.
      alert('서버 또는 네트워크의 상태가 좋지 않습니다.');
    }
    else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      console.log('Error', error.message);
    }

    return Promise.reject(error);
  }

  public postByForm<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    const params = new URLSearchParams();

    for ( const key in data ) {
      params.append(key, data[key]);
    }

    config =  {} as AxiosRequestConfig;

    config.headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    };

    return this.instance.post(url, params, config);
  }

  public post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.post(url, data, config);
  }

  public get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.get(url, config);
  }
}

// 응답타입1
/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
interface Base__ResponseBodyType1 {
  resultCode: string;
  msg: string;
  fail: boolean;
  success: boolean;
}


/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
export interface MainApi__client_authKey__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    authKey: string;
    client: Client;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
export interface MainApi__client_doJoin__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    id: number;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
export interface MainApi__common_genFile_doUpload__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    genFileIdsStr: string;
  };
}



/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
export interface MainApi__order_list__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    orders: Order[];
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
export interface MainApi__funeral_list__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    funerals: Funeral[];
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
export interface MainApi__funeral_myList__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    funerals: Funeral[];
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/member/doModify 의 응답 타입
export interface MainApi__funeral_asstApplyForFuneral__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    id: number;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/member/doModify 의 응답 타입
export interface MainApi__funeral_asstCancleApplyForFuneral__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    id: number;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
export interface MainApi__order_detail__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    order: Order;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/member/doJoin 의 응답 타입
export interface MainApi__client_doJoin__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    id: number;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/member/doJoin 의 응답 타입
export interface MainApi__expert_doJoin__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    id: number;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/member/doJoin 의 응답 타입
export interface MainApi__assistant_doJoin__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    id: number;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /common/genFile/doUpload 의 응답 타입
export interface MainApi__common_genFile_doUpload__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    genFileIdsStr: string;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/member/authKey 의 응답 타입
export interface MainApi__client_authKey__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    authKey: string;
    client: Client;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/member/authKey 의 응답 타입
export interface MainApi__expert_authKey__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    authKey: string;
    expert: Expert;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/member/authKey 의 응답 타입
export interface MainApi__assistant_authKey__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    authKey: string;
    assistant: Assistant;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/member/list 의 응답 타입
export interface MainApi__expert_list__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    //응답을 받기위해선 key명이 백엔드와 동일해야 함
    //또한 백엔드로부터 ResultData와 같이 json형태로 받아야 함
    //ex) return new ResultData("S-1", "성공", "members", members);
    experts: Expert[];
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/member/list 의 응답 타입
export interface MainApi__assistant_list__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    //응답을 받기위해선 key명이 백엔드와 동일해야 함
    //또한 백엔드로부터 ResultData와 같이 json형태로 받아야 함
    //ex) return new ResultData("S-1", "성공", "members", members);
    assistants: Assistant[];
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/member/detail 의 응답 타입
export interface MainApi__client_detail__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    client: Client;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/member/detail 의 응답 타입
export interface MainApi__expert_detail__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    expert: Expert;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/member/detail 의 응답 타입
export interface MainApi__assistant_detail__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    assistant: Assistant;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/member/doModify 의 응답 타입
export interface MainApi__client_doModify__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    client: Client;
    id: number;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/member/doModify 의 응답 타입
export interface MainApi__expert_doModify__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    expert: Expert;
    id: number;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/member/doModify 의 응답 타입
export interface MainApi__assistant_doModify__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    assistant: Assistant;
    id: number;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/order/doAdd 의 응답 타입
export interface MainApi__order_doAdd__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    id: number;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/order/doModify 의 응답 타입
export interface MainApi__order_doModify__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    id: number;
    order: Order;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
export interface MainApi__order_changeStepLevel__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    id: number;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
export interface MainApi__order_delete__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    id: number;
  };
}
/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/review/doAdd 의 응답 타입
export interface MainApi__review_doAdd__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    id: number;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/review/doAdd 의 응답 타입
export interface MainApi__review_doModify__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    id: number;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/review/doDelete 의 응답 타입
export interface MainApi__review_doDelete__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    id: number;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/member/list 의 응답 타입
export interface MainApi__review_list__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    reviews: Review[];
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/member/list 의 응답 타입
export interface MainApi__review_detail__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    review: Review;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/rating/doAdd 의 응답 타입
export interface MainApi__rating_doAdd__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    id: number;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/rating/doAdd 의 응답 타입
export interface MainApi__rating_getRatingRelClient__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    rating: Rating;
  };
}

/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
// /usr/rating/doAdd 의 응답 타입
export interface MainApi__rating_doModify__ResponseBody extends Base__ResponseBodyType1 {
  body: {
    id: number;
  };
}


// http://localhost:8021/usr/ 와의 통신장치
// mainService에게 넘기기 위해 export 추가
export class MainApi extends HttpClient {
  public constructor() {
    super(
      axios.create({
        baseURL:'http://localhost:8090/',
      })
    );
  }

  protected _handleRequest(config: AxiosRequestConfig) {
    config.params = {};
    config.params.authKey = localStorage.getItem("authKey");

    return config;
  }

  protected _handleResponse(axiosResponse: AxiosResponse): AxiosResponse {
    if ( ["F-A", "F-B"].includes(axiosResponse?.data?.resultCode) ) {
      alert('로그인 후 이용해주세요.');

      localStorage.removeItem("authKey");
      localStorage.removeItem("loginedClientId");
      localStorage.removeItem("loginedClientName");
      localStorage.removeItem("loginedClientProfileImgUrl");
      localStorage.removeItem("loginedAssistantId");
      localStorage.removeItem("loginedAssistantName");
      localStorage.removeItem("loginedAssistantProfileImgUrl");
      localStorage.removeItem("loginedExpertId");
      localStorage.removeItem("loginedExpertName");
      localStorage.removeItem("loginedExpertProfileImgUrl");

      location.replace('/client/login');
    }

    return axiosResponse;
  }


  public order_list(memberId: number, memberType: string) {
    return this.get<MainApi__order_list__ResponseBody>(`/usr/order/list?memberId=${memberId}&memberType=${memberType}`);
  }

  public funeral_list() {
    return this.get<MainApi__funeral_list__ResponseBody>(`/usr/funeral/list`);
  }

  public funeral_myList(memberId: number, memberType: string) {
    return this.get<MainApi__funeral_myList__ResponseBody>(`/usr/funeral/myList?memberId=${memberId}&memberType=${memberType}`);
  }

  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public funeral_asstApplyForFuneral(funeralId: number, assistantId: number) {
    return this.postByForm<MainApi__funeral_asstApplyForFuneral__ResponseBody>(
      `/usr/funeral/asstApplyForFuneral`, {
        funeralId,
        assistantId,
      }
    );
  }

  public funeral_asstCancleApplyForFuneral(funeralId: number, assistantId: number) {
    return this.get<MainApi__funeral_asstCancleApplyForFuneral__ResponseBody>(`/usr/funeral/asstCancleApplyForFuneral?funeralId=${funeralId}&assistantId=${assistantId}`);
  }

  public order_detail(id: number) {
    return this.get<MainApi__order_detail__ResponseBody>(`/usr/order/detail?id=${id}`);
  }

  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public order_doAdd(deceasedName: string, bereavedName: string, funeralHome: string, region: string, religion: string, startDate: string, endDate: string, body: string, expertId: number, clientId: number) {
    return this.postByForm<MainApi__order_doAdd__ResponseBody>(
      `/usr/order/doAdd`, {
        deceasedName,
        bereavedName,
        funeralHome,
        region,
        religion,
        startDate,
        endDate,
        body,
        expertId,
        clientId
      }
    );
  }

  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public order_doModify(id: number, deceasedName: string, bereavedName: string, funeralHome: string, region: string, religion: string, startDate: string, endDate: string, body: string, expertId: number, clientId: number) {
    return this.postByForm<MainApi__order_doModify__ResponseBody>(
      `/usr/order/doModify`, {
        id,
        deceasedName,
        bereavedName,
        funeralHome,
        region,
        religion,
        startDate,
        endDate,
        body,
        expertId,
        clientId
      }
    );
  }

  public order_changeStepLevel(id: number, stepLevel: number) {
    return this.get<MainApi__order_changeStepLevel__ResponseBody>(`/usr/order/changeStepLevel?id=${id}&stepLevel=${stepLevel}`);
  }

  public order_delete(id: number) {
    return this.get<MainApi__order_delete__ResponseBody>(`/usr/order/doDelete?id=${id}`);
  }


  
  /* Member 관련 */

  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public client_doJoin(loginId: string, loginPw: string, name: string, cellphoneNo: string, email: string, region: string, genFileIdsStr: string) {
    return this.postByForm<MainApi__client_doJoin__ResponseBody>(
      `/usr/client/doJoin`, {
        loginId,
        loginPw,
        name,
        cellphoneNo,
        email,
        region,
        genFileIdsStr
      }
    );
  }

  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public expert_doJoin(loginId: string, loginPw: string, name: string, cellphoneNo: string, email: string, region: string, license: string, career: string, genFileIdsStr: string) {
    return this.postByForm<MainApi__expert_doJoin__ResponseBody>(
      `/usr/expert/doJoin`, {
        loginId,
        loginPw,
        name,
        cellphoneNo,
        email,
        region,
        career,
        license,
        genFileIdsStr
      }
    );
  }

  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public assistant_doJoin(loginId: string, loginPw: string, name: string, cellphoneNo: string, email: string, region: string, career: string, genFileIdsStr: string) {
    return this.postByForm<MainApi__assistant_doJoin__ResponseBody>(
      `/usr/assistant/doJoin`, {
        loginId,
        loginPw,
        name,
        cellphoneNo,
        email,
        region,
        career,
        genFileIdsStr
      }
    );
  }

  public common_genFile_doUpload(profileImg: File) {
    const formData = new FormData();
    formData.append("file__client__0__common__attachment__1", profileImg);
    return this.post<MainApi__common_genFile_doUpload__ResponseBody>(
      `/common/genFile/doUpload`, formData
    );
  }

  public client_authKey(loginId: string, loginPw: string) {
    return this.postByForm<MainApi__client_authKey__ResponseBody>(
      `/usr/client/authKey`, {
        loginId,
        loginPw,
      }
    );
  }

  public expert_authKey(loginId: string, loginPw: string) {
    return this.postByForm<MainApi__expert_authKey__ResponseBody>(
      `/usr/expert/authKey`, {
        loginId,
        loginPw,
      }
    );
  }

  public assistant_authKey(loginId: string, loginPw: string) {
    return this.postByForm<MainApi__assistant_authKey__ResponseBody>(
      `/usr/assistant/authKey`, {
        loginId,
        loginPw,
      }
    );
  }

  public client_detail(id: number) {
    return this.get<MainApi__client_detail__ResponseBody>(`/usr/client/detail?id=${id}`);
  }

  public expert_detail(id: number) {
    return this.get<MainApi__expert_detail__ResponseBody>(`/usr/expert/detail?id=${id}`);
  }

  public assistant_detail(id: number) {
    return this.get<MainApi__assistant_detail__ResponseBody>(`/usr/assistant/detail?id=${id}`);
  }

  public expert_list() {
    return this.get<MainApi__expert_list__ResponseBody>(`/usr/expert/list`);
  }

  public assistant_list() {
    return this.get<MainApi__assistant_list__ResponseBody>(`/usr/assistant/list`);
  }

  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public client_doModify(id: number, loginPw: string, name: string, cellphoneNo: string, email: string, region: string, genFileIdsStr: string) {
    return this.postByForm<MainApi__client_doModify__ResponseBody>(
      `/usr/client/doModify`, {
        id,
        //loginId,
        loginPw,
        name,
        cellphoneNo,
        email,
        region,
        genFileIdsStr
      }
    );
  }

  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public expert_doModify(id: number, loginId: string, loginPw: string, name: string, cellphoneNo: string, email: string, acknowledgment_step: string, region: string, license: string, career: string, genFileIdsStr: string) {
    return this.postByForm<MainApi__expert_doModify__ResponseBody>(
      `/usr/expert/doModify`, {
        id,
        loginId,
        loginPw,
        name,
        cellphoneNo,
        email,
        acknowledgment_step,
        region,
        license,
        career,
        genFileIdsStr
      }
    );
  }

  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public assistant_doModify(id: number, loginId: string, loginPw: string, name: string, cellphoneNo: string, email: string, region: string, career: string, genFileIdsStr: string) {
    return this.postByForm<MainApi__assistant_doModify__ResponseBody>(
      `/usr/client/doModify`, {
        id,
        loginId,
        loginPw,
        name,
        cellphoneNo,
        email,
        region,
        career,
        genFileIdsStr
      }
    );
  }

  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public review_doAdd(relTypeCode: string, relId: number, body: string, clientId: number) {
    return this.postByForm<MainApi__review_doAdd__ResponseBody>(
      `/usr/review/doAdd`, {
        relTypeCode,
        relId,
        body,
        clientId,
        
      }
    );
  }


  public review_doDelete(relTypeCode: string, relId: number, id: number, clientId: number) {
    return this.get<MainApi__review_doDelete__ResponseBody>(`/usr/review/doDelete?relTypeCode=${relTypeCode}&relId=${relId}&id=${id}&clientId=${clientId}`);
  }

  public review_list(relTypeCode: string) {
    return this.get<MainApi__review_list__ResponseBody>(`/usr/review/list?relTypeCode=${relTypeCode}`);
  }

  public review_detail(id: number) {
    return this.get<MainApi__review_detail__ResponseBody>(`/usr/review/detail?id=${id}`);
  }

  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public review_doModify(id: number, body: string, clientId: number) {
    return this.postByForm<MainApi__review_doModify__ResponseBody>(
      `/usr/review/doModify`, {
        id,
        body,
        clientId,
        
      }
    );
  }
   
  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public rating_doAdd(relTypeCode: string, relId: number, point: number, clientId: number) {
    return this.postByForm<MainApi__rating_doAdd__ResponseBody>(
      `/usr/rating/doAdd`, {
        relTypeCode,
        relId,
        point,
        clientId,
        
      }
    );
  }

  public rating_getRatingRelClient(relTypeCode: string, relId: number, clientId: number) {
    return this.get<MainApi__rating_getRatingRelClient__ResponseBody>(`/usr/rating/getRatingRelClient?relTypeCode=${relTypeCode}&relId=${relId}&clientId=${clientId}`);
  }

  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public rating_doModify(relTypeCode: string, relId: number, point: number, clientId: number) {
    return this.postByForm<MainApi__rating_doModify__ResponseBody>(
      `/usr/rating/doModify`, {
        relTypeCode,
        relId,
        point,
        clientId,
        
      }
    );
  }

}

export const mainApiSymbol = Symbol('mainApiSymbol');

class Singleton {
  static mainApi: MainApi;
}

export const createMainApi = () => {
  if(Singleton.mainApi == null){
    Singleton.mainApi = new MainApi();
  }
  return Singleton.mainApi;
};

export const useMainApi = (): MainApi => inject(mainApiSymbol) as MainApi; 
export const getMainApi = createMainApi; 