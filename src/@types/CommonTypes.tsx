import {ImageSourcePropType} from 'react-native';
import {ItemsData} from '../constants/StaticData';
import {InteractionsEnums} from '../constants/AppEnums';

export type ItemsDataType = keyof typeof ItemsData;

export interface ICountriesData {
  name: string;
  code: string;
}

export interface IHomeUserData {
  id: number;
  name: string;
  age: string;
  locationDistance: string;
  picture: ImageSourcePropType;
}

export interface IFormValues {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  DOB: string;
  Country: string;
  // Email: string;
  Gender: string;
  // Cell: string;
  BillingAddress1: string;
  BillingAddress2: string;
  BillingCity: string;
  BillingState: string;
  BillingPincode: string;
  // ProfilePicLink: string;
  HeightFeet?: number;
  HeightInches?: number;
}

export interface IHeightAgeVal {
  HeightFeet: number;
  HeightInches: number;
  Gender: string;
}

export interface ILikesSentReceiveData {
  id: number;
  hoursLeft: number;
  image: ImageSourcePropType;
  interaction: InteractionsEnums;
}
