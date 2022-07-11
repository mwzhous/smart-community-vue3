/* *@description:广场/互助/二手/拼车详情页 *@author: 王 *@date: 2022-05-15 */
<template>
  <div class="page">
    <div class="wrapper">
      <WdNavbar :show-slot="true" title="交流详情" />
    </div>
    <PullRefresh v-model="loading" @refresh="onRefresh">
      <div class="cardlist">
        <div class="userinfo">
          <img :src="items.avatar" />
          <div class="username">
            <span>{{ items.username }}</span>
            <p>{{ items.createTime }}</p>
            <p>{{ items.createtime }}</p>
          </div>
          <div v-if="route.query.cn == '3'" class="money">
            <span>￥{{ items.nowPrice }}</span>
            <p>￥{{ items.oriPrice }}</p>
          </div>
        </div>
        <div v-if="route.query.cn == '4'" class="carinfo">
          <div class="cartime">
            <span class="time">{{ items.time }}</span>
            <span v-if="items.status == true" class="status">有车</span>
            <span v-else class="status">无车</span>
          </div>
          <div class="carlocation">
            <div class="qidian">
              <img src="../../assets/wl/39_拼车_03.png" />
              <span>{{ items.origin }}</span>
            </div>
            <div class="zhongdian">
              <img src="../../assets/wl/39_拼车_05.png" />
              <span>{{ items.destination }}</span>
            </div>
          </div>
        </div>
        <span class="msgtext">{{ items.content }} </span>
        <img v-for="(item, index1) in items.banner" :key="index1" class="banner" :src="item" />
        <div class="footer">
          <div class="viewitem" @click="dianzan">
            <img v-if="content3==1" src="../../assets/wl/36_广场_13.png" />
            <img v-if="content3!=1" src="../../assets/wl/36_广场_03.png" />
            <span>{{content3}}</span>
          </div>
          <div class="viewitem" @click="shoucang">
            <img v-if="content1===0" src="../../assets/wl/36_广场_13-05.png" />
            <img v-if="content1!=0" src="../../assets/wl/36_广场_05.png" />
            <span>{{content1}}</span>
          </div>
          <div class="viewitem">
            <img src="../../assets/wl/36_广场_14.png" />
            <span>{{content2}}</span>
          </div>
        </div>
      </div>
      <div class="plcard">
        <span class="title">全部评论</span>
        <List v-model:loading="xialoading" :finished="finished" :offset="10" finished-text="没有更多了" @load="onLoad">
          <div v-for="(item, index2) in list.list" :key="index2" class="comminfo" :src="item">
            <img :src="item.avatar" />
            <div class="commdetail">
              <span class="commname">{{ item.username }}</span>
              <span class="commtext">
                {{ item.content }}
              </span>
            </div>
          </div>
        </List>
      </div>
    </PullRefresh>
    <div class="pubbox">
      <input v-model="content" type="text" placeholder="请输入评论..." @keyup.enter="submit" />
      <button @click="hadnelSumbit">发布</button>
    </div>
  </div>
