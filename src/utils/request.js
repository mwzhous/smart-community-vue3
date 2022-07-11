import axios from 'axios'
import store from '../store'

const service = axios.create({
  baseURL: 'http://106.14.169.149:8089/api',
  timeout: 10000,
})
export const api1 = 'http://106.14.169.149:8081/api'
export const api2 = 'http://106.14.169.149:8082/api'
export const api3 = 'http://106.14.169.149:8083/api'
export const api4 = 'http://106.14.169.149:8084/api'
export const api5 = 'http://106.14.169.149:8085/api'
export const api6 = 'http://106.14.169.149:8086/api'
export const api7 = 'http://106.14.169.149:8087/api'
export const api8 = 'http://106.14.169.149:8088/api'
export const mock = 'http://127.0.0.1:4523/mock/966330/api'
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    service.get(url, { params }).then(
      (response) => {
        resolve(response)
      },
      (err) => {
        reject(err)
      },
    )
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    service
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(
        (response) => {
          resolve(response)
        },
        (err) => {
          reject(err)
        },
      )
  })
}

export const put = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    service
      .put(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(
        (response) => {
          resolve(response)
        },
        (err) => {
          reject(err)
        },
      )
  })
}
export const del = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    service
      .delete(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(
        (response) => {
          resolve(response)
        },
        (err) => {
          reject(err)
        },
      )
  })
}
//响应拦截器
service.interceptors.response.use(
  (response) => {
    const { code, message, data } = response.data
    //   要根据code决定下面的操作
    if (code == 200 && data) {
      // console.log('响应拦截器:data', data)
      return data
    } else if (code == 200) {
      return response.data
    } else if (code == 500) {
      return response.data
    } else if (code == 10004) {
      // 未能读取到有效Token，清空storage
      window.localStorage.clear()
      console.log('message', message)
    } else {
      // console.log(code)
      // 业务错误
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // TODO: 将来处理 token 超时问题
    return Promise.reject(error)
  },
)

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      // 如果token存在 注入token
      ;(config.headers.token = store.getters.token),
        (config.headers.position = store.getters.position)
    }
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default service
