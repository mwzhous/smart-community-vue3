import { login, getUserInfo, loginByPhone } from '@/api/sys'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {},
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {
    // 账户&密码登录
    login(context, loginInfo) {
      const { account, password } = loginInfo
      return new Promise((resolve, reject) => {
        login({
          account,
          password,
        })
          .then((data) => {
            resolve(data)
            this.commit('user/setToken', data.token)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    // 手机号&验证码登录
    loginByPhone(context, loginInfo) {
      const { phone, verifyCode } = loginInfo
      return new Promise((resolve, reject) => {
        loginByPhone({
          phone,
          verifyCode,
          type: '业主',
        })
          .then((data) => {
            resolve(data)
            this.commit('user/setToken', data.token)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    // 退出
    logout() {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
    },
    // 获取登录用户信息
    async getUserInfo() {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
  },
}
