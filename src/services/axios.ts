import Axios from 'axios';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useSpaceStore } from '../utils/store';
import { SpaceAxiosResponse } from './type';

const axios = Axios.create();

const reqOnFulfilled = <C extends InternalAxiosRequestConfig = InternalAxiosRequestConfig>(config: C): C | Promise<C> => {
  const { accessToken } = useSpaceStore.getState();
  return {
    ...config,
    baseURL: 'https://api.staging.virtualspace.ai',
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      ...(!accessToken ? {} : {Authorization: `Bearer ${accessToken}`}),
      ...config.headers,
    },
  };
};
const reqOnRejected = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const resOnFulfilled = (res: SpaceAxiosResponse): AxiosResponse => {
  const response = res;
  if (response.headers.token) {
    response.meta = {
      token: res.headers.token,
      refreshToken: res.headers['refresh-token'],
    };
  }
  if (response.headers['pubnub-auth']) {
    response.pubnub = {
      'auth-key': res.headers['pubnub-auth'],
    };
  }
  if (response.headers.organization_user_id) {
    response.onesignal = {
      external_user_id: res.headers.external_user_id,
      organization_user_id: res.headers.organization_user_id,
    };
  }
  return response;
};
const resOnRejected = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

axios.interceptors.request.use(reqOnFulfilled, reqOnRejected);
axios.interceptors.response.use(resOnFulfilled, resOnRejected);

export default axios;
