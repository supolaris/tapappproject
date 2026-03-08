export interface IGeolocation {
  coords: ICoords;
  mocked: boolean;
  timestamp: number;
}

interface ICoords {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
}