</template>
<script setup>
  import WdNavbar from '../../components/WdNavbar.vue'
  import { Toast, PullRefresh, List } from 'vant'
  import { get, api2, post } from '@/utils/request'
  import { ref, reactive } from 'vue'
  import { useRoute } from 'vue-router'
  const items = ref({})
  const content3 = ref(1)
  const content1 = ref(0)
  const content2 = ref(7)
  const route = useRoute()
  const list = reactive({})
  const content = ref('')

  const loading = ref(false)
  const xialoading = ref(false)
  const finished = ref(false)
  const page = ref(1)
  const dianzan = () => {
    if (route.query.cn == 1) {
      post(api2 + '/praise/add', { article_id: route.query.id, type_id: 1 }).then(() => {
        onRefresh()
      })
    } else if (route.query.cn == 2) {
      post(api2 + '/praise/add', { article_id: route.query.id, type_id: 2 }).then(() => {
        onRefresh()
      })
    } else if (route.query.cn == 3) {
      post(api2 + '/praise/add', { article_id: route.query.id, type_id: 3 }).then(() => {
        onRefresh()
      })
    } else {
      post(api2 + '/praise/add', { article_id: route.query.id, type_id: 4 }).then(() => {
        onRefresh()
      })
    }
    content3.value = content3.value + 1
  }
  const shoucang = () => {
    if (route.query.cn == 1) {
      post(api2 + '/collection/add', {
        news_id: items.value.id,
        title: items.value.content,
        banner: '[' + items.value.banner + ']'
      }).then((res) => {
        // console.log(res)

      })
    } else if (route.query.cn == 2) {
      post(api2 + '/collection/add', {
        news_id: items.value.id,
        title: items.value.content,
        banner: '[' + items.value.banner + ']'
      }).then((res) => {
        // console.log(res)

      })
    } else if (route.query.cn == 3) {
      post(api2 + '/collection/add', {
        news_id: items.value.id,
        title: items.value.content,
        banner: '[' + items.value.banner + ']'
      }).then((res) => {
        // console.log(res)

      })
    } else {
      post(api2 + '/collection/add', {
        news_id: items.value.id,
        title: items.value.content,
        banner: '[' + items.value.banner + ']'
      }).then((res) => {
        // console.log(res)

      })
    }
    content1.value = content1.value + 1
  }
  const onRefresh = async () => {
    page.value = 1
    finished.value = false
    list.list = []
    let url = api2 + '/community/comment/' + route.query.cn + '/' + route.query.id
    const result = await get(url, { Index: page.value - 1, size: 5 })
    if (list.data) {
      list.list = result
    }
    loading.value = false;
    xialoading.value = false
  }
  const onLoad = async () => {
    page.value++
    let url = api2 + '/community/comment/' + route.query.cn + '/' + route.query.id
    get(url, { Index: page.value - 1, size: 5 }).then((result) => {
      if (result.length > 0) {
        if (list.list) list.list.push(...result)
        else list.list = result
        xialoading.value = false
      } else {
        finished.value = true
      }
    })
  }

  const getDetailData = async () => {
    let url = api2 + '/community/' + route.query.id
    const result = await get(url)
    result.banner = result.banner.slice(1, result.banner.length - 1).split(',')
    items.value = result
  }
  if (route.query.cn == '1') {
    getDetailData()
  }
  const getDetailData1 = async () => {
    let url = api2 + '/community/interact/' + route.query.id
    const result = await get(url)
    result.banner = result.banner.slice(1, result.banner.length - 1).split(',')
    items.value = result
  }
  if (route.query.cn == '2') {
    getDetailData1()
  }
  const getDetailData2 = async () => {
    let url = api2 + '/community/sechand/' + route.query.id
    const result = await get(url)
    result.banner = result.banner.slice(1, result.banner.length - 1).split(',')
    items.value = result
  }
  if (route.query.cn == '3') {
    getDetailData2()
  }
  const getDetailData3 = async () => {
    let url = api2 + '/community/car/' + route.query.id
    const result = await get(url)
    result.banner = result.banner.slice(1, result.banner.length - 1).split(',')
    items.value = result
  }
  if (route.query.cn == '4') {
    getDetailData3()
  }
  const comment = async () => {
    let url = api2 + '/community/comment/' + route.query.cn + '/' + route.query.id
    const result = await get(url, { Index: 1, size: 1000 })
    // console.log(result)
    list.list = result
  }

  const hadnelSumbit = () => {
    post(api2 + '/community/comment/add', {
      content: content.value,
      article_id: route.query.id,
      type_id: route.query.cn,
    }).then(() => {
      comment()
      content.value = ''
    })
    Toast.success('评论成功')
  }
  const submit = () => {
    post(api2 + '/community/comment/add', {
      content: content.value,
      article_id: route.query.id,
      type_id: route.query.cn,
    }).then(() => {
      comment()
      content.value = ''
    })
    Toast.success('评论成功')
  }
