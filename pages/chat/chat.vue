<template>
	<view>
		<view>
			<view>
				<view class="header">
					<image src="/static/logo.png"></image>
				</view>
				<view class="content">
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>
				<button class="bottom" type="primary" :disabled="userInfoDisabled" @click="wxGetUserInfo">授权登录</button>
			</view>
		</view>
		<van-overlay :show="overlayShow">
			<view class="login-wrapper">
				<view class="login-bottom">
					<button type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">绑定手机号</button>
				</view>
			</view>
		</van-overlay>
	</view>
</template>

<script setup>
import {
	ref,
	reactive,
	getCurrentInstance
} from 'vue'
import {
	onLoad
} from '@dcloudio/uni-app'

let code = ''
onLoad(async () => {
  const res = await wx.login()
  code = res.code
  console.log('code is', code)
})

const {
	proxy
} = getCurrentInstance()
const userInfoDisabled = ref(false)
const userInfo = reactive({
	thirdAppType: 1,
	thirdUserId: "",
	nickName: '',
	wechatPicture: ''
})
const sessionKey = ref('') // session码
const pageOption = ref()
const overlayShow = ref(false)
const wxGetUserInfo = () => {
	if (uni.getUserProfile) {
		uni.getUserProfile({
			desc: 'Wexin', // 这个参数是必须的
			success: result => {
				uni.showLoading({
					title: '授权中...'
				});
				userInfoDisabled.value = true
				userInfo.nickName = result.userInfo.nickName
				userInfo.wechatPicture = result.userInfo.avatarUrl
				proxy.$api.user.login({
					thirdAppType: userInfo.thirdAppType,
					thirdUserId: userInfo.thirdUserId,
					nickName: userInfo.nickName,
					wechatPicture: userInfo.wechatPicture
				}).then(res => {
					userInfoDisabled.value = false
					uni.hideLoading();
					if (res.data.bindSpecialCode == 203) {
						uni.setStorageSync('id', res.data.id);
						uni.setStorageSync('nickName', res.data.nickName);
						uni.setStorageSync('wechatPicture', res.data.wechatPicture);
						overlayShow.value = true
						return
					} else {
						uni.showToast({
							title: '登录成功'
						})
						uni.setStorageSync('id', res.data.id);
						uni.setStorageSync('nickName', res.data.nickName);
						uni.setStorageSync('wechatPicture', res.data.wechatPicture);
						uni.setStorageSync('tel', res.data.tel.data);
						// 然后跳回原页面
						if (pageOption.value.backtype == 1) {
							uni.redirectTo({
								url: '/pages/chat/chat'
							})
						} else {
							uni.switchTab({
								url: '/pages/chat/chat'
							})
						}
					}
				}).catch(e => {
					userInfoDisabled.value = false
					uni.hideLoading();
					uni.showToast({
						title: '用户信息操作失败',
						icon: 'none'
					});
				})
			},
			fail: res => {
				console.log('用户拒绝授权信息');
			}
		})
	} else {
		uni.showToast({
			title: '获取用户信息失败',
			icon: 'none'
		});
	}
}
</script>

<style></style>
