<template>
  <div>
    <WdNavbar title="业主信息" />
    <div class="wrapper">
      <ConfigProvider :theme-vars="themeVars">
        <!-- 小区 -->
        <div class="wrapper__cell">
          <span>小区</span>
          <div class="right">
            <Dropdown-menu>
              <Dropdown-item v-model="cell" :options="cellOpt" @change="cellChange" />
            </Dropdown-menu>
          </div>
        </div>
        <!-- 楼栋 -->
        <div class="wrapper__cell">
          <span>楼栋</span>
          <div class="right">
            <Dropdown-menu>
              <Dropdown-item v-model="build" :options="buildOpt" @change="buildChange" />
            </Dropdown-menu>
          </div>
        </div>
        <!-- 单元 -->
        <div class="wrapper__cell">
          <span>单元</span>
          <div class="right">
            <Dropdown-menu>
              <Dropdown-item v-model="unit" :options="unitOpt" @change="unitChange" />
            </Dropdown-menu>
          </div>
        </div>
        <!-- 房间 -->
        <div class="wrapper__cell">
          <span>房间</span>
          <div class="right">
            <Dropdown-menu>
              <Dropdown-item v-model="room" :options="roomOpt" />
            </Dropdown-menu>
          </div>
        </div>
      </ConfigProvider>
      <NButton @click="submit">绑定小区</NButton>
    </div>
  </div>
</template>
<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import { DropdownMenu, DropdownItem, ConfigProvider, Toast } from 'vant'
import { reactive, ref, onMounted } from 'vue'
import { get, api1, post } from '@/utils/request'
import { useRouter } from 'vue-router'
const router = useRouter()
// Dropdown-item的v-model，绑定cellOpt的value
const cell = ref(0)
const build = ref(0)
const unit = ref(0)
const room = ref(0)

// 自定义vant主题
const themeVars = {
  noticeBarBackgroundColor: '#fff',
  dropdownMenuBackgroundColor: 'transparent',
  dropdownMenuBoxShadow: 'none',
}
// Dropdown-item的options选项列表
const cellOpt = reactive([
  {
    text: '请选择小区',
    value: 0,
  },
])
const buildOpt = reactive([
  {
    text: '请选择楼栋',
    value: 0,
  },
])
const unitOpt = reactive([
  {
    text: '请选择单元',
    value: 0,
  },
])
const roomOpt = reactive([
  {
    text: '请选择房间',
    value: 0,
  },
])

// 一进来就请求小区列表
onMounted(() => {
  cellList()
})

const cellList = () => {
  get(api1 + '/personal/community', {
    page: 1,
    size: 30,
  }).then((res) => {
    const arr = res.communityList
    arr.forEach((ele) => {
      cellOpt.push({ text: ele.name, value: ele.id })
    })
  })
}

const cellChange = (id) => {
  // 获取对应小区的楼栋列表
  get(api1 + '/personal/building', {
    communityId: id,
  }).then((res) => {
    buildOpt.length = 1
    unitOpt.length = 1
    roomOpt.length = 1
    build.value = 0
    unit.value = 0
    room.value = 0
    res.forEach((ele) => {
      buildOpt.push({ text: ele.name, value: ele.id })
    })
  })
}
const buildChange = (id) => {
  // 获取对应楼栋的单元列表
  get(api1 + '/personal/unit', {
    buildingId: id,
  }).then((res) => {
    unitOpt.length = 1
    roomOpt.length = 1
    unit.value = 0
    room.value = 0
    res.forEach((ele) => {
      unitOpt.push({ text: ele.name, value: ele.id })
    })
  })
}
const unitChange = (id) => {
  // 获取对应单元的房间列表
  get(api1 + '/personal/room', {
    unitId: id,
  }).then((res) => {
    roomOpt.length = 1
    room.value = 0
    res.forEach((ele) => {
      roomOpt.push({ text: ele.roomNumber, value: ele.id })
    })
  })
}
// 提交业主信息
const submit = () => {
  post(api1 + '/personal/binding', {
    communityId: cell.value,
    roomId: room.value,
  })
    .then(() => {
      router.push({ name: 'PersonalData' })
    })
    .catch(() => {
      Toast.fail('请勿重复绑定')
    })
}
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: #f3f4f7;
  height: calc(100vh - 44px);
  button {
    height: 52px;
    width: 374px;
    margin: 30px 20px 0 20px;
    background: $primary-lg;
    color: $cf;
    font-size: 20px;
    border-radius: 8px;
  }
}
.wrapper__cell {
  height: 58px;
  width: 100%;
  @include px(22px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid #f1f1f1;
  background-color: #fff;
  span,
  input {
    font-size: $fs-m;
    color: $c4;
    font-weight: bold;
  }
  input {
    text-align: right;
    outline: none;
    border: none;
    background: none;
    width: 100%;
    &:focus {
      background: #f1f1f1;
    }
  }
  .right {
    display: flex;
    align-items: center;
    p {
      color: #999;
    }
  }
}
</style>
