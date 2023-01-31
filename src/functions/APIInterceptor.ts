import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface AxiosCustomRequestConfig extends AxiosRequestConfig {
  retryCount: number;
}

const MAX_RETRY_COUNT = 2;
const instance = axios.create();

instance.interceptors.request.use(
  //요청보내기
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  //요청 받기
  (req) => {
    return req;
  },
  (error) => {
    /* const config = error.config as AxiosCustomRequestConfig;
    config.retryCount = config.retryCount ?? 0;

    const shouldRetry = config.retryCount < MAX_RETRY_COUNT;
    if (shouldRetry) {
      config.retryCount += 1;
      return instance.request(config);
    }
    return Promise.reject(error); */
    return Promise.reject(error);
  }
);

/* const requestConfig: AxiosRequestConfig = {
  //재요청시 다시 요철보낼 객체
  url: "https://randomuser.me/api",
  method: "GET",
}; */

//sinstance.request(requestConfig).then((response) => {});

export interface sendAxiosState {
  url: string;
  data: Object;
  config: Object;
  callback(response: AxiosResponse): void;
}

export const getInterceptor = async (data: sendAxiosState) => {
  return instance
    .get(data.url, data.data)
    .then((response: AxiosResponse) => {
      data.callback(response);
      console.log("GET: Data 1");
    })
    .catch((e) => {
      console.log(e);
    });
};

export const postInterceptor = async (data: sendAxiosState) => {
  return instance
    .post(data.url, data.data, data.config)
    .then((response: AxiosResponse) => {
      data.callback(response);
      console.log("POST: Data");
    })
    .catch((e) => {
      console.log(e);
    });
};
