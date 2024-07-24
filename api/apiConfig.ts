import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Toast from 'react-native-toast-message'
import { replaceUrlParams } from '../utils';


const API_BASE_URL = 'https://finoveu.onrender.com';
// const API_BASE_URL = uri // process.env.EXPO_PUBLIC_API_URL;

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers.common['Authorization'];
  }
};

export const setLogoutHandler = (logoutHandler: () => void) => {
  // Add a response interceptor to handle 401 errors
  axiosClient.interceptors.response.use(
    response => response,
    async error => {
      if (error.response && error.response.status === 401) {
        logoutHandler();
      }
      return Promise.reject(error);
    }
  );
};

function axiosRequest(options: AxiosRequestConfig) {
  function onSuccess(response: AxiosResponse) {
    return response.data;
  }

  function onFailure(error: AxiosError<{ error: { message: string }}, any>) {
    // console.log('err', error.response?.data)
    if (error.response && error.response?.data?.error.message === 'Not authorised') {
      Toast.show({
        type: 'error',
        text1: 'Alas! Your session has expired',
        text2: 'Login again to continue'
      });
    } else {
      Toast.show({
        type: 'error',
        text1: error.response?.data?.error?.message || 'Oops Somehing went wrong'
      });
    }
    return Promise.reject(error.response?.data || error.message);
  }

  return axiosClient(options)
    .then(onSuccess)
    .catch(onFailure);
}


export const doGet = (uri: string, params?: Record<string, string>): Promise<void | AxiosResponse> => {
  const url = params ? replaceUrlParams(uri, params) : uri;
  return axiosRequest({ url, method: 'GET' })
}

export const doPost = (url: string, data: Record<string, any>, options?: any): Promise<void | AxiosResponse> => {
  return axiosRequest({ url, method: 'POST', data, ...options })
}

export const doPatch = (url: string, data: Record<string, any>, options?: any): Promise<void | AxiosResponse> => {
  return axiosRequest({ url, method: 'PATCH', data, ...options })
}

export const doPut = (url: string, data: Record<string, any>, params: Record<string, string>): Promise<void | AxiosResponse> => {
  return axiosRequest({ url: replaceUrlParams(url, params), method: 'PUT', data })
}

export const doDelete = (url: string, params: Record<string, string>): Promise<void | AxiosResponse> => {
  return axiosRequest({ url: replaceUrlParams(url, params), method: 'DELETE' })
}
