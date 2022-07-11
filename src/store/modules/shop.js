// 设置本地存储
const setLocalCartList = (state) => {
  const { shopList } = state
  const shopListString = JSON.stringify(shopList)
  localStorage.shopList = shopListString
}
// 本地数据获取
const getLocaCartList = () => {
  try {
    return JSON.parse(localStorage.shopList)
  } catch (e) {
    return {}
  }
}
export default {
  state: () => ({
    shopList: getLocaCartList()
  }),
  mutations: {
    // 改变商店信息
    changeShopInfo(state, payload) {
      // 商店id,商品价格,商品Id,商品变动数量
      const { shopName, shopId, commodity, total } = payload
      // console.log('传输的值:' + shopId, commodity, total)
      // 判断是否有这个商店的信息如果有就拿去原来state里面的值,如果没有就重新给一个空对象
      const shopCardList = state.shopList[shopId] || {
        productList: {}
      }
      // 拿取商店列表中commodityId的商品信息
      let product = shopCardList.productList[commodity.id] || {}
      //赋值商品对象
      product = commodity

      // 将处理好product放入productList里面

      shopCardList.productList[commodity.id] = product
      // 设置总价
      shopCardList.total = total
      shopCardList.shopName = shopName
      shopCardList.shopId = shopId
      // console.log(shopCardList);
      // 再次将处理好的shopCardList放在state中
      state.shopList[shopId] = shopCardList
      // 通过商品数量判断商品是否加入购物车,当数量小于零的时候从购物车中去除
      if (state.shopList[shopId].productList[commodity.id].counter == 0) {

        delete state.shopList[shopId].productList[commodity.id]
      }
      // 通过总价判断该商店是否有购买物品,当总价为0的时候删除该商店
      if (state.shopList[shopId].total <= 0) {
        delete state.shopList[shopId]
      }
      setLocalCartList(state)
    },
    // 删除商店信息
    clearShopData(state, payload) {
      const { shopId, commodityId } = payload
      if (commodityId) {
        // 清除state中这个商店的信息
        state.shopList[shopId].total -= state.shopList[shopId].productList[commodityId].counter * state.shopList[shopId].productList[commodityId].price
        delete state.shopList[shopId].productList[commodityId]
        if (JSON.stringify(state.shopList[shopId].productList) == '{}') {
          delete state.shopList[shopId]
        }
      } else {
        // 清除state中这个商店的信息
        delete state.shopList[shopId]
      }
      // 本地同步 
      setLocalCartList(state)
    },
  },
  actions: {
  },
}

