<template>
  <div>
    <WdNavbar title="绑定手机号" />
    <div class="wrapper">
      <img :src="bindPhone" />
      <p>{{ route.query.account }},首次登录请绑定手机号</p>
      <ConfigProvider :theme-vars="modifyTheme">
        <Form @submit="thirdBind">
          <CellGroup inset class="wrapper__cell">
            <Field
              v-model="phone"
              name="phone"
              left-icon="phone"
              placeholder="请输入手机号"
              :rules="[{ pattern, message: '请输入正确号码' }]"
            />
            <Field
              v-model="verifyCode"
              type="verifyCode"
              name="verifyCode"
              left-icon="comment"
              placeholder="请输入验证码"
              :rules="[{ required: true, message: '请填写验证码' }]"
            >
              <template #button>
                <span class="send-code" @click="sendCode">发送验证码</span>
              </template>
            </Field>
          </CellGroup>
          <div class="wrapper__confirm">
            <Button block color="linear-gradient(90deg, #fa8e07, #f17716)" native-type="submit">
              绑定
            </Button>
          </div>
          {{ token }}
        </Form>
      </ConfigProvider>
    </div>
  </div>
</template>
<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import bindPhone from '@/assets/img/bindphone.png'
import { Form, Field, CellGroup, ConfigProvider, Toast, Button } from 'vant'
import { get, post } from '@/utils/request'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const store = useStore()
const modifyTheme = {
  fieldIconSize: '20px',
}
const phone = ref('')
const verifyCode = ref('')
const pattern = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/

// 发送验证码
const sendCode = () => {
  get('/code', { phone: phone.value })
    .then((res) => {
      Toast({
        message: res,
        icon: 'like-o',
        duration: 3000,
        position: 'top',
      })
    })
    .catch(() => {
      Toast.fail('获取验证码失败')
    })
}
// 保存Token
const setToken = () => {
  const token = route.query.token
  if (token) {
    store.commit('user/setToken', token)
  }
}
setToken()
// 三方登录绑定
const thirdBind = () => {
  post('/auth/binding', {
    account: route.query.account,
    phone: phone.value,
    verifyCode: verifyCode.value,
  })
    .then(() => {
      Toast.success('绑定成功')
      // 跳到个人资料设置页
      router.push({ name: 'PersonalData' })
    })
    .catch(() => {
      Toast.fail('绑定失败')
    })
}
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: #f3f4f6;
  height: calc(100vh - 44px);
  padding: 37px 20px 0;

  img {
    display: block;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    margin: 0 auto 27px;
  }
  p {
    text-align: center;
    font-size: 21px;
    margin-bottom: 16px;
  }
  button {
    height: 52px;
    width: 374px;
    margin-top: 30px;
    background: $primary-lg;
    color: $cf;
    font-size: 20px;
    border-radius: 8px;
  }
  .send-code {
    color: $wd-primary;
    padding-right: 16px;
  }
  &__cell {
    margin-bottom: 18px;
    :deep(.van-icon) {
      padding: 0 20px;
    }
  }
  &__confirm {
    margin-top: 53px;
  }
}
.van-field {
  line-height: 60px;
}
:deep(.van-field__error-message) {
  line-height: 20px;
}
</style>
