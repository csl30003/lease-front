<template>
	<view class="container">
		<view class="bg-sear">
			<view class="scrolltop">
				<view class="section" @tap="toSearchPage">
					<image src="@/static/images/icon/search.png" class="search-img" />
					<text class="placeholder">
						搜索
					</text>
				</view>
			</view>

			<view @tap="toCategory">
				<button>
					类别
				</button>
			</view>

		</view>
	</view>
</template>

<script setup>

const toSearchPage = () => {
	uni.navigateTo({
		url: '/pages/search/search'
	})
}

const toCategory = () => {
	uni.navigateTo({
		url: "/pages/category/category",
	})
}

</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
