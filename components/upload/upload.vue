<template>
	<view class="content">
		<image style="height: 150rpx; width: 150rpx; box-shadow: 2rpx 2rpx 6rpx #b9aeae" :src="tempFilePaths"
			@click="chooseImage"></image>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, defineProps } from 'vue';

const props = defineProps(['count']);
const tempFilePaths = ref('/static/images/icon/plus-sign.png');

function chooseImage() {
	uni.chooseImage({
		count: props.count,
		sourceType: ['album'],
		success: function (res) {
			tempFilePaths.value = res.tempFilePaths[0];
		}
	});
}

function UploadImg() {
	return new Promise(function (resolve, reject) {
		let header = {
			'Content-Type': 'application/json'
		}
		// 获取本地token
		if (uni.getStorageSync("token")) {
			header['Cookie'] = 'token=' + uni.getStorageSync("token");
		}

		uni.uploadFile({
			url: `http://localhost:8080/index/upload`,//地址
			method: 'POST',
			filePath: tempFilePaths.value,
			name: 'avatar',
			header: header,
			formData: {}
		})
			.then((res) => {
				const path = JSON.parse(res.data).data;
				resolve(path);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

defineExpose({
	UploadImg
});

onMounted(() => { });
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: 100%;
	margin: 5rpx;
}
</style>


