<template>
	<!-- 商品详情 -->
	<view class="container">
		<!-- 主图 -->
		<view class="mainImage">
			<image :src="mainImage" />
		</view>

		<!-- 商品信息 -->
		<view class="prod-info">
			<view class="tit-wrap">
				<view class="prod-tit">
					{{ name }}
				</view>
				<view class="col" @tap="addOrCannelCollection">
					<image v-if="!isCollection" src="@/static/images/icon/prod-col.png" />
					<image v-if="isCollection" src="@/static/images/icon/prod-col-red.png" />
					收藏
				</view>
			</view>

			<view class="tit-wrap">
				<view class="sales-p">
					{{ finenessValue }}
				</view>
				<view class="sales-p">
					已用年限 {{ usedYears }} 年
				</view>
			</view>

			<view class="sales-a">
				商品出租位置：{{ addressProvince }} {{ addressCity }} {{ addressDistrict }}
			</view>

			<view class="prod-price">
				<text class="price">
					￥
					<text class="price-num">
						{{ price }}
					</text>
					<text class="price-num">
						每天
					</text>
					<text class="prod-tit">
						| 还剩{{ prodNum }}件
					</text>
					<text class="prod-tit">
						| 配送方式:{{ deliveryValue }}
					</text>
				</text>
			</view>
		</view>

		<!-- 商品详情 -->
		<view class="prod-detail">
			<view>
				<rich-text :nodes="content" />
			</view>
		</view>
		<!-- end 商品详情 -->

		<!-- 店家信息 -->
		<view class="userinfo">
			<view class="userinfo-con" @tap="toChat">
				<view class="userinfo-name">
					点击私信卖家
				</view>
				<view class="userinfo-avatar">
					<image :src="userAvatar" @tap="toChat" />
				</view>
				<view class="userinfo-name" @tap="toChat">
					<view>{{ userName }}</view>
				</view>
			</view>
		</view>

		<!-- 评论 -->
		<view class="comment-block">
			<view v-if="comments.length === 0" class="no-comment">
				<view class="comment-section">
					<view class="comment-font">
						评论
					</view>
					<view class="view-all-comments" @tap="goToAllComments">
						查看全部评论
					</view>
				</view>
				商品暂无评论
			</view>
			<view v-else>
				<view class="comment-section">
					<view class="comment-font">
						评论
					</view>
					<view class="view-all-comments" @tap="goToAllComments">
						查看全部评论
					</view>
				</view>

				<view v-for="comment in comments" :key="comment.id" class="comment">
					<view @tap="goToCommentDetails(comment.id)">
						<view class="avatar">
							<image :src="comment.avatar" />
						</view>
						<view class="info">
							<view class="name">{{ comment.name }}</view>
							<view class="content">{{ comment.content }}</view>
							<view class="created-at">{{ comment.created_at }}</view>
						</view>
					</view>

				</view>
			</view>
		</view>

		<!-- 副图 -->
		<view class="mainImage" v-for="(image, index) in imageList" :key="index">
			<image :src="image.url" />
		</view>


		<!-- 底部按钮 -->
		<view class="cart-footer">
			<view class="btn icon" @tap="toHomePage">
				<image src="@/static/images/tabbar/homepage.png" />
				首页
			</view>
			<view class="btn buy" @tap="showSku">
				<text>立即购买</text>
			</view>
		</view>

		<!-- 弹出框 -->
		<view v-if="showSkuModal" class="sku-modal">
			<!-- 数量选择 -->
			<view class="sku-item">
				<view class="sku-label">数量</view>
				<view class="sku-value">
					<image class="sku-icon" src="@/static/images/icon/minus.png" @tap="decreaseQuantity" />
					<text class="sku-quantity">{{ quantity }}</text>
					<image class="sku-icon" src="@/static/images/icon/plus.png" @tap="increaseQuantity" />
				</view>
			</view>
			<!-- 租赁天数选择 -->
			<view class="sku-item">
				<view class="sku-label">租赁天数</view>
				<view class="sku-value">
					<image class="sku-icon" src="@/static/images/icon/minus.png" @tap="decreaseDays" />
					<text class="sku-days">{{ days }}</text>
					<image class="sku-icon" src="@/static/images/icon/plus.png" @tap="increaseDays" />
				</view>
			</view>
			<!-- 操作按钮 -->
			<view class="sku-buttons">
				<view class="sku-button cancel" @tap="closeSkuModal">取消</view>
				<view class="sku-button confirm" @tap="goToNextPage">下一步</view>
			</view>
		</view>
	</view>
</template>
  
<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getProductAPI } from "@/api/product"
import { isCollectionAPI, collectionAPI } from "@/api/collection"
import { getTwoCommentAPI } from "@/api/comment"
import util from '@/utils/util'

let prodId = 0

onLoad(async (options) => {
	prodId = options.prodid// 加载商品ID
	await getProdInfo() // 加载商品数据
	await getCollection() // 查看用户是否收藏
	await getComments() // 加载评论
})

const isCollection = ref(false)
/**
 * 获取是否收藏信息
 */
const getCollection = async () => {
	uni.showLoading()
	const res = await isCollectionAPI(prodId)

	isCollection.value = res.data
	uni.hideLoading()
}

/**
 * 添加或者取消收藏商品
 */
