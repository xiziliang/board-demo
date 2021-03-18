import axios from "axios";

const appKey = '69800851-4554-4EEC-8D12-E4211B952798';

// axios.defaults.withCredentials = true;  //????????????
axios.defaults.timeout = 10000;
axios.interceptors.request.use(
    config => {
        // if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        //     config.headers.Authorization = `token ${store.state.token}`;
        // }
        // config.headers.AppKey = appKey;
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        return config;
    },
    err => {
        return err;
});

// http response 拦截器
axios.interceptors.response.use(response => {
    return response;
}, error => {
        if (error.message.indexOf('timeout') !== -1) {
          error.msg = '请求超时，请重试'
        }
        return error
});

export const post = (name='',data={},appKey)=>{
    const url = `${name}`;

    return axios({
        method: 'POST',
        url,
        data,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json; charset=UTF-8',
            'token': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2OSIsImlhdCI6MTU3NjExNTY5NywiZXhwIjoxNTc2MTU4ODk3fQ.V5PBFWyyip7peHF0I-h7Si6DaqmdlmroXSG5hqf06l1fPJlokW7It5qIeaDcN0js3lErqjI2eYs_A88vfrdegA'
        }
    })
}
export const get = (url='',data={},appKey)=>{
    for (const key in data) {
        url += `?${key}=${data[key]}`;
    }
    return axios({
        method:'GET',
        url,
        data,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json; charset=UTF-8',
            'AppKey': appKey
        }
    })
}