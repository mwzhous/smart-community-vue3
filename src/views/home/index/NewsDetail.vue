<template>
  <div class="page">
    <WdNavbar title="民生资讯" />
    <div class="main">
      <h1 class="title">{{ items.title }}</h1>
      <p class="time">{{ items.createTime }}</p>
      <img :src="items.imageUrl" class="pic" />
      <div class="textbox">
        <span class="content" v-html="items.content"></span>
      </div>
      <div class="footer">
        <!-- <div class="viewitem">
          <img src="../../../assets/wl/36_广场_13.png" />
          <span>123</span>
          <img src="../../../assets/wl/36_广场_13-05.png" />
          <span>54</span>
          <img src="../../../assets/wl/36_广场_14.png" />
          <span>30</span>
        </div> -->
      </div>
    </div>
    <div class="plcard">
      <span class="title">全部评论</span>
      <div v-for="(item, index) in replyList" :key="index">
        <div class="comminfo">
          <img :src="item.avatar" class="ava1" />
          <div class="userinfo">
            <span class="commname">{{ item.userName }}</span>
            <p>{{ item.createTime }}</p>
          </div>
          <span class="hf" @click="reply(index)">回复</span>
          <img
            :src="
              item.isThump
                ? 'https://wx-login.oss-cn-shanghai.aliyuncs.com/dz.png'
                : 'https://wx-login.oss-cn-shanghai.aliyuncs.com/dzl.png'
            "
            class="dz"
            @click="light(index)"
          />
        </div>
        <div class="commtext1">
          {{ item.content }}
        </div>
        <div v-for="(item1, index1) in item.repairList" :key="index1">
          <div v-if="item.id === item1.parentCommentId">
            <div class="lesser">
              <img :src="item1.avatar" class="ava1" />
              <div class="userinfo">
                <span class="commname">{{ item1.userName }}</span>
                <p>{{ item1.createTime }}</p>
              </div>
              <!-- <span class="hf" @click="reply">回复</span> -->
              <img
                :src="
                  item1.isThump
                    ? 'https://wx-login.oss-cn-shanghai.aliyuncs.com/dz.png'
                    : 'https://wx-login.oss-cn-shanghai.aliyuncs.com/dzl.png'
                "
                class="dz"
                @click="lights(index, index1)"
              />
            </div>
            <div class="commtext2">
              {{ item1.content }}
            </div>
          </div>
          <div v-else class="no"></div>
        </div>
      </div>
      <div class="pubbox" @keyup.enter="enters">
        <input
          v-model="content"
          type="text"
          :placeholder="re ? '回复@' + holder : '说点好听的吧...'"
        />
        <button @click="submit">{{ re ? '回复' : '评论' }}</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import WdNavbar from '../../../components/WdNavbar.vue'
import { Toast } from 'vant'
import { get, api4, post } from '@/utils/request'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const items = ref({})
const route = useRoute()
const content = ref('')
const replyList = ref([])
let holder = ref('')
const re = ref(false)
let test = 0
let num = 0

const getDetailData = async () => {
  let url = api4 + '/index/news/detail/'
  const result = await get(url, { news_id: route.query.id })
  items.value = result
  // console.log(result)
}
getDetailData()

const getDetailData1 = async () => {
  let url = api4 + '/index/news/comment/' + route.query.id
  let result = await get(url)
  replyList.value = result
  // console.log(result)
  // console.log(result.length)
  // console.log(replyList.value.length)
}
getDetailData1()
const submit = () => {
  if (re.value == false) {
    post(api4 + '/index/news/comment', { content: content.value, newsId: route.query.id }).then(
      () => {
        getDetailData1()
        content.value = ''
      },
    )

    if (test != replyList.value.length) {
      Toast.success('评论成功')
    } else {
      Toast.success('评论失败')
    }
  } else {
    post(api4 + '/index/news/comment', {
      content: content.value,
      newsId: route.query.id,
      parentCommentId: replyList.value[num].id,
    }).then(() => {
      getDetailData1()
      content.value = ''
      re.value = false
    })

    if (test != replyList.value[num].length) {
      Toast.success('回复成功')
    } else {
      Toast.success('回复失败')
    }
  }
}
const enters = () => {
  if (re.value == false) {
    post(api4 + '/index/news/comment', { content: content.value, newsId: route.query.id }).then(
      () => {
        getDetailData1()
        content.value = ''
      },
    )

    if (test != replyList.value.length) {
      Toast.success('评论成功')
    } else {
      Toast.success('评论失败')
    }
  } else {
    post(api4 + '/index/news/comment', {
      content: content.value,
      newsId: route.query.id,
      parentCommentId: replyList.value[num].id,
    }).then(() => {
      getDetailData1()
      content.value = ''
      re.value = false
    })

    if (test != replyList.value[num].length) {
      Toast.success('回复成功')
    } else {
      Toast.success('回复失败')
    }
  }
}

