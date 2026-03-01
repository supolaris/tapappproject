export interface ISignalsData {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  TapUserID: number;
  TapRecepientID: number;
  SignalDetails: ISignalDetails;
  counterparty: ICounterparty;
}

export interface ISignalDetails {
  note: string;
  action: string;
  source: string;
}

export interface ICounterparty {
  person_id: number;
  first_name: string;
  default_image: string;
  images: string[];
  about_me: string;
  interests: string[];
  education: string;
  job_title: string;
  company: string;
  school: string;
  languages: string[];
}
