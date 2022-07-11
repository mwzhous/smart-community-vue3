import * as VueRouter from 'vue-router'
import HomeLayout from '../views/home/HomeLayout.vue'
import home from '../views/home/index/IndexView.vue'
const routes = [
  {
    name: 'LoginView',
    path: '/login',
    component: () => import('../views/login/LoginView.vue'),
  },
  {
    // 引导页
    name: 'GuideView',
    path: '/login/guide',
    component: () => import('../views/login/GuideView.vue'),
  },
  {
    name: 'ResetView',
    path: '/reset',
    component: () => import('../views/login/ResetView.vue'),
  },
  {
    // 第三方登录-首次授权后进入手机号绑定页面
    name: 'ThirdPartyBind',
    path: '/bind',
    component: () => import('../views/login/ThirdPartyBind.vue'),
  },
  {
    name: 'HomeLayout',
    path: '',
    component: HomeLayout,
    redirect: '/home',
    children: [
      {
        name: 'HomeView',
        path: '/home',
        component: home,
        meta: {
          footShow: true,
        },
      },
      {
        name: 'NewsDetail',
        path: '/home/detail',
        component: () => import('../views/home/index/NewsDetail.vue'),
      },
      {
        name: 'MessageInfo',
        path: '/home/index/message',
        component: () => import('../views/home/index/MessageInfo.vue'),
      },
      {
        // 智慧开门
        name: 'OpenDoor',
        path: '/home/door',
        component: () => import('../views/home/open-door/OpenDoor.vue'),
      },
      {
        //开门记录
        name: 'OpenRecord',
        path: '/home/door/record',
        component: () => import('../views/home/open-door/OpenRecord.vue'),
      },
      {
        //访客邀请
        name: 'InviteVisitor',
        path: '/home/door/visitor',
        component: () => import('../views/home/open-door/InviteVisitor.vue'),
      },
      // 一键开门
      {
        name: 'ImmediatelyOpen',
        path: '/home/door/immediately',
        component: () => import('../views/home/open-door/ImmediatelyOpen.vue'),
      },
      // 摇一摇
      {
        name: 'FriendShake',
        path: '/home/door/shake',
        component: () => import('../views/home/open-door/FriendShake.vue'),
      },
      {
        // 邀请记录
        name: 'InvitedRecords',
        path: '/home/door/invited',
        component: () => import('../views/home/open-door/InvitedRecord.vue'),
      },
      {
        // 智能家居
        name: 'SecurityView',
        path: '/home/security',
        component: () => import('../views/home/security/SecurityView.vue'),
      },
      {
        // 智能插座
        name: 'OutLet',
        path: '/home/security/outlet',
        component: () => import('../views/home/security/OutLet.vue'),
      },
      {
        // 智能插座
        name: 'OutletOption',
        path: '/home/security/outlet/option',
        component: () => import('../views/home/security/OutletOption.vue'),
      },
      {
        // 添加设备
        name: 'AddDevice',
        path: '/home/security/add',
        component: () => import('../views/home/security/AddDevice.vue'),
      },
      // 停车主页
      {
        name: 'ParkView',
        path: '/home/park',
        component: () => import('../views/home/park/ParkView.vue'),
      },
      // 停车管理
      {
        name: 'ParkManage',
        path: '/home/park/manage',
        component: () => import('../views/home/park/ParkManage.vue'),
      },
      // 租聘
      {
        name: 'RentalPark',
        path: '/home/park/rental',
        component: () => import('../views/home/park/RentalPark.vue'),
      },
      // 停车界面
      {
        name: 'ParkingPage',
        path: '/home/park/parking/:id?',
        component: () => import('../views/home/park/ParkingPage.vue'),
      },
      // 贵宾邀请
      {
        name: 'ParkInvite',
        path: '/home/park/invite',
        component: () => import('../views/home/park/ParkInvite.vue'),
      },
      // 邀请记录
      {
        name: 'InvitedRecord',
        path: '/home/park/record',
        component: () => import('../views/home/park/InvitedRecord.vue'),
      },
      {
        name: 'PropertyService',
        path: '/home/property',
        component: () => import('../views/home/property/PropertyService.vue'),
      },
      {
        // 物业缴费
        name: 'PropertyCost',
        path: '/home/property/cost',
        component: () => import('../views/home/property/PropertyCost.vue'),
      },
      {
        // 在线报修
        name: 'OnlineRepair',
        path: '/home/property/repair',
        component: () => import('../views/home/property/OnlineRepair.vue'),
      },
      {
        // 社区活动
        name: 'CommunityActivity',
        path: '/home/property/active',
        component: () => import('../views/home/property/CommunityActivity.vue'),
      },
      {
        // 投诉建议
        name: 'SuggestView',
        path: '/home/property/suggest',
        component: () => import('../views/home/property/SuggestView.vue'),
      },
      {
        // 投诉记录
        name: 'ComplainLog',
        path: '/home/property/complain',
        component: () => import('../views/home/property/ComplainLog.vue'),
      },
      {
        // 保修记录
        name: 'ServiceLog',
        path: '/home/property/service',
        component: () => import('../views/home/property/ServiceLog.vue'),
      },
      {
        // 报修详情
        name: 'RepairDetails',
        path: '/home/property/Rdetails',
        component: () => import('../views/home/property/RepairDetails.vue'),
      },
      {
        // 投诉详情
        name: 'ComplaintDetails',
        path: '/home/property/Cdetails',
        component: () => import('../views/home/property/ComplaintDetails.vue'),
      },
    ],
  },
  {
    name: 'ServiceLayout',
    component: () => import('../views/service/ServiceLayout.vue'),
    redirect: '/service',
    children: [
      {
        // 社区服务
        name: 'ServiceView',
        path: '/service',
        component: () => import('../views/service/ServiceView.vue'),
        meta: {
          footShow: true,
        },
      },
      {
        // 热门搜索
        name: 'HotSearch',
        path: '/service/hot',
        component: () => import('../views/service/HotSearch.vue'),
      },
      {
        // 房产交易
        name: 'HouseTrans',
        path: '/service/house',
        component: () => import('../views/service/house/HouseTrans.vue'),
      },
      {
        // 房产详情
        name: 'HouseDetail',
        path: '/service/house/detail/:id',
        component: () => import('../views/service/house/HouseDetail.vue'),
      },
      {
        // 跳蚤市场
        name: 'MarketView',
        path: '/service/market',
        component: () => import('../views/service/market/MarketView.vue'),
      },
      {
        // 上架
        name: 'GoodsAdded',
        path: '/service/market/add',
        component: () => import('../views/service/market/GoodsAdded.vue'),
      },
      {
        // 上架记录
        name: 'AddedRecord',
        path: '/service/market/record',
        component: () => import('../views/service/market/AddedRecord.vue'),
      },
      {
        // 商品列表
        name: 'GoodsList',
        path: '/service/market/list/:type?',
        component: () => import('../views/service/market/GoodsList.vue'),
      },
      {
        // 商品详情
        name: 'GoodsDetail',
        path: '/service/market/list/detail/:id?',
        component: () => import('../views/service/market/GoodsDetail.vue'),
      },
      {
        // 小区商家
        name: 'ShopView',
        path: '/service/shop',
        component: () => import('../views/service/shop/ShopView.vue'),
      },
      {
        // 商家详情
        name: 'ShopDetail',
        path: '/service/shop/detail/:id',
        component: () => import('../views/service/shop/ShopDetail.vue'),
      },
      {
        // 我的店铺
        name: 'MyShop',
        path: '/service/myshop',
        component: () => import('../views/service/shop/MyShop.vue'),
      },
      {
        // 添加收货地址
        name: 'AddAddress',
        path: '/service/addAddress',
        component: () => import('../views/service/shop/AddAddress.vue'),
      },
      {
        // 订单
        name: 'PlaceOrder',
        path: '/service/order',
        component: () => import('../views/service/shop/PlaceOrder.vue'),
      },
      {
        // 收货地址
        name: 'ShipAddress',
        path: '/service/shipaddress',
        component: () => import('../views/service/shop/ShipAddress .vue'),
      },
    ],
  },
  {
    // 社区交流
    name: 'CommuView',
    path: '/commu',
    component: () => import('../views/commu/CommuView.vue'),
    meta: {
      footShow: true,
    },
  },
  {
    // 社区详情
    name: 'CommuDetail',
    path: '/commu/detail',
    component: () => import('../views/commu/CommuDetail.vue'),
  },
  {
    // 发布
    name: 'CommuPublish',
    path: '/commu/publish',
    component: () => import('../views/commu/CommuPublish.vue'),
  },
  {
    name: 'PersonLayout',
    component: () => import('../views/person/PersonLayout.vue'),
    redirect: '/person',
    children: [
      {
        // 个人中心
        name: 'PersonView',
        path: '/person',
        component: () => import('../views/person/PersonView.vue'),
        meta: {
          footShow: true,
        },
      },
      {
        // 绑定业主信息
        name: 'BindOwner',
        path: '/person/ownerInfo',
        component: () => import('../views/person/BindOwner.vue'),
      },
      {
        // 切换小区
        name: 'ChangeCommu',
        path: '/person/change',
        component: () => import('../views/person/community/ChangeCommu.vue'),
      },
      {
        // 家庭成员
        name: 'FamilyMember',
        path: '/person/family',
        component: () => import('../views/person/family/FamilyMember.vue'),
      },
      {
        // 家庭成员修改
        name: 'FamilyMemberChange',
        path: '/person/familychange/:id',
        component: () => import('../views/person/family/FamilyMemberChange.vue'),
      },
      {
        // 家庭成员添加
        name: 'FamilyMemberAdd',
        path: '/person/familyadd',
        component: () => import('../views/person/family/FamilyMemberAdd.vue'),
      },
      {
        // 我的收藏
        name: 'CollectView',
        path: '/person/collect',
        component: () => import('../views/person/collection/CollectView.vue'),
      },
      {
        // 我的钱包
        name: 'MyWallet',
        path: '/person/wallet',
        component: () => import('../views/person/common/MyWallet.vue'),
      },
      {
        // 优惠券
        name: 'MyCoupon',
        path: '/person/coupon',
        component: () => import('../views/person/common/MyCoupon.vue'),
      },
      {
        // 积分
        name: 'MyIntegral',
        path: '/person/integral',
        component: () => import('../views/person/common/MyIntegral.vue'),
      },
      {
        // 我的订单
        name: 'MyOrder',
        path: '/person/order',
        component: () => import('../views/person/common/MyOrder.vue'),
      },
      {
        // 设置
        name: 'SettingView',
        path: '/person/setting',
        component: () => import('../views/person/setting/SettingView.vue'),
      },
      {
        // 关于我们
        name: 'AboutUs',
        path: '/person/aboutus',
        component: () => import('../views/person/setting/AboutUs.vue'),
      },
      {
        // 意见反馈
        name: 'AdviceFeedback',
        path: '/person/advice',
        component: () => import('../views/person/setting/AdviceFeedback.vue'),
      },
      {
        // 个人数据
        name: 'PersonalData',
        path: '/person/data',
        component: () => import('../views/person/setting/PersonalData.vue'),
      },
      {
        // 签到
        name: 'SignIn',
        path: '/person/signin',
        component: () => import('../views/person/setting/SignIn.vue'),
      },
      {
        // 手机号
        name: 'MobilePhone',
        path: '/person/data/phone',
        component: () => import('../views/person/setting/MobilePhone.vue'),
      },
      {
        // 修改手机号
        name: 'ModifyPhone',
        path: '/person/data/modify-phone',
        component: () => import('../views/person/setting/ModifyPhone.vue'),
      },
      {
        // 解除绑定
        name: 'BindOthers',
        path: '/person/data/bind-others/:type?',
        component: () => import('../views/person/setting/BindOthers.vue'),
      },
    ],
  },
]

const router = VueRouter.createRouter({
  // 使用 HTML5 的历史记录模式
  history: VueRouter.createWebHistory(),
  routes,
})

export default router