const reply = (index) => {
  num = index
  holder.value = replyList.value[index].userName
  if (re.value == false) {
    re.value = true
    // console.log(replyList.value[index].id)
  } else {
    re.value = false
  }
}
const light = (index) => {
  // console.log(replyList.value[index].isThump)
  if (replyList.value[index].isThump == 1) {
    replyList.value[index].isThump = 0
    post(api4 + '/index/news/comment/thumpUp', replyList.value[index].id)
  } else if (replyList.value[index].isThump == 0) {
    replyList.value[index].isThump = 1
    post(api4 + '/index/news/comment/cancelThumpUp', replyList.value[index].id)
  }
}
const lights = (index, index1) => {
  if (replyList.value[index].repairList[index1].isThump == 1) {
    replyList.value[index].repairList[index1].isThump = 0
    post(api4 + '/index/news/comment/thumpUp', replyList.value[index].repairList[index1].id)
  } else if (replyList.value[index].repairList[index1].isThump == 0) {
    replyList.value[index].repairList[index1].isThump = 1
    post(api4 + '/index/news/comment/cancelThumpUp', replyList.value[index].repairList[index1].id)
  }
}
</script>
<style lang="scss" scoped>
.page {
  width: 414px;
  height: 100%;
  background-color: #f3f4f6;
  position: fixed;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-bottom: 100px;
}
.main {
  width: 398px;
  display: flex;
  flex-direction: column;
  min-height: 242px;
  background-color: #fff;
  position: relative;
  top: 10px;
  left: 8px;
  border-radius: 6px;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  .title {
    font-size: 20px;
    font-weight: bolder;
    text-align: center;
    margin-top: 10px;
  }
  .time {
    font-size: 17px;
    text-align: center;
    margin-top: 10px;
  }
  .textbox {
    margin-top: 5px;
    margin-left: 20px;
    margin-right: 20px;
    text-align: justify;
    .content {
      font-size: 18px;
    }
  }
  .pic {
    width: 398px;
    height: 200px;
  }
  .viewitem {
    display: inline-block;
    margin-left: 250px;
    margin-top: 10px;
    img {
      width: 18px;
      height: 17px;
      margin-top: -1px;
      margin-right: 7px;
    }

    span {
      font-family: PingFang;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 14px;
      color: #878787;
    }
  }
}
.plcard {
  width: 398px;
  height: auto;
  display: flex;
  flex-direction: column;
  min-height: 242px;
  background-color: #fff;
  position: relative;
  top: 20px;
  left: 8px;
  border-radius: 6px;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  .title {
    width: 100px;
    height: 40px;
    font-size: 18px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 20px;
    margin-top: 18px;
    margin-left: 12px;
  }
  .comminfo {
    width: 398px;
    border-top: 1px solid #eeeeee;
    display: flex;
    margin-top: 8px;
    .ava1 {
      width: 41px;
      height: 41px;
      margin-left: 14px;
      border-radius: 50%;
    }
    .commname {
      font-size: 14px;
      font-family: PingFang;
      font-weight: 500;
      color: #333333;
      margin-left: 11px;
    }
    p {
      font-size: 13px;
      font-family: PingFang;
      font-weight: 400;
      color: #aaaaaa;
      margin-top: 2px;
      margin-left: 11px;
    }
  }
  .hf {
    font-size: 14px;
    font-family: PingFang;
    font-weight: 300;
    color: #333333;
    margin-left: 11px;
    position: absolute;
    left: 310px;
    margin-top: 20px;
  }
  .dz {
    width: 19px;
    height: 19px;
    margin-left: 0px;
    position: absolute;
    left: 360px;
    margin-top: 20px;
  }
  .commtext1 {
    font-family: PingFang;
    font-size: 14px;
    font-weight: bold;
    color: #444444;
    display: flex;
    width: 300px;
    text-align: justify;
    margin-left: 65px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .commtext2 {
    font-family: PingFang;
    font-size: 14px;
    font-weight: bold;
    color: #444444;
    display: flex;
    width: 265px;
    text-align: justify;
    margin-left: 100px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .no {
    display: none;
  }
  .lesser {
    width: 345px;
    border-top: 1px solid #eeeeee;
    margin-left: 53px;
    display: flex;
    margin-top: 20px;
    .ava1 {
      width: 41px;
      height: 41px;
      top: 76px;
      left: 67px;
      border-radius: 50%;
    }
    .commname {
      font-size: 14px;
      height: 0px;
      font-family: PingFang;
      font-weight: 500;
      color: #333333;
      margin-left: 11px;
    }
    p {
      font-size: 13px;
      font-family: PingFang;
      font-weight: 400;
      color: #aaaaaa;
      margin-top: 2px;
      margin-left: 11px;
    }
  }
}
.pubbox {
  width: 414px;
  height: 65px;
  background-color: #ffffff;
  position: fixed;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    height: 40px;
    width: 280px;
    float: left;
    border: 1px solid #eeeeee;
    margin-top: 3px;
    margin-left: 20px;
  }

  button {
    width: 80px;
    height: 40px;
    float: right;
    margin-top: 3px;
    margin-right: 10px;
    border-radius: 6px;
    background-color: #fa8e07;
    border: none;
    color: #ffffff;
    font-size: 18px;
  }
}
</style>
