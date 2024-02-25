<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>
 
<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const url = ref('')

onLoad(async (options) => {
	url.value = JSON.parse(decodeURIComponent(options.url))
	console.log(url.value);
})
</script>