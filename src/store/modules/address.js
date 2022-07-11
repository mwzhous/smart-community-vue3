// 设置本地存储
const setLocalCartList = (state) => {
  const { address } = state
  const addressInfo = JSON.stringify(address)
  localStorage.address = addressInfo
}
// 本地数据获取
const getLocaCartList = () => {
  try {
    return JSON.parse(localStorage.address)
  } catch (e) {
    return {}
  }
}
export default {
  state: () => ({
    address: getLocaCartList(),
  }),
  mutations: {
    // 改变商店信息
    changeAddressInfo(state, payload) {
      const { addressInfo } = payload
      // console.log(addressInfo);
      state.address = addressInfo
      setLocalCartList(state)
    },
  },
  actions: {},
}
