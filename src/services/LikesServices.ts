import { ApiNames } from "../constants/ApiNames";
import { SignalsEnums } from "../constants/AppEnums";
import { getRequest } from "./ReactQueryRequests";

export const useGetSentSignals = (direction: SignalsEnums) => {
  const response = getRequest(
    `${process.env.EXPO_PUBLIC_API_VERSION}/users/${ApiNames.signals.sentSignals}?direction=${direction}`,
  );
  return response;
};

export const useGetRecSignals = (direction: SignalsEnums) => {
  const response = getRequest(
    `${process.env.EXPO_PUBLIC_API_VERSION}/users/${ApiNames.signals.receivedSignals}?direction=${direction}`,
  );
  return response;
};
