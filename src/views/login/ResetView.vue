<!-- @author: 陈旺 -->
<template>
  <ConfigProvider :theme-vars="resetTheme">
    <WdNavbar title="重置密码" />

    <div class="wrapper">
      <Form @submit="changePassword">
        <CellGroup inset class="wrapper__cell">
          <!-- 通过 pattern 进行正则校验 -->
          <Field
            v-model="phone"
            name="phone"
            left-icon="phone"
            placeholder="请输入手机号"
            :rules="[{ pattern, message: '请输入正确号码' }]"
          />
          <!-- 通过 validator 进行函数校验 -->
          <Field
            v-model="password"
            name="password"
            type="password"
            left-icon="lock"
            placeholder="请输入6-12位密码"
            :rules="[{ validator, message: '输入必须为6-12位的数字和字母的组合' }]"
          >
            <template #button>
              <span class="send-code" @click="sendCode">发送验证码</span>
            </template>
          </Field>
          <!-- 确认密码 -->
          <Field
            v-model="rePassword"
            name="rePassword"
            left-icon="lock"
            type="password"
            placeholder="确认密码"
            :rules="[{ validator: validatorMessage, message: '两次输入的密码不一致' }]"
          />
          <Field
            v-model="verifyCode"
            type="verifyCode"
            name="verifyCode"
            left-icon="comment"
            placeholder="请输入验证码"
            :rules="[{ required: true, message: '请填写验证码' }]"
          />
        </CellGroup>
        <Checkbox v-model="checked" checked-color="#ed7545" icon-size="15px"
          >已阅读并同意《用户协议》</Checkbox
        >
        <div class="wrapper__confirm">
          <Button
            block
            color="linear-gradient(90deg, #fa8e07, #f17716)"
            native-type="submit"
            :disabled="!checked"
          >
            确认
          </Button>
        </div>
      </Form>
    </div>
  </ConfigProvider>
</template>
<script setup>
import { ref } from '@vue/reactivity'
import { Form, Field, CellGroup, Button, ConfigProvider, Toast, Checkbox } from 'vant'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import WdNavbar from '../../components/WdNavbar.vue'
import { useStore } from 'vuex'
import { get } from '@/utils/request'
const store = useStore()
const resetTheme = {
  buttonBorderRadius: '10px',
  fieldIconSize: '20px',
}
const phone = ref(store.getters.userInfo.phone)
const password = ref('')
const rePassword = ref('')
const verifyCode = ref('')
const pattern = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
const checked = ref(false)

// 校验函数返回 true 表示校验通过，false 表示不通过
const validator = (val) => /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(val)

const validatorMessage = (val) => val == password.value

const router = useRouter()

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
// 重置密码
const changePassword = (val) => {
  post('/password/reset', val)
    .then(() => {
      Toast.success('修改成功')
      router.push('/login')
    })
    .catch((err) => {
      Toast.fail('验证码错误')
      // console.log(err)
    })
}
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: #f3f4f6;
  height: calc(100vh - 44px);
  @include px(20px);
  padding-top: 20px;
  &__confirm {
    margin-top: 53px;
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
}
.van-field {
  line-height: 60px;
}
:deep(.van-field__error-message) {
  line-height: 20px;
}
</style>
