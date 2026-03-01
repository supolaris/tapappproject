export type Nullable<T> = T | null;

// allowed values

export interface IAllowedValues {
  title: string;
  data: IAllowedValuesSubSection[];
}

export interface IAllowedValuesSubSection {
  data: string[];
  subTitle: string;
}

// geo location

export interface IGeoLocationResponse {
  geonames: IGeoNames[];
}

export interface IGeoNames {
  adminCode1: string;
  lng: string;
  distance: string;
  geonameId: number;
  toponymName: string;
  countryId: string;
  fcl: string;
  population: number;
  countryCode: string;
  name: string;
  fclName: string;
  adminCodes1: IAdminCodes1;
  countryName: string;
  fcodeName: string;
  adminName1: string;
  lat: string;
  fcode: string;
}

interface IAdminCodes1 {
  ISO3166_2: string;
}

// location
export interface ICurlLocation {
  TapProfilelng: number;
  TapProfilelat: number;
  tap_profile_id: number;
  TapProfileAreaName: string;
  TapProfileCityName: string;
  TapProfileCountryName: string;
  TapProfileCountryCode: string;
}

// user data

export interface ICurrentUser {
  User: IUser;
  UserInfo: IUserInfo;
  UserRoles: IUserRoles;
  UserInfoComplete: boolean;
}

export interface IUser extends ICreatedUpdatesAt {
  ID: number;
  DeletedAt: Nullable<string>;
  Login: string;
  UserFirstName: string;
  UserLastName: string;
  UserExternalID: string;
  UserExternalSystem: string;
  PersonID: number;
  UserExternalPicURL: string;
  LastLogin: string;
  LastLoginCountry: string;
  LastLoginCity: string;
  LastLoginIP: string;
}

export interface IUserInfo extends ICreatedUpdatesAt {
  ID: number;
  DeletedAt: Nullable<string>;
  Name: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Gender: string;
  DOB: string;
  Language: string;
  // Country: string;
  TimeZone: string;
  Addresses: Nullable<IAddresses[]>;
  ContactInfo: null;
  UserInfoID: number;
  profile_type: string;
  HeightFeet: number;
  HeightInches: number;
  profilePicture: string;
}

export interface IAddresses {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: Nullable<string>;
  AddressLine1: string;
  AddressLine2: string;
  City: string;
  State: string;
  PostCode: string;
  Country: string;
  AddressFlags: string;
  PersonID: number;
}

export interface IUserRoles {
  UserRoleList: any; //updateRequired
  LastGranted: string;
}

export interface ICreatedUpdatesAt {
  CreatedAt: string;
  UpdatedAt: string;
}

export interface IMyImagesData {
  image: string;
}
