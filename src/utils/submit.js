import { ref } from "vue"
import { post } from '@/utils/request.js'
import { Notify, Dialog } from 'vant'
import router from '@/router'
/**
 * 数据提交提示
 * 
 * api:请求接口url
 * object:需要判断为空的对象(可以为空)
 * msg:报错提示(可以为空)
 */

 export const submitTip = (api, object, msg) => {
  const status = ref(true)
  // 如果object有传值过来,对其属性进行判空处理
  if (JSON.stringify(object) != '') {
    for (const key in object) {
      if (object[key] == null) {
        status.value = false
        return
      }
    }
  }
  // 对象判空后的提交处理
  if (status.value) {
    post(api, object).then((res) => {
      if (res.code == 200) {//请求成功将对象的值清空,并显示提示信息
        object=''
        Dialog.alert({
          message: '添加成功,是否继续添加?',
          confirmButtonText: '继续添加',
          showCancelButton: true,
        }).catch(() => {//点击取消按钮不在继续添加后返回上一层界面
          router.back()
        })
      } else {//请求失败
        Dialog.alert({
          message: msg ? msg : res.message,
        })
      }
    })
  } else {
    Notify({ type: 'warning', message: '请选择信息后尝试提交' })
  }
}
