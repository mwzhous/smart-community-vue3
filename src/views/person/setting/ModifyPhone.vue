<template>
  <WdNavbar title="修改手机号" />
  <div class="wrapper">
    <img :src="bindPhone" />
    <p>绑定手机号</p>
    <ConfigProvider :theme-vars="modifyTheme">
      <Form @submit="modifyPhone">
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
      </Form>
    </ConfigProvider>
  </div>
</template>
<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import bindPhone from '@/assets/img/bindphone.png'
import { Form, Field, CellGroup, ConfigProvider, Toast, Button } from 'vant'
import { post, get, put, api1 } from '@/utils/request'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const router = useRouter()
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
// 绑定
const modifyPhone = () => {
  post(api1 + '/check/phone', {
    phone: phone.value,
    verifyCode: verifyCode.value,
  })
    .then((data) => {
      // console.log(data)
      savaInfo()
    })
    .catch(() => {
      Toast.fail('验证码错误')
    })
}
// 提交修改信息
const savaInfo = () => {
  put(api1 + '/personal', {
    id: store.getters.userInfo.id,
    gender: store.getters.userInfo.gender,
    phone: phone.value,
  })
    .then((res) => {
      Toast.success('修改成功')
      store.getters.userInfo.phone = res.phone
      router.back()
    })
    .catch((err) => {
      Toast.fail('修改失败，请重试')
      // console.log(err)
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
