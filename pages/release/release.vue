<template>
	<view class="container">
		<!-- 滚动内容区 -->
		<view class="main">
			<!-- 左侧菜单start -->
			<scroll-view scroll-y="true" class="leftmenu">
				<block v-for="(item, index) in categoryList" :key="index">
					<view :class="'menu-item ' + (selIndex == index ? 'active' : '') + ' '" :data-index="index"
						:data-id="item.id" @tap="onMenuTab">
						{{ item.name }}
					</view>
				</block>
				<view v-if="!categoryList || !categoryList.length" class="ca-empty">
					{{ categoryList && categoryList.length ? '该分类下暂无商品' : '暂无商品' }}
				</view>
			</scroll-view>
			<!-- 左侧菜单end -->

			<!-- 右侧内容start -->
			<scroll-view scroll-y="true" class="rightcontent">
				<!-- 子分类 -->
				<view v-if="subCategoryList.length" class="th-cate-con">
					<block v-for="(thCateItem, index) in subCategoryList" :key="index">
						<view class="sub-category">
							<view class="sub-category-item" :data-categoryid="thCateItem.id"
								:data-parentid="thCateItem.parent_id" @tap="toSelect">
								<text>{{ thCateItem.name }}</text>
							</view>
						</view>
					</block>
				</view>
				<view v-else class="cont-item empty">
					该分类下暂无子分类~
				</view>
			</scroll-view>
			<!-- 右侧内容end -->
		</view>
	</view>
</template>
  
<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getCategoryAPI } from "@/api/category"

const categoryList = ref([])
const subCategoryList = ref([])
const parentId = ref('')

/**
 * 生命周期函数--监听页面加载
 */
onLoad(async () => {
	// 加载分类列表
	let res = await getCategoryAPI(0)
	categoryList.value = res.data
	await getProdList(categoryList.value[0].id)
	parentId.value = categoryList.value[0].id
})

const selIndex = ref(0)
/**
 * 分类点击事件
 */
const onMenuTab = async (e) => {
	const index = e.currentTarget.dataset.index
	await getProdList(categoryList.value[index].id)
	parentId.value = categoryList.value[index].id
	selIndex.value = index
}

const getProdList = async (categoryId) => {
	// 加载分类列表
	let res = await getCategoryAPI(categoryId)
	subCategoryList.value = res.data
}

/**
 * 选择
 */
const toSelect = (e) => {
	// 获取分类id
	const categoryid = e.currentTarget.dataset.categoryid
	uni.navigateTo({
		url: '/pages/release/selectAddress?categoryId=' + categoryid
	})
}

</script>
  
<style scoped lang="scss">
@import "./release.scss";
</style>
  