import request from '@/utils/request'

/**
 * 密码登录
 */
export const login = (data) => {
  return request({
    url: '/account/login',
    method: 'POST',
    data,
  })
}

/**
 * 验证码登录
 */
export const loginByPhone = (data) => {
  return request({
    url: '/phone/login',
    method: 'POST',
    data,
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request({
    url: '/info',
  })
}
