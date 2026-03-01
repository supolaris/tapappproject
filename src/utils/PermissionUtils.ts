import {PermissionsAndroid} from 'react-native';

export const getLocationPermission = async () => {
  try {
    const hasLocationPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasLocationPermission) {
      console.log('Location permission is already granted');
      return true;
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
