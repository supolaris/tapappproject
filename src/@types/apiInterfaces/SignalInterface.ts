export interface ILikesSent {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  TapUserID: number;
  TapRecepientID: number;
  SignalDetails: ISignalDetails;
}

export interface ISignalDetails {
  note: string;
  action: string;
  source: string;
}
