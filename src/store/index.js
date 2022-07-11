import { createStore } from 'vuex'
import user from './modules/user.js'
import shop from './modules/shop'
import address from './modules/address'
import getters from './getters'
import actions from './actions.js'
import mutations from './mutations.js'
import position from './modules/position'
export default createStore({
  mutations,
  actions,
  getters,
  modules: {
    user,
    address,
    shop,
    position,
  },
})
