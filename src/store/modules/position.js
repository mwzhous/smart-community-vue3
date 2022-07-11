import { jsonp } from 'vue-jsonp'

export default {
  namespaced: true,
  state: () => ({
    position: '',
  }),
  mutations: {
    setPosi(state, payload) {
      state.position = payload
    },
  },
  actions: {
    // 获取经纬度
    getPosition() {
      jsonp('https://apis.map.qq.com/ws/location/v1/ip?', {
        key: '27VBZ-ZWQCW-BQ7RX-R3JOJ-MJBFV-Y2BPL',
        output: 'jsonp', // output必须jsonp   不然会超时
      }).then((res) => {
        // console.log(res)
        const latitude = res.result.location.lat
        const longitude = res.result.location.lng
        // console.log('经度', latitude, '纬度', longitude)
        const position = latitude + '|' + longitude
        this.commit('position/setPosi', position)
      })
    },
  },
}
