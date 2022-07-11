/* **@author: 王浩南  */
<template>
  <div class="info">
    <div class="btn">X</div>
    <div class="block">
      <h1 class="parkName">{{name}}</h1>
      <span class="startTime">更新时间:{{updateTime}}</span>

      <h2>未超过24小时</h2>
      <h3>
        场景一:停了100分钟免费时长设置的是{{freeTime}}分钟,首段时长是{{firstPeriod}}分钟,收费{{firstAmount}}元,单位间隔是10分钟收费{{unitAmount}}元那么计费规则为
      </h3>
      <ol>
        <li>
          1. 先减去免费时间{{freeTime}}分钟 剩余时间 = 100-减首段收费时间剩余时间 = {{100-freeTime}} - {{firstPeriod}} = {{100-freeTime-firstPeriod}} 分钟收费 =
          0 + {{firstAmount}} = {{firstAmount}}元
        </li>
        <li>2. 计算间隔时间收费 收费 = 0 + {{firstAmount}} + {{(100-freeTime-firstPeriod)/10}} x {{unitAmount}} = {{firstAmount+(100-freeTime-firstPeriod)/10*unitAmount}}元</li>
      </ol>
      <h2>超过24小时 设置了24小时封顶</h2>
      <h3>
        场景二:停了48小时50分钟,免费时长设置的是{{freeTime}}分钟,首段时长是{{firstPeriod}}分钟,收费{{firstAmount}}元,单位间隔是10分钟收费{{unitAmount}}元,24小时封顶收费为{{cappingAmount}}元,那么计费规则为：
      </h3>
      <ol>
        <li>1. 先减去免费时间{{freeTime}}分钟 剩余时间 = 48小时50分钟 - {{freeTime}}分钟 = 48小时{{50-freeTime}}分钟 收费 = 0元</li>
        <li>
          2. 减去封顶时间段 因为48小时满足两次封顶,所以计费规则为： 剩余时间 = 48小时{{50-freeTime}}分钟 - 48小时
          ={{50-freeTime}} 分钟 收费金额 = 0 + {{cappingAmount}} x 2 = {{cappingAmount*2}}元
        </li>
        <li>3. 减去首段收费时间 剩余时间 = {{50-freeTime}}分钟 - {{firstPeriod}} =  {{50-freeTime-firstPeriod}} 分钟 收费 = {{cappingAmount*2}} + {{firstAmount}} = {{(cappingAmount*2+firstAmount)}}元</li>
        <li>4. 计算间隔时间收费 收费 = {{(cappingAmount*2+firstAmount)}} + ( {{50-freeTime-firstPeriod}} ÷ 10) x {{unitAmount}} =  {{(cappingAmount*2+firstAmount)+ ((50-freeTime-firstPeriod)/10)*unitAmount}}元</li>
      </ol>
      <h2>超过24小时 未设置24小时封顶</h2>
      <h3>
        场景三:停了48小时50分钟,免费时长设置的是{{freeTime}}分钟,首段时长是{{firstPeriod}}分钟,收费{{firstAmount}}元,单位间隔是10分钟收费{{unitAmount}}元,24小时封顶未设置,那么计费规则为：
      </h3>
      <ol>
        <li>1. 先减去免费时间{{freeTime}}分钟 剩余时间 = 48小时50分钟 - {{freeTime}}分钟 = 48小时{{50-freeTime}}分钟 收费 = 0元</li>
        <li>
          2.减去首段收费时间 剩余时间 = 48小时{{50-freeTime}}分钟 - {{firstPeriod}}分钟 = 48小时{{50-freeTime-firstPeriod}}分钟 收费 = 0 + {{firstAmount}} = {{firstPeriod}}元
        </li>
        <li>3.计算间隔时间收费 收费 = {{firstAmount}} + ((48 * 60 + {{50-freeTime-firstPeriod}}) ÷ 10) x {{unitAmount}} = {{firstAmount+((2880+(50-freeTime-firstPeriod))/10)*unitAmount}}元</li>
      </ol>
      <h2>详情解释</h2>
      <ol>
        <li>
          1. 免费时长就是要减免的时长 比如免费时长{{freeTime}}分钟 那停了40分钟,就只需要(40-{{freeTime}}) = {{40-freeTime}}分钟的钱
        </li>
        <li>
          2. 24小时封顶就是每24小时收费多少的意思,但是只对开启了24小时封顶才生效 比如24小时封顶
          {{cappingAmount}}元,那停了49个小时,就是2 * {{cappingAmount}} + 1个小时的钱
        </li>
        <li>
          3. 首段时长/分钟
          首段价格/元这个就是超出免费时间以后，第一段（首段时长）需要收费的金额（首段金额）间隔收费时长（分钟）
          间隔收费金额（元）这个就是减去免费时间和首段时长以后,每(单位时间)需要收费的金额（间隔收费金额）
        </li>
      </ol>
    </div>
  </div>
</template>
<script setup>
defineProps({
  //停车场名字
  name: String,
  // 免费时间
  freeTime: String,
  // 更新时间
  updateTime: String,
  // 首段时长
  firstPeriod:Number,
  // 首段价格
  firstAmount:Number,
  // 超出首段价格
  unitAmount:Number,
  // 封顶价格
  cappingAmount:Number
})
</script>
<style lang="scss" scoped>
.info {
  width: 70%;
  height: 70%;
  background-color: #fff;
  overflow: scroll;
  padding: 15px;
  border-radius: 5px;
  position: relative;
}
.btn {
  text-align: center;
  line-height: 15px;
  position: fixed;
  font-size: 15px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: rgb(84, 80, 80);
  border: 1px solid rgb(175, 175, 175);
  right: 80px;
  color: rgb(236, 232, 232);
  box-shadow: 0px 0px 2px rgba(84, 80, 80, 0.704);
}
.block {
  .parkName {
    font-size: 20px;
    margin-right: 10px;
  }
  .startTime {
    display: flex;
    justify-content: end;
    font-size: 10px;
    color: rgba(51, 51, 51, 0.71);
  }

  h2 {
    font-size: 15px;
    margin: 10px 0;
    font-weight: 600;
  }
  h3 {
    font-size: xx-small;
    margin: 10px 0;
  }

  li {
    font-size: small;
    font-weight: 400;
    margin-bottom: 10px;
    color: rgba(51, 51, 51, 0.778);
  }
}
</style>
