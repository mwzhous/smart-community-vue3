/* *@description: 商店详情卡片 *@author: 王浩南 *@date: 2022-05-15 */
<template>
  <!-- 商店详情 -->
  <div class="card">
    <!-- 商店图标 -->
    <img class="card--img" :src="avatar" />
    <!-- 商店信息 -->
    <div class="card__info">
      <div class="status">
        <div class="status__info">
          <!-- 商店title -->
          <h3 class="status__info--title">{{ shopName }}</h3>
          <!-- 商店的配送费等 -->
          <div class="status__info--send">
            <span>起送{{ minPrice }}¥</span>
            <span>配送费{{ shippingPrice }}¥</span>
          </div>
        </div>
        <!-- 右边状态当status为空时,显示是否营业,不为空时根据具体状态显示注册情况 -->
        <img v-if="status !== undefined" class="status--icon" :src="statusIconUrl[status]" />
        <h1 v-else class="status--sgin">{{ sginStatus[sgin] }}</h1>
      </div>
      <!-- 商店详情 -->
      <span class="card__info--detail">
        {{ detail }}
      </span>
    </div>
  </div>
</template>
<script setup>
import { reactive } from '@vue/reactivity'

defineProps({
  shopName: String,
  avatar: String,
  minPrice: Number,
  shippingPrice: Number,
  detail: String,
  // 审核状态0:待审核.1:已通过.2:未通过
  status: Number,
  // 营业状态0:休息中.1:暂停营业.2:营业中
  sgin: {
    type: Number,
    default: 1,
  },
})
const sginStatus = reactive(['暂停营业', '营业中'])
const statusIconUrl = reactive([
  'https://wx-login.oss-cn-shanghai.aliyuncs.com/upload/%E5%9B%BE%E6%A0%87/bg_daishenhe.png',
  'https://wx-login.oss-cn-shanghai.aliyuncs.com/upload/%E5%9B%BE%E6%A0%87/bg_yitongguo.png',
  'https://wx-login.oss-cn-shanghai.aliyuncs.com/upload/%E5%9B%BE%E6%A0%87/bg_weitongguo.png',
])

</script>
<style lang="scss" scoped>
@use '@/styles/mixin' as m;
// 商店卡片
.card {
  border-radius: 5px;
  margin: 9px 12px;
  display: flex;
  align-items: center;
  background: $cf;
  height: 121px;

  &--img {
    width: 92px;
    height: 92px;
    margin: 14px;
    border-radius: 5px;
  }
  &__info {
    margin: 20px 18px 19px 0px;
    .status {
      display: flex;
      align-items: center;
      &__info {
        margin-right: 50px;
        &--title {
          font-size: 17px;
          font-weight: bold;
          color: #333333;
        }
        &--send {
          // margin-right: 20px;
          font-size: 13px;
          color: $c8;
          span {
            font-weight: 500;
            margin-right: 15px;
          }
        }
      }
      &--icon {
        margin-left: 10px;
        width: 57px;
        height: 57px;
      }
      &--sgin {
        border-radius: 17px;
        border: 1px solid $wd-primary;
        color: $wd-primary;
        font-size: 12px;
        line-height: 12px;
        margin: 0 auto;
        padding: 3px 10px;
      }
    }
    &--detail {
      margin-top: 11px;
      font-size: 13px;
      line-height: 13px;
      font-weight: 400;
      color: $c8;
      @include m.text-overflow;
    }
  }
}
</style>
