<template>
	<view class="container">
		<!-- 用户信息 -->
		<view v-if="isAuthInfo" class="userinfo">
			<view class="userinfo-con">
				<view class="userinfo-avatar">
					<image :src="loginResult.avatar ? loginResult.avatar : '/static/images/icon/head04.png'" @tap="toEditUser" />
				</view>
				<view class="userinfo-name">
					<view>{{ loginResult.name ? loginResult.name : "用户昵称" }}</view>
				</view>
			</view>
		</view>

		<view v-if="!isAuthInfo" class="userinfo-none">
			<view class="default-pic" @tap="toLogin">
				<image src="@/static/images/icon/head04.png" />
			</view>
			<view class="none-login" @tap="toLogin">
				<button class="unlogin">
					未登录
				</button>
				<button class="click-login">
					点击登录账号
				</button>
			</view>
		</view>
		<!-- end 用户信息 -->

		<view class="list-cont">
			<!-- 订单状态 -->
			<view class="total-order">
				<view class="order-tit">
					<text style="font-weight:bold">
						我的订单
					</text>
					<view class="checkmore" data-sts="0" @tap="toOrderListPage">
						<text>查看全部</text>
						<text class="arrowhead" />
					</view>
				</view>
				<view class="procedure">
					<view class="items" data-sts="1" @tap="toOrderListPage">
						<image src="@/static/images/icon/toPay.png" />
						<text>待支付</text>
						<text v-if="orderAmount.unPay > 0" class="num-badge">
							{{ orderAmount.unPay }}
						</text>
					</view>
					<view class="items" data-sts="2" @tap="toOrderListPage">
						<image src="@/static/images/icon/toDelivery.png" />
						<text>待发货</text>
						<text v-if="orderAmount.payed > 0" class="num-badge">
							{{ orderAmount.payed }}
						</text>
					</view>
					<view class="items" data-sts="3" @tap="toOrderListPage">
						<image src="@/static/images/icon/toTake.png" />
						<text>待收货</text>
						<text v-if="orderAmount.consignment > 0" class="num-badge">
							{{ orderAmount.consignment }}
						</text>
					</view>
					<view class="items" data-sts="5" @tap="toOrderListPage">
						<image src="@/static/images/icon/toComment.png" />
						<text>已完成</text>
					</view>
				</view>
			</view>
			<!--end 订单状态 -->

			<view class="prod-col">
				<view class="col-item" @tap="myCollection">
					<view v-if="loginResult" class="num">
						
					</view>
					<view v-else class="num">
						--
					</view>
					<view class="tit">
						收藏
					</view>
				</view>
				<view class="col-item" @tap="handleTips">
					<view v-if="loginResult" class="num">
						
					</view>
					<view v-else class="num">
						--
					</view>
					<view class="tit">
						消息
					</view>
				</view>
				<view class="col-item" @tap="toAddressList">
					<view v-if="loginResult" class="num">
						
					</view>
					<view v-else class="num">
						--
					</view>
					<view class="tit">
						地址
					</view>
				</view>
			</view>
			<!--end 列表项 -->

			<view v-if="isAuthInfo" class="log-out" @tap="logout">
				<view class="log-out-n">
					<text>退出登录</text>
				</view>
			</view>
		</view>
	</view>
</template>
  
<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { logoutAPI } from "@/api/user"

const isAuthInfo = ref(false)
const loginResult = ref('')
const orderAmount = ref('')
/**
 * 生命周期函数--监听页面显示
 */
onShow(() => {
	loginResult.value = uni.getStorageSync('loginResult')
	isAuthInfo.value = !!loginResult.value
})

const toAddressList = () => {
	uni.navigateTo({
		url: '/pages/address/address'
	})
}

const toOrderListPage = (e) => {
	const sts = e.currentTarget.dataset.sts
	uni.navigateTo({
		url: '/pages/orderList/orderList?sts=' + sts
	})
}

/**
 * 我的收藏跳转
 */
const myCollection = () => {
	let url = '/pages/prod-classify/prod-classify?sts=5'
	const id = 0
	const title = '我的收藏商品'
	if (id) {
		url += '&tagid=' + id + '&title=' + title
	}
	uni.navigateTo({
		url
	})
}

/**
 * 跳转到编辑用户信息
 */
const toEditUser = () => {
	uni.navigateTo({
		url: '/pages/user/editUser'
	})

}

/**
 * 去登陆
 */
const toLogin = () => {
	uni.showModal({
		title: "提示",
		content: "请登录",
		showCancel: false,
		success(res) {
			setTimeout(() => {
				uni.navigateTo({
					url: "/pages/login/login",
				})
			}, 500);
		},
	});
}

/**
 * 退出登录
 */
const logout = async () => {
	// 调用登录API
	await logoutAPI()

	uni.removeStorageSync('loginResult')
	isAuthInfo.value = false
	loginResult.value = ''
	uni.removeStorageSync('token')
	uni.showToast({
		title: '退出成功',
		icon: 'none'
	})
	orderAmount.value = ''
	setTimeout(() => {
		uni.switchTab({
			url: '/pages/index/index'
		})
	}, 500)
}
</script>
  
<style scoped lang="scss">
@use './user.scss';
</style>
  