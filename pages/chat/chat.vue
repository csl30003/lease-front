<template>
	<!-- 按钮，前往分类页面 -->
	<view @tap="toCategory">
		<button>
			类别
		</button>
	</view>

	<view @tap="toSearch">
		<button>
			搜索
		</button>
	</view>
</template>
  
<script setup>

const toCategory = () => {
	uni.navigateTo({
		url: "/pages/category/category",
	})
}

const toSearch = () => {
	uni.navigateTo({
		url: "/pages/search/search",
	})
}

</script>
  
<style lang="scss" scoped></style>