const addOrCannelCollection = async () => {
	uni.showLoading()
	const res = await collectionAPI({
		product_id: parseInt(prodId)
	})
	console.log(res);
	isCollection.value = !isCollection.value
	uni.hideLoading()
}

const name = ref('') // 商品名称
const price = ref(0) // 商品价格
const content = ref('') // 商品详情
const mainImage = ref('') // 主图
const prodNum = ref(1) // 商品数量
const delivery = ref(0) // 配送方式
const deliveryValue = ref('') // 配送方式值
const freight = ref(0) // 运费
const fineness = ref(0) // 成色
const finenessValue = ref('') // 成色值
const usedYears = ref(0) // 使用年限
const status = ref(0) // 状态
const categoryID = ref(0) // 分类ID
const categoryName = ref('') // 分类名称
const AddressID = ref(0) // 地址ID
const addressProvince = ref('') // 省份
const addressCity = ref('') // 区市
const addressDistrict = ref('') // 乡县
const userID = ref(0) // 用户ID
const userName = ref('') // 用户名称
const userAvatar = ref('') // 用户头像
const imageList = ref([]) // 图片列表

/**
 * 获取商品信息
 */
const getProdInfo = async () => {
	const res = await getProductAPI(prodId)
	name.value = res.data.name
	price.value = res.data.price
	content.value = util.formatHtml(res.data.detail)
	mainImage.value = res.data.main_image
	prodNum.value = res.data.stock
	delivery.value = res.data.delivery
	freight.value = res.data.freight
	fineness.value = res.data.fineness
	usedYears.value = res.data.used_years
	status.value = res.data.status
	categoryID.value = res.data.category_id
	categoryName.value = res.data.category_name
	AddressID.value = res.data.address_id
	addressProvince.value = res.data.address_province
	addressCity.value = res.data.address_city
	addressDistrict.value = res.data.address_district
	userID.value = res.data.user_id
	userName.value = res.data.user_name
	userAvatar.value = res.data.user_avatar
	imageList.value = res.data.image_list

	if (fineness.value == 0) {
		finenessValue.value = '全新'
	} else if (fineness.value == 1) {
		finenessValue.value = '几乎全新'
	} else if (fineness.value == 2) {
		finenessValue.value = '轻微使用痕迹'
	} else {
		finenessValue.value = '明显使用痕迹'
	}

	if (delivery.value == 0) {
		deliveryValue.value = '邮寄'
	} else {
		deliveryValue.value = '自提'
	}
}

const toChat = async () => {
	// 判断店家id是否和自己的id一样
	if (!uni.getStorageSync('loginResult')) {
		uni.clearStorageSync()
		uni.showModal({
			title: "提示",
			content: "请登录",
			showCancel: false,
			success(res) {
				setTimeout(() => {
					uni.navigateTo({
						url: "/pages/login/login",
					})
				}, 1000);
			},
		});
		return
	}

	const loginResult = uni.getStorageSync('loginResult')
	if (parseInt(loginResult.id) === userID.value) {
		uni.showToast({
			title: '不能和自己聊天',
			icon: 'none'
		})
		return
	}

	uni.navigateTo({
		url: '/pages/chat/chatDetail?toId=' + userID.value
	})
}


const comments = ref([])
const getComments = async () => {
	const res = await getTwoCommentAPI(prodId)
	if (res.data === null) {
		comments.value = []
		return
	}
	comments.value = res.data
}

const goToAllComments = async () => {
	uni.navigateTo({
		url: '/pages/comment/comment?prodid=' + prodId
	})
}

const goToCommentDetails = (commentId) => {
	uni.navigateTo({
		url: '/pages/comment/commentDetail?commentId=' + commentId
	})
}

/**
 * 跳转到首页
 */
const toHomePage = () => {
	uni.switchTab({
		url: '/pages/index/index'
	})
}

const showSkuModal = ref(false) // 是否显示sku弹出框
const quantity = ref(1) // 商品数量
const days = ref(1) // 租赁天数

// 显示sku弹出框
const showSku = () => {
	// 如果库存为0，不能购买
	if (prodNum.value === 0) {
		uni.showToast({
			title: '已缺货',
			icon: 'none'
		})
		return
	}
	showSkuModal.value = true
}

// 关闭sku弹出框
const closeSkuModal = () => {
	showSkuModal.value = false
}

// 增加数量
const increaseQuantity = () => {
	if (quantity.value < prodNum.value) {
		quantity.value++
	}
}

// 减少数量
const decreaseQuantity = () => {
	if (quantity.value > 1) {
		quantity.value--
	}
}

// 增加租赁天数
const increaseDays = () => {
	if (days.value < 30) {
		days.value++
	}
}

// 减少租赁天数
const decreaseDays = () => {
	if (days.value > 1) {
		days.value--
	}
}

// 点击下一步
const goToNextPage = () => {
	// 不能购买自己的商品
	const loginResult = uni.getStorageSync('loginResult')
	if (parseInt(loginResult.id) === userID.value) {
		uni.showToast({
			title: '不能购买自己的商品',
			icon: 'none'
		})
		return
	}


	uni.navigateTo({
		url: '/pages/product/productSelectAddress?productId=' + prodId + '&quantity=' + quantity.value + '&days=' + days.value
	})
}
</script>
  
<style scoped lang="scss">
@use './product.scss';
</style>
  