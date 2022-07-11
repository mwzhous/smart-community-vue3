const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  position: (state) =>  state.position.position,
  
  /**
   * @returns true 表示已存在用户信息
   */
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
}
export default getters
