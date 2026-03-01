import { IUserProfile } from "../CommonTypes";

export interface IUserByIdData {
  first_name: string;
  age: number;
  gender: string;
  distance: number;
  default_image: string;
  profile: IUserProfile;
}
