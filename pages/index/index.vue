<template>
	<view class="container">
		<view class="bg-sear">
			<!-- 搜索 -->
			<view class="scrolltop">
				<view class="section" @tap="toSearchPage">
					<image src="@/static/images/icon/search.png" class="search-img" />
					<text class="placeholder">
						搜索
					</text>
				</view>
			</view>
		</view>

        <!-- 轮播图 -->
		<swiper :autoplay="autoplay" :indicator-color="indicatorColor" :interval="interval" :duration="duration"
			:indicator-active-color="indicatorActiveColor + ' '" :circular="true" class="pic-swiper" indicator-dots
			previous-margin="20rpx" next-margin="20rpx">
			<block v-for="(item, index) in indexImgs" :key="index">
				<swiper-item class="banner-item">
					<view class="img-box">
						<image :src="item.main_image" :data-prodid="item.id" class="banner" @tap="toProdPage" />
					</view>
				</swiper-item>
			</block>
		</swiper>

		<!-- 种类 -->
		<text class="category-text">商品种类</text>
		<view class="view-all" @tap="toCategory">
			<text class="view-all-text">查看全部种类</text>
		</view>
		<scroll-view scroll-y class="category-scroll">
			<view class="category">
				<view class="category-item" v-for="(item, index) in categoryList" :key="index">
					<image class="icon" :src="item.icon" :data-parentid="item.id" @tap="toCategoryByParentId">
					</image>
					<text class="text">{{ item.name }}</text>
				</view>
			</view>
		</scroll-view>


		<!-- 猜你喜欢 -->
		<view class="caption">
			<text class="text">猜你喜欢</text>
		</view>
		<view class="prod-item">
			<block v-if="productList.length">
				<block v-for="(prod, key) in productList" :key="key">
					<view class="prod-items" :data-prodid="prod.id" @tap="toProdPage">
						<view class="hot-imagecont">
							<image :src="prod.main_image" class="hotsaleimg" />
						</view>
						<view class="hot-text">
							<view class="hotprod-text">
								{{ prod.name }}
							</view>
							<view class="prod-text-info">
								<view class="price">
									<text class="symbol">
										￥
									</text>
									<text class="big-num">
										{{ prod.price }}
									</text>
									<text class="symbol">
										每天
									</text>
								</view>
							</view>
						</view>
					</view>
				</block>
			</block>
			<view v-else class="empty-wrap">
				暂无商品数据~
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { getCategoryAPI } from "@/api/category"
import { getCarouselListAPI, getProductListAPI } from "@/api/product"

const indexImgs = ref([])
const indicatorColor = ref('#d1e5fb')
const indicatorActiveColor = ref('#007aff')
const autoplay = ref(true)
const interval = ref(3000)
const duration = ref(1000)

const categoryList = ref([])
const productList = ref([])

const current = ref(1)
const pages = ref(0)

onLoad(async () => {
	await getCarouselList()
	await getCategoryList()
	await getProdList()
})

const getCarouselList = async () => {
	// 获取轮播图
	const res = await getCarouselListAPI()
	indexImgs.value = res.data
}

const getCategoryList = async () => {
	// 获取分类列表
	const res = await getCategoryAPI(0)
	categoryList.value = res.data
}

onReachBottom(() => {
	if (current.value < pages.value) {
		current.value = current.value + 1
		getProdList()
	}
})

const getProdList = async () => {

	const res = await getProductListAPI({
		current: current.value,
		size: 10,
		sort: 0,
		order: 'desc',
	})
	if (current.value == 1) {
		productList.value = res.data.records
	} else {
		productList.value = productList.value.concat(res.data.records)
	}
	pages.value = res.data.pages

	if (!productList.value.length) {
		productList.value = []
	}
}

const toSearchPage = () => {
	uni.navigateTo({
		url: '/pages/search/search'
	})
}

const toProdPage = (e) => {
	const prodId = e.currentTarget.dataset.prodid
	uni.navigateTo({
		url: `/pages/product/product?prodid=${prodId}`
	})
}

const toCategory = () => {
	uni.navigateTo({
		url: "/pages/category/category",
	})
}

const toCategoryByParentId = (e) => {
	const parentId = e.currentTarget.dataset.parentid
	uni.navigateTo({
		url: `/pages/category/categoryShow?parentId=${parentId}&categoryId=${0}`
	})
}
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
