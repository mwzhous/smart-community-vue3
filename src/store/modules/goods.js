import { setItem } from '@/utils/storage'
import { GOODSID } from '../../constant'

export default {
  namespaced: true,
  state: () => ({
    goodsId: '',
  }),
  mutations: {
    setGoodsId(state, val) {
      state.goodsId = val
      // console.log(state.goodsId)
      setItem(GOODSID, val)
    },
  },
}
