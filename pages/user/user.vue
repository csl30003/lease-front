<template>
	<view class="container">
		<!-- 用户信息 -->
		<view v-if="isAuthInfo" class="userinfo">
			<view class="userinfo-con">
				<view class="userinfo-avatar">
					<image :src="loginResult.avatar ? loginResult.avatar : '/static/images/icon/head04.png'"
						@tap="toEditUserAvatar" />
				</view>
				<view class="userinfo-name" @tap="toEditUser">
					<view>{{ loginResult.name ? loginResult.name : "用户昵称" }}</view>
				</view>
			</view>
		</view>

		<view v-if="!isAuthInfo" class="userinfo-none">
			<view class="default-pic" @tap="toLogin">
				<image src="/static/images/icon/head04.png" />
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
						我租赁的订单
					</text>
					<view class="checkmore" data-sts="10" @tap="toOrderListPage1">
						<text>查看全部</text>
						<text class="arrowhead" />
					</view>
				</view>
				<view class="procedure">
					<view class="items" data-sts="1" @tap="toOrderListPage1">
						<image src="@/static/images/icon/toPay.png" />
						<text>待支付</text>
						<text v-if="myOrderCount.status1 > 0" class="num-badge">
							{{ myOrderCount.status1 }}
						</text>
					</view>
					<view class="items" data-sts="3" @tap="toOrderListPage1">
						<image src="@/static/images/icon/toDelivery.png" />
						<text>待收货</text>
						<text v-if="myOrderCount.status3 > 0" class="num-badge">
							{{ myOrderCount.status3 }}
						</text>
					</view>
					<view class="items" data-sts="4" @tap="toOrderListPage1">
						<image src="@/static/images/icon/toTake.png" />
						<text>待归还</text>
						<text v-if="myOrderCount.status4 > 0" class="num-badge">
							{{ myOrderCount.status4 }}
						</text>
					</view>
					<view class="items" data-sts="7" @tap="toOrderListPage1">
						<image src="@/static/images/icon/toComment.png" />
						<text>待解决</text>
						<text v-if="myOrderCount.status7 > 0" class="num-badge">
							{{ myOrderCount.status7 }}
						</text>
					</view>
				</view>
			</view>

			<!-- 订单状态 -->
			<view class="total-order">
				<view class="order-tit">
					<text style="font-weight:bold">
						我发布的订单
					</text>
					<view class="checkmore" data-sts="10" @tap="toOrderListPage2">
						<text>查看全部</text>
						<text class="arrowhead" />
					</view>
				</view>
				<view class="procedure">
					<view class="items" data-sts="2" @tap="toOrderListPage2">
						<image src="@/static/images/icon/toPay.png" />
						<text>待发货</text>
						<text v-if="hisOrderCount.status2 > 0" class="num-badge">
							{{ hisOrderCount.status2 }}
						</text>
					</view>
					<view class="items" data-sts="5" @tap="toOrderListPage2">
						<image src="@/static/images/icon/toDelivery.png" />
						<text>待收货</text>
						<text v-if="hisOrderCount.status5 > 0" class="num-badge">
							{{ hisOrderCount.status5 }}
						</text>
					</view>
					<view class="items" data-sts="6" @tap="toOrderListPage2">
						<image src="@/static/images/icon/toTake.png" />
						<text>待检查</text>
						<text v-if="hisOrderCount.status6 > 0" class="num-badge">
							{{ hisOrderCount.status6 }}
						</text>
					</view>
					<view class="items" data-sts="7" @tap="toOrderListPage2">
						<image src="@/static/images/icon/toComment.png" />
						<text>待解决</text>
						<text v-if="hisOrderCount.status7 > 0" class="num-badge">
							{{ hisOrderCount.status7 }}
						</text>
					</view>
				</view>
			</view>
			<!--end 订单状态 -->

			<view class="prod-col">
				<view class="col-item" @tap="myProduct">
					<view v-if="loginResult" class="num">

					</view>
					<view v-else class="num">
						--
					</view>
					<view class="tit">
						发布的商品
					</view>
				</view>

				<view class="col-item" @tap="myDelistedProduct">
					<view v-if="loginResult" class="num">

					</view>
					<view v-else class="num">
						--
					</view>
					<view class="tit">
						下架的商品
					</view>
				</view>

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

				<view class="col-item" @tap="toAddressList">
					<view v-if="loginResult" class="num">

					</view>
					<view v-else class="num">
						--
					</view>
					<view class="tit">
						我的地址
					</view>
				</view>

				<view class="col-item" @tap="toWallet">
					<view v-if="loginResult" class="num">

					</view>
					<view v-else class="num">
						--
					</view>
					<view class="tit">
						钱包
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
import { getOrderCountAPI } from "@/api/order"

const isAuthInfo = ref(false)
const loginResult = ref('')
const myOrderCount = ref({})
const hisOrderCount = ref({})

onShow(async () => {
	loginResult.value = uni.getStorageSync('loginResult')
	isAuthInfo.value = !!loginResult.value

	// 如果有登录
	if (isAuthInfo.value) {
		const res = await getOrderCountAPI()
		myOrderCount.value = res.data.myOrderCount
		hisOrderCount.value = res.data.hisOrderCount
	}
})

const myProduct = () => {
	uni.navigateTo({
		url: '/pages/user/myProduct'
	})
}

const myDelistedProduct = () => {
	uni.navigateTo({
		url: '/pages/user/myDelistedProduct'
	})
}

const toAddressList = () => {
	uni.navigateTo({
		url: '/pages/address/address'
	})
}

const toOrderListPage1 = (e) => {
	const sts = e.currentTarget.dataset.sts
	uni.navigateTo({
		url: '/pages/order/orderList?sts=' + sts
	})
}

const toOrderListPage2 = (e) => {
	const sts = e.currentTarget.dataset.sts
	uni.navigateTo({
		url: '/pages/order/releaseOrderList?sts=' + sts
	})
}

const myCollection = () => {
	uni.navigateTo({
		url: '/pages/collection/collection'
	})
}

const toEditUserAvatar = () => {
	uni.navigateTo({
		url: '/pages/user/editUserAvatar'
	})
}

const toEditUser = () => {
	uni.navigateTo({
		url: '/pages/user/editUser'
	})
}

const toWallet = () => {
	uni.navigateTo({
		url: '/pages/wallet/wallet'
	})
}

/**
 * 去登陆
 */
const toLogin = () => {
	uni.navigateTo({
		url: "/pages/login/login",
	})
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
	myOrderCount.value = {}
	hisOrderCount.value = {}
	uni.removeStorageSync('token')
	uni.showToast({
		title: '退出成功',
		icon: 'none'
	})
	setTimeout(() => {
		uni.switchTab({
			url: '/pages/user/user'
		})
	}, 500)
}
</script>
  
<style scoped lang="scss">
@use './user.scss';
</style>
  