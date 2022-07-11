<template>
  <div class="all">
    <WdNavbar title="我的钱包" bg-color="transparent" color="white" />
    <div class="signin">
      <div class="signin__num">
        <div class="num">{{ isshow.all }}</div>
        <div class="font">积分</div>
        <Button class="button" @click="si">立即签到</Button>
        <div class="signin__num__tit">
          已签到{{ isshow.day }}天，继续签到可获得{{ isshow.next }}积分。
        </div>
      </div>
      <div class="signin__option">
        <span
          v-for="(item, index) in isshow.list"
          :key="index"
          :class="item.isSignIn == true ? 'signin__option__item1' : 'signin__option__item'"
        >
          <div v-if="item.isSignIn" style="width: 21px; height: 36px">
            <span>{{ item.integration }}</span>
            <img src="@/assets/whn/check.png" />
          </div>
          <div v-else style="width: 21px; height: 36px; line-height: 36px">
            <span>{{ item.integration }}</span>
          </div>
        </span>
      </div>
      <hr />
      <div class="signin__option">
        <ul>
          <li
            v-for="(item, index) in isshow.list"
            :key="index"
            :class="item.isSignIn == true ? 'w' : 'o'"
          >
            {{ item.day.slice(1, 3) }}
          </li>
        </ul>
      </div>

      <div class="signin__tip">
        <div class="signin__tip__header">
          <hr />
          <div class="signin__tip__header__tit">签到规则</div>
        </div>
        <div class="signin__tip__contant">
          <p>1、连续签到七天可获得135积分。</p>
          <p>2、签到所获积分可用于福来来商城购物抵现，每次抵现份额不超过商品金额的1%。</p>
          <p>3、积分每年12月31日清零，次年积分继续积累只能当年使用。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Button, Toast } from 'vant'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { post, get, api1 } from '@/utils/request.js'
import WdNavbar from '@/components/WdNavbar.vue'
const router = useRouter()
const isshow = reactive({
  num: 0,
  day: 0,
  all: 0,
  next: 0,
  can: '',
  list: [],
})
get(api1 + '/personal/sign/in').then((res) => {
  isshow.list = res.dayList
  isshow.all = res.integration
  isshow.day = res.day
  isshow.next = res.dayList[res.day].integration

  isshow.can = res.currentDay.isSignIn
})
const si = () => {
  if (isshow.day < 7) {
    post(api1 + '/personal/sign/in', { day: isshow.day + 1, integration: isshow.next }).then(
      (res) => {
        Toast('签到成功')
      },
      (err) => {
        Toast.fail('签到失败')
      },
    )
    ++isshow.num
    router.go(0)
  } else {
    post(api1 + '/personal/sign/in', { day: 1, integration: isshow.next }).then(
      (res) => {
        Toast('签到成功')
      },
      (err) => {
        Toast.fail('签到失败')
      },
    )
    ++isshow.num
    router.go(0)
  }
}
</script>
<style lang="scss" scoped>
.all {
  width: 100%;
  height: 100vh;
  background-color: #f3f4f6;
}
.signin {
  margin-top: -44px;
  width: 100%;
  height: 234px;
  background-image: url('@/assets/img/bg_qiandao.png');
  background-size: 100% 100%;
  padding-top: 63px;
  &__num {
    display: flex;
    flex-direction: column;
    align-items: center;
    .num {
      font-size: 52px;
      color: #fff;
    }
    .font {
      font-size: 17px;
      color: #fff;
      margin: 25px 0 20px 0;
    }
    &__tit {
      font-size: 17px;
      font-weight: 350px;
      color: #333;
      margin-top: 29px;
    }
  }
  &__option {
    display: flex;
    justify-content: space-between;
    margin-top: 49px;
    width: 374px;
    margin: 29px 0 0 20px;
    &__item {
      display: inline-block;
      width: 49px;
      height: 49px;
      border: 1px solid #fbcb93;
      border-radius: 49px;
      background-color: #fff2e7;
      text-align: center;
      padding: 0 2px 0 2px;
      div {
        margin: 6px 0 0 12px;
        span {
          display: inline-block;
          width: 20px;
          height: 20px;
        }
        img {
          display: inline-block;
          width: 20px;
          height: 13px;
        }
      }
    }
    &__item1 {
      display: inline-block;
      width: 49px;
      height: 49px;
      border: 1px solid #fbcb93;
      border-radius: 49px;
      background-color: #f37d12;
      text-align: center;
      padding: 0 2px 0 2px;
      div {
        margin: 6px 0 0 12px;
        span {
          display: inline-block;
          width: 20px;
          height: 20px;
        }
        img {
          display: inline-block;
          width: 20px;
          height: 13px;
        }
      }
    }

    ul {
      display: flex;
      justify-content: space-between;
      width: 352px;
      float: left;
      margin: -32.5px 0 0 14px;
      height: 1px;
    }
    ul li {
      position: relative;
      display: inline-block;
      height: 46px;
      line-height: 46px;
    }
    .w:before {
      content: '';
      position: absolute;
      display: inline-block;
      width: 5px;
      height: 5px;
      border: 1px solid #aaa;
      border-radius: 4px;
      background-color: #f3f4f6;
      left: 8px;
    }
    .o:before {
      content: '';
      position: absolute;
      display: inline-block;
      width: 5px;
      height: 5px;
      border: 1px solid #f8890a;
      border-radius: 4px;
      background-color: #f3f4f6;
      left: 8px;
    }
  }
  &__tip {
    &__header {
      text-align: center;
      hr {
        margin-top: 51px;
        width: 374px;
      }
      &__tit {
        width: 180px;
        height: 30px;
        margin: -23px 0 0 115px;
        text-align: center;
        line-height: 30px;
        font-size: 18px;
        font-weight: 500px;
        color: #888;
        background-color: #f3f4f6;
      }
    }
    &__contant {
      width: 374px;
      height: 196px;
      margin: 10px 0 0 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 25px 23px 30px 23px;
      background-color: #fff;
      p {
        font-size: 14px;
        text-indent: -22px;
        margin-left: 22px;
        line-height: 30px;
      }
    }
  }
}
.button {
  display: inline-block;
  width: 190px;
  height: 49px;
  border: 1px solid #fff;
  border-radius: 49px;
  font-size: 21px;
  color: #9b0000;
  background-color: #fbc514;
}
.icon {
  display: inline-block;
  width: 17px;
  margin-top: -80px;
}
hr {
  margin-top: 12px;
  width: 374px;
}
</style>
