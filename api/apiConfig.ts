import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Toast from 'react-native-toast-message'


const API_BASE_URL = 'https://finoveu.onrender.com';
// const API_BASE_URL = uri // process.env.EXPO_PUBLIC_API_URL;

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers.common['Authorization'];
  }
};

function axiosRequest(options: AxiosRequestConfig) {
  function onSuccess(response: AxiosResponse) {
    return response.data;
  }

  function onFailure(error: AxiosError<{ error: { message: string }}, any>) {
    Toast.show({
      type: 'error',
      text1: error.response?.data?.error?.message || 'Oops Somehing went wrong'
    });
    return Promise.reject(error.response?.data || error.message);
  }

  return axiosClient(options)
    .then(onSuccess)
    .catch(onFailure);
}


export const doGet = (url: string): Promise<void | AxiosResponse> => {
  return axiosRequest({url, method: 'GET' })
}

export const doPost = (url: string, data: Record<string, any>, options?: any): Promise<void | AxiosResponse> => {
  return axiosRequest({ url, method: 'POST', data, ...options })
}

export const doPut = (url: string, data?: Record<string, any>): Promise<void | AxiosResponse> => {
  return axiosRequest({ url, method: 'PUT', data })
}

export const doDelete = (url: string): Promise<void | AxiosResponse> => {
  return axiosRequest({ url, method: 'DELETE' })
}
