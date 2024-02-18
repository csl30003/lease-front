<template>
	<!-- 按钮，前往分类页面 -->
	<view @tap="toCategory">
		<button>
			类别
		</button>
	</view>
</template>

<script setup>
const toCategory = () => {
	uni.navigateTo({
		url: "/pages/category/category",
	})
}
</script>

<style>

</style>
