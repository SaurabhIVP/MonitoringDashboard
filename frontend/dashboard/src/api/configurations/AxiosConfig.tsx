import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
const API_URL = process.env.REACT_APP_API_BASE_URL;

// Interface to extend AxiosRequestConfig with specific headers
interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}
// Create an Axios instance with the defined base URL
export const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Request interceptor: Modify the request configuration before sending
axiosInstance.interceptors.request.use(
  (config): AdaptAxiosRequestConfig => {
    return config;
  },
  (error): any => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response): AxiosResponse => response,
  (error): Promise<any> => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(
        "Server responded with an error:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from the server");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error in request setup:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
