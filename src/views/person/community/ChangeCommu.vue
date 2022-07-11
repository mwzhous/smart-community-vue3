/* *@description: 切换小区页面 *@author: 肖展鹏 *@date: 2022-05-14 */
<template>
  <div class="all">
    <ConfigProvider :theme-vars="themeVars">
      <NavBar
        :title="title"
        left-arrow
        fixed
        placeholder
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #right>
          <Icon v-show="showSlot" :name="iconUrl" size="18" />
        </template>
      </NavBar>
    </ConfigProvider>
    <div class="setting">
      <div class="setting__one">
        <div class="setting__one__item">
          <span>{{ isshow.nowxiaoqu }}</span>
          <span><CheckCircle class="icon" /></span>
        </div>
      </div>
      <WdScroll :get-data="pullHandler">
        <div class="setting__two">
          <div
            v-for="(item, index) in isshow.familyList"
            :key="index"
            class="setting__two__item line"
          >
            <span>{{ item.name }}</span>
            <span @click="change(index)">切换小区<ChevronRight class="icon1" /></span>
          </div>
        </div>
      </WdScroll>
    </div>
  </div>
</template>
<script setup>
import { Icon, ConfigProvider, Toast } from 'vant'
import NavBar from '@/components/WdNavbar.vue'
import { useRouter } from 'vue-router'
import { ChevronRight, CheckCircle } from '@vicons/fa'
import { get, api1, put } from '@/utils/request'
import { reactive, ref } from 'vue'

import WdScroll from '@/components/WdScroll.vue'
const router = useRouter()
const isshow = reactive({
  nowxiaoqu: '',
  familyList: [],
})

get(api1 + '/personal/community', {
  page: 1,
  size: 8,
}).then((res) => {
  isshow.nowxiaoqu = res.currentCommunity.name
  isshow.familyList = res.communityList
})

const page = ref(1)

const pullHandler = () => {
  // console.log('上拉加载。。。')
  get(api1 + '/personal/community', {
    page: ++page.value,
    size: 8,
  }).then((res) => {
    const arr = res.communityList
    if (arr.length == 0) {
      setTimeout(() => {
        Toast.fail('我是有底线的')
      }, 2000)
    } else {
      arr.forEach((ele) => {
        isshow.familyList.push(ele)
      })
    }
  })
}

const change = (index) => {
  isshow.nowxiaoqu = isshow.familyList[index].name
  put(api1 + '/personal/community', {
    communityId: isshow.familyList[index].communityId,
    name: isshow.familyList[index].name,
  })
    .then(() => {
      Toast('切换成功')
    })
    .catch(() => {
      Toast.fail('切换失败')
    })
}

const themeVars = {
  navBarHeight: '44px',
  navBarIconColor: '#000',
  navBarArrowSize: '16px',
  navBarTitleFontSize: '19px',
}

defineProps({
  iconUrl: {
    type: String,
    default: '',
  },
  onClickRight: {
    type: Function,
    default: () => {},
  },
  showSlot: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '切换小区',
  },
})
const onClickLeft = () => {
  router.back()
}
</script>
<style lang="scss" scoped>
.all {
  width: 100%;
  height: 100vh;
  background-color: #f3f4f6;
}
.line {
  border-bottom: 1px solid #e8e8e8;
}
.setting {
  height: calc(100vh - 22px);
  &__one {
    margin-top: 12px;
    &__item {
      display: flex;
      justify-content: space-between;
      color: #333333;
      font-size: 16px;
      height: 58px;
      width: 100%;
      line-height: 58px;
      background-color: #fff;
    }
    &__item span {
      margin: 0 22px 0 22px;
    }
  }
  &__two {
    margin-top: 12px;

    &__item {
      display: flex;
      justify-content: space-between;
      color: #333333;
      font-size: 16px;
      height: 58px;
      width: 100%;
      line-height: 58px;
      background-color: #fff;
    }
    &__item span {
      margin: 0 22px 0 22px;
    }
  }
}
.iconfont {
  height: 12px;
  width: 7px;
  margin-left: 304px;
}
.button {
  width: 374px;
  height: 52px;
  color: #000;
  font-size: 20px;
  font-weight: 500;
  background-color: #fff;
  border: 1.5px solid #d5d5d5;
  border-radius: 7px;
  left: 20px;
}
.ChevronLeft {
  width: 9px;
  height: 16px;
}
.nar {
  height: 44px;
  font-size: 19px;
  text-align: center;
  padding-top: 9px;
}
.icon1 {
  width: 7px;
  height: 12px;
  margin-left: 10px;
}
.icon {
  width: 20px;
  height: 20px;
  color: green;
}
</style>