</script>
<style lang="scss" scoped>
  .page {
    background-color: #f1f2f4;
    height: 100%;
    width: 100%;
    position: fixed;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-bottom: 150px;

    .cardlist {
      margin: 18px auto;
      display: flex;
      flex-direction: column;
      width: 394px;
      height: auto;
      background-color: #ffffff;
      border-radius: 6px;

      .userinfo {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        margin-top: 16px;
        margin-left: 18px;

        img {
          width: 41px;
          height: 41px;
          border-radius: 50%;
        }

        .username {
          margin-left: 11px;
          position: relative;
          top: 3px;

          span {
            font-size: 16px;
            font-family: PingFang;
            font-weight: bold;
            color: #333333;
            line-height: 20px;
            position: relative;
          }

          p {
            font-size: 13px;
            font-family: PingFang;
            font-weight: 400;
            color: #aaaaaa;
            line-height: 20px;
            position: relative;
            width: 200px;
          }
        }

        .money {
          display: flex;
          flex-direction: column;
          margin-left: 27px;
          position: relative;
          top: 1px;

          span {
            font-size: 16px;
            font-family: PingFang;
            font-weight: bold;
            color: #dc3333;
            margin-left: 14px;
          }

          p {
            font-size: 12px;
            font-family: PingFang;
            font-weight: 400;
            text-decoration: line-through;
            color: #aaaaaa;
            margin-left: 16px;
          }
        }
      }

      .carinfo {
        width: 357px;
        height: 60px;
        background-color: #e7e9ec;
        border-radius: 6px;
        margin-top: 10px;
        margin-left: 18px;

        .cartime {
          margin-top: 5px;
          margin-left: 15px;

          .time {
            font-size: 14px;
            font-family: PingFang;
            font-weight: 500;
            color: #666666;
          }

          .status {
            margin-left: 45px;
            font-size: 18px;
            font-family: PingFang;
            font-weight: 700;
            color: #666666;
          }
        }

        .carlocation {
          display: flex;
          margin-left: 7px;
          margin-top: 4px;

          .qidian {
            img {
              width: 16px;
              height: 18px;
            }

            span {
              position: relative;
              top: -4px;
              margin-left: 2px;
              font-size: 14px;
              font-family: PingFang;
              font-weight: bold;
              color: #444444;
            }
          }

          .zhongdian {
            margin-left: 25px;

            img {
              width: 16px;
              height: 18px;
            }

            span {
              position: relative;
              top: -4px;
              font-size: 14px;
              margin-left: 2px;
              font-family: PingFang;
              font-weight: bold;
              color: #444444;
            }
          }
        }
      }

      .msgtext {
        width: 358px;
        margin-top: 5px;
        margin-left: 18px;
        font-size: 16px;
        font-family: PingFang;
        font-weight: 400;
        color: #444444;
        line-height: 23px;
        text-align: justify;
      }

      .banner {
        width: 357px;
        height: 180px;
        margin-top: 3px;
        margin-left: 17px;
        margin-right: 17px;
        object-fit: contain;
        object-position: center;
      }

      .footer {
        display: flex;
        flex-direction: row;
        align-items: center;
        align-self: center;
        margin-top: 12px;
        padding-bottom: 16px;
        justify-content: center;
        width: 394px;

        .viewitem {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin: auto 44px;

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
    }

    .plcard {
      margin: 12px auto;
      display: flex;
      flex-direction: column;
      width: 394px;
      // min-height: 242px;
      height: auto;
      background-color: #ffffff;
      border-radius: 6px;
      /* padding-bottom: 100px; */

      .title {
        font-size: 16px;
        font-family: PingFang;
        font-weight: bold;
        color: #333333;
        line-height: 20px;
        margin-top: 15px;
        margin-left: 15px;
        margin-bottom: 15px;
      }

      .comminfo {
        position: relative;
        display: flex;
        align-items: center;
        height: 75px;
        border-top: 1px solid #eeeeee;

        img {
          width: 41px;
          height: 41px;
          margin-left: 14px;
          margin-top: 1px;
          position: relative;
          border-radius: 50%;
        }
      }

      .commdetail {
        display: flex;
        flex-direction: column;
        margin-top: 1px;
        margin-left: 11px;

        .commname {
          font-family: PingFang;
          font-size: 16px;
          color: #333333;
          font-size: 16px;
          font-family: PingFang;
          font-weight: bold;
          color: #333333;
        }

        .commtext {
          width: 320px;
          position: relative;
          font-family: PingFang;
          font-size: 14px;
          color: #444444;
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
  }
</style>