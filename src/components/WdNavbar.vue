@author: 陈旺
<template>
  <ConfigProvider :theme-vars="themeVars">
    <NavBar
      :title="title"
      left-arrow
      :fixed="props.fix"
      :placeholder="props.ph"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <span :style="{ color: color }">{{ rightTxt }}</span>
        <Icon v-show="showSlot" :name="iconUrl" size="18" />
      </template>
    </NavBar>
  </ConfigProvider>
</template>
<script setup>
import { NavBar, ConfigProvider, Icon } from 'vant'
import { useRouter } from 'vue-router'
const router = useRouter()
const themeVars = {
  navBarHeight: '44px',
  navBarIconColor: props.color,
  navBarArrowSize: '16px',
  navBarTitleFontSize: '19px',
  navBarTitleTextColor: props.color,
  navBarBackgroundColor: props.bgColor,
}

const props = defineProps({
  // 右插槽的图片地址，可直接传入vant的icon组件的图标名称
  iconUrl: {
    type: String,
    default: '',
  },
  // 右插槽点击事件
  onClickRight: {
    type: Function,
    default: () => {},
  },
  rightTxt: {
    type: String,
    default: '',
  },
  onClickLeft: {
    type: Function,
    default: function () {},
  },
  // 是否显示右插槽
  showSlot: {
    type: Boolean,
    default: false,
  },
  // 标题
  title: {
    type: String,
    default: '标题',
  },
  // 背景色
  bgColor: {
    type: String,
    default: '#fff',
  },
  // icon和标题色
  color: {
    type: String,
    default: 'balck',
  },
  // 是否生成等高占位元素
  ph: {
    type: Boolean,
    default: true,
  },
  // 是否fixed
  fix: {
    type: Boolean,
    default: true,
  },
  to: {
    type: String,
    default: '',
  },
})
const onClickLeft = () => {
  if (props.to) {
    router.push({ name: props.to })
  } else {
    router.back()
  }
}
</script>
<style lang="scss" scoped></style>
