import axios from 'axios';
import ConfigManager from '../config';
import helper from '@/utils/helper';

export default {
  install(Vue) {
    const http = axios.create({
      baseURL: ConfigManager.config.url.api,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      responseType: 'json',
      responseEncoding: 'utf8',
    });

    http.interceptors.request.use(
      config => {
        // 인증 관련 헤더 등록
        const accessToken = helper.getCookie('accessToken');
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      },
      error => {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    http.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        // 인증 관련
        if (
          error.response &&
          error.response.status &&
          error.response.status === 401 &&
          'errorCode' in error.response.data
        ) {
          let isPushLoginPage = false;

          if (error.response.data.errorCode === 1) {
            try {
              await http.post('/auth/updateAccessToken', {
                accessToken: helper.getCookie('accessToken'),
                refreshToken: helper.getCookie('refreshToken'),
              });
              const reqCofing = error.config;
              const response =
                reqCofing.method === 'get' || reqCofing.method === 'delete'
                  ? await http[reqCofing.method](reqCofing.url, {
                      params: reqCofing.params,
                    })
                  : await http[reqCofing.method](reqCofing.url, reqCofing.data);
              return response;
            } catch (e) {
              isPushLoginPage = true;
            }
          } else if (error.response.data.errorCode === 2) {
            isPushLoginPage = true;
          }
          if (isPushLoginPage) window.location.href = '/auth/login';
        }

        // 공통 오류 alert
        if (
          error.response &&
          error.response.status &&
          error.response.status === 500 &&
          'errorCode' in error.response.data &&
          'errorMessage' in error.response.data
        ) {
          new Vue().$swal({
            icon: 'error',
            text: error.response.data.errorMessage,
            showConfirmButton: false,
            timer: 1000,
          });
        }
        return Promise.reject(error);
      }
    );

    Vue.prototype.$axios = {
      get: (url, params) => http.get(url, { params }),
      post: (url, body) => http.post(url, body),
      put: (url, body) => http.put(url, body),
      delete: (url, params) => http.delete(url, { params }),
      download: (url, params) =>
        http.get(url, { params, responseType: 'blob' }),
      upload: (url, body) =>
        http.delete(url, body, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
    };
  },
};
