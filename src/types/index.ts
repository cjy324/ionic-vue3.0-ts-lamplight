export interface GlobalState {
  loginedClient: Client;
  loginedExpert: Expert;
  loginedAssistant: Assistant;
  authKey: string;
  memberType: string;
  memberId: number;
  isLogined: boolean;
  setLoginedClient(authKey: string, memberType: string, memberId: number, client: Client): void;
  setLoginedExpert(authKey: string, memberType: string, memberId: number, expert: Expert): void;
  setLogouted(): void;
}

export interface Entity {
  id: number;
  regDate: string;
  updateDate: string;
}

export interface Order extends Entity {
	religion:string;
	startDate:string;
	endDate:string;
	deceasedName:string;
  bereavedName:string;
  funeralHome:string;
  region:string;
	body:string;
	expertId:number;
	clientId:number;
  stepLevel:number;
  extra__clientName:string;
  extra__expertName:string;
  extra__clientCellphoneNo:string;
	extra__expertCellphoneNo:string;
}

export interface Funeral extends Entity {
	religion:string;
	startDate:string;
	endDate:string;
	deceasedName:string;
  bereavedName:string;
  funeralHome:string;
  region:string;
	body:string;
	expertId:number;
	clientId:number;
  stepLevel:number;
  extra__clientName:string;
  extra__expertName:string;
  extra__assistants:[];
}


export interface Client extends Entity {  
	loginId:string;
  loginPw:string;
  authKey:string;
  name:string;
  cellphoneNo:string;
  email:string;
  region:string;
  extra__thumbImg:string;
}


export interface Expert extends Entity {
  loginId:string;
  loginPw:string;
  authKey:string;
  acknowledgment_step:string;
  name:string;
  cellphoneNo:string;
  email:string;
  region:string;
  license:string;
  career:string;
  extra__thumbImg:string;
  extra__ratingPoint:number;
  extra__reviews:[];
}

export interface Assistant extends Entity {
  loginId:string;
  loginPw:string;
  authKey:string;
  name:string;
  cellphoneNo:string;
  email:string;
  region:string;
  career:string;
  extra__thumbImg:string;
  extra__ratingPoint:number;
  extra__relFuneralId:number;
  
}

export interface Review extends Entity{
  relId:number;
  relTypeCode:string;
  body:string;
  clientId:number;
}

export interface Rating extends Entity{
  relId:number;
  relTypeCode:string;
  point:number;
  clientId:number;
  extra__clientName:string;
}