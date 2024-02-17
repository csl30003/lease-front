<template>
	<!-- 一个按钮触发hello函数 -->
	<view>
		<text @click="hello">点击</text>
	</view>
</template>

<script setup>
import {helloWorld} from "@/api/test"

const hello = async () => {
	let res = await helloWorld(1)
	console.log(res)
}
</script>

<style>

</style>
