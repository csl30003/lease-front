<template>
  <view class="con">
    <image src="@/static/images/icon/login.png" />
    <!-- 登录 -->
    <view class="login-form">
      <view :class="['item', errorTips == 1 ? 'error' : '']">
        <view class="account">
          <text class="input-item">
            账号
          </text>
          <input type="text" data-type="account" placeholder-class="inp-palcehoder" placeholder="请输入用户名"
            @input="getInputVal">
        </view>
        <view v-if="errorTips == 1" class="error-text">
          <text class="warning-icon">
            !
          </text>
          请输入账号！
        </view>
      </view>
      <view :class="['item', errorTips == 2 ? 'error' : '']">
        <view class="account">
          <text class="input-item">
            密码
          </text>
          <input type="password" data-type="password" placeholder-class="inp-palcehoder" placeholder="请输入密码"
            @input="getInputVal">
        </view>
        <view v-if="errorTips == 2" class="error-text">
          <text class="warning-icon">
            !
          </text>
          请输入密码！
        </view>
      </view>
      <view class="operate">
        <view class="to-register" @tap="toRegitser">
          还没有账号？
          <text>去注册></text>
        </view>
      </view>
    </view>

    <view>
      <button class="authorized-btn" @tap="login">
        登录
      </button>
      <button class="to-idx-btn" @tap="toIndex">
        回到首页
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, watch } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { loginAPI } from "@/api/user"

/**
 * 生命周期函数--监听页面显示
 */
onShow(() => {
  // 头部导航标题
  uni.setNavigationBarTitle({
    title: '用户登录'
  })
})

const principal = ref('') // 账号
const errorTips = ref(0) // 错误提示
watch(
  () => principal.value,
  () => {
    errorTips.value = 0
  }
)

const credentials = ref('') // 密码
/**
 * 输入框的值
 */
const getInputVal = (e) => {
  const type = e.currentTarget.dataset.type
  if (type == 'account') {
    principal.value = e.detail.value
  } else if (type == 'password') {
    credentials.value = e.detail.value
  }
}

/**
 * 登录
 */
const login = async () => {
  if (principal.value.length == 0) {
    errorTips.value = 1
  } else if (credentials.value.length == 0) {
    errorTips.value = 2
  } else {
    errorTips.value = 0

    // 调用登录API
    let res = await loginAPI({
      name: principal.value,
      password: credentials.value
    })
    // setStorageSync
    uni.setStorageSync('token', res.data.token)
    uni.setStorageSync('loginResult', {
      id: res.data.id,
      name: res.data.name,
      avatar: res.data.avatar,
      gender: res.data.gender,
    })

    uni.showToast({
      title: '登录成功',
      icon: 'none',
      complete: () => {
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/user/user'
          })
        }, 500)
      }
    })
  }
}

/**
 * 去注册
 */
const toRegitser = async () => {
  uni.navigateTo({
    url: '/pages/register/register'
  })
}

/**
 * 回到首页
 */
const toIndex = () => {
  wx.switchTab({
    url: '/pages/index/index'
  })
}
</script>

<style scoped lang="scss">
@import "./login.scss";
</style>
  