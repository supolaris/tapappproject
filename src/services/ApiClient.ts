import auth from "@react-native-firebase/auth";
import axios from "axios";
import { requestTimeout } from "../constants/AppConstants";
import { AppMessages } from "../constants/AppMessages";
import { clearLogoutData, simpleToast } from "../utils/CommonFunctions";

let isInternetConnected = true;

// Token refresh queue management
let isRefreshing = false;
let failedQueue: {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Get auth token from storage or global
const getAuthToken = (): string | null => {
  const mmkvToken = MMKVStorage.getString("FirebaseToken");
  if (mmkvToken) return mmkvToken;
  if (typeof global !== "undefined" && global.token) {
    return global.token as string;
  }
  return null;
};

// Refresh Firebase auth token
const refreshAuthToken = async (): Promise<string> => {
  const currentUser = auth().currentUser;
  if (!currentUser) {
    throw new Error("No authenticated user found");
  }

  const newToken = await currentUser.getIdToken(true);

  // Update storage
  MMKVStorage.setString("FirebaseToken", newToken);

  // Update global for compatibility
  if (typeof global !== "undefined") {
    global.token = newToken;
  }

  return newToken;
};

// Handle logout on failed refresh
const handleAuthFailure = () => {
  clearLogoutData();

  // Show toast message
  simpleToast("Session expired, please log in again");

  // Note: To redirect to login screen, you would need to use navigation here
  // Since ApiClient doesn't have access to navigation, the app will handle
  // the next 401 on a user action by showing the login screen
};

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: requestTimeout,
});

apiClient.interceptors.request.use(
  (config) => {
    if (!isInternetConnected) {
      simpleToast(AppMessages.noInternet);
      return Promise.reject(new axios.Cancel("No internet"));
    }

    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request for debugging
    const fullUrl = `${config.baseURL}${config.url}`;
    console.log("\n=== API REQUEST ===");
    console.log(`Method: ${config.method?.toUpperCase()}`);
    console.log(`URL: ${fullUrl}`);
    if (config.data) {
      console.log(`Body:`, JSON.stringify(config.data, null, 2));
    }
    console.log(`Token: ${token || "No token"}`);
    console.log("====================\n");

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => {
    // Log successful response for debugging
    console.log("\n=== API RESPONSE SUCCESS ===");
    console.log(`Method: ${response.config.method?.toUpperCase()}`);
    console.log(`URL: ${response.config.url}`);
    // console.log(`Status: ${response.status}`);
    // console.log(`Data:`, JSON.stringify(response.data, null, 2));
    console.log("============================\n");
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Log error for debugging
    console.log("\n=== API RESPONSE ERROR ===");
    console.log(`Method: ${originalRequest?.method?.toUpperCase()}`);
    console.log(`URL: ${originalRequest?.url}`);
    console.log(`Status: ${error.response?.status}`);
    console.log(`Message: ${error.message}`);
    if (error.response?.data) {
      console.log(
        `Response Data:`,
        JSON.stringify(error.response.data, null, 2),
      );
    }
    console.log("===========================\n");

    if (!error.response) {
      simpleToast("Something went wrong, please try again");
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, add to queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh the token
        const newToken = await refreshAuthToken();

        // Process any queued requests with the new token
        processQueue(null, newToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Token refresh failed - clear queue and handle auth failure
        processQueue(refreshError, null);
        handleAuthFailure();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // For other 401 errors that have already been retried
    if (error.response?.status === 401 && originalRequest._retry) {
      handleAuthFailure();
    }

    return Promise.reject(error);
  },
);

export default apiClient;
