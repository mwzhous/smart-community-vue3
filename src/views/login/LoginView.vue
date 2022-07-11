<!-- @author: 陈旺 -->
<template>
  <ConfigProvider :theme-vars="loginTheme">
    <div class="wrapper">
      <img :src="logo" alt="" class="wrapper__logo" />
      <Tabs :active="active" background="transparent" line-width="70px">
        <Tab title="账号密码登录">
          <Form @submit="onPassword">
            <CellGroup inset>
              <Field
                v-model="account"
                name="account"
                left-icon="manager"
                placeholder="请输入账号"
                :rules="[{ required: true, message: '请输入账号' }]"
              />
              <Field
                v-model="password"
                type="password"
                name="password"
                left-icon="lock"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请填写密码' }]"
              />
            </CellGroup>
            <router-link :to="{ name: 'ResetView' }" class="wrapper--ignore">
              忘记密码?
            </router-link>
            <div class="wrapper__login-btn">
              <Button block color="linear-gradient(90deg, #fa8e07, #f17716)" native-type="submit">
                登录
              </Button>
            </div>
          </Form>
        </Tab>
        <Tab title="短信验证码登录">
          <Form @submit="onverify">
            <CellGroup inset>
              <Field
                v-model="phone"
                name="phone"
                left-icon="phone"
                placeholder="请输入手机号"
                :rules="[{ required: true, message: '请填写手机号' }]"
              />
              <Field
                v-model="verifyCode"
                name="verifyCode"
                left-icon="comment"
                placeholder="请输入验证码"
                :rules="[{ required: true, message: '请填写验证码' }]"
                ><template #button>
                  <span class="send-code" @click="sendCode">发送验证码</span>
                </template></Field
              >
            </CellGroup>
            <div class="wrapper__verify-btn">
              <Button block color="linear-gradient(90deg, #fa8e07, #f17716)" native-type="submit">
                登录
              </Button>
            </div>
          </Form>
        </Tab>
      </Tabs>

      <hr class="hr-solid-content" data-content="第三方登录" />
      <div class="wrapper__other-login">
        <img
          src="https://riddler.oss-cn-shanghai.aliyuncs.com/upload/钉钉01.png"
          alt="钉钉"
          @click="ddLogin"
        />
        <img
          src="https://riddler.oss-cn-shanghai.aliyuncs.com/upload/GitHub.png"
          alt="github"
          @click="githubLogin"
        />
      </div>
    </div>
  </ConfigProvider>
</template>
<script setup>
import logo from '@/assets/logo.png'
import { Form, Field, CellGroup, Button, ConfigProvider, Tab, Tabs, Toast } from 'vant'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '@/utils/request'
const loginTheme = {
  buttonBorderRadius: '10px',
  buttonNormalPadding: '0px 40px',
  fieldIconSize: '20px',
}
const active = ref(1)
const account = ref('')
const password = ref('')
const phone = ref('')
const verifyCode = ref('')

const router = useRouter()
const store = useStore()
// 密码登录
const onPassword = (values) => {
  store
    .dispatch('user/login', values)
    .then(() => {
      // TODO: 登录后操作
      router.push('/login/guide')
    })
    .catch((err) => {
      Toast.fail('密码或账号输入错误')
      // console.log(err)
    })
}
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
// 验证码登录
const onverify = (values) => {
  store
    .dispatch('user/loginByPhone', values)
    .then((data) => {
      if (data.info.isNewUser) {
        router.push({ name: 'BindOwner' })
        Toast.success('注册成功，请填写用户信息')
      } else {
        router.push('/login/guide')
      }
    })
    .catch((err) => {
      Toast.fail('验证码错误')
      // console.log(err)
    })
}
// 第三方登录
const ddLogin = () => {
  get('/dd/render').then((res) => {
    window.location.href = res
  })
}
const githubLogin = () => {
  get('/github/render').then((res) => {
    window.location.href = res
  })
}
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: #f3f4f6;
  height: 100vh;
  width: 100%;
  padding-top: 60px;
  @include px(20px);
  &__logo {
    display: block;
    width: 64px;
    margin: auto;
    margin-bottom: 50px;
    border-radius: 17px 0 17px 0;
  }
  &--ignore {
    color: $c8;
    font-size: $fs-s;
    float: right;
    margin: 20px 0 23px;
  }
  &__login-btn {
    margin-bottom: 73px;
  }
  &__verify-btn {
    margin-top: 60px;
    margin-bottom: 73px;
  }
  &__other-login {
    display: flex;
    justify-content: center;
    gap: 72px;
    img {
      width: 58px;
      height: 58px;
    }
  }
  .send-code {
    color: $wd-primary;
    padding-right: 16px;
  }
}
.van-field {
  line-height: 60px;
}
:deep(.van-field__error-message) {
  line-height: 20px;
}

:deep(.van-icon) {
  padding: 0 20px;
}
.hr-solid-content {
  color: #a2a9b6;
  border: 0;
  font-size: 12px;
  padding: 1em 0;
  position: relative;
}
.hr-solid-content::before {
  content: attr(data-content);
  position: absolute;
  padding: 0 1ch;
  line-height: 1px;
  border: solid #d0d0d5;
  border-width: 0 99vw;
  width: fit-content;
  /* for 不支持fit-content浏览器 */
  white-space: nowrap;
  left: 50%;
  transform: translateX(-50%);
}
</style>
