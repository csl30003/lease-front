<template>
	<view class="container">
		<view class="header">
			<view class="upload-section">
				<view class="upload-btn" @tap="uploadImages">图片上传</view>
				<view class="file-count">{{ files.length }}/5</view>
			</view>
		</view>
		<view class="image-section">
			<view class="image-gallery" id="image-gallery">
				<view v-for="(item, index) in files" :key="index" class="image-item"
					@tap="previewImage(index)">
					<image class="preview-image" :src="item" mode="aspectFill"></image>
				</view>
				<view v-if="gallery !== -1" class="image-popup" @tap="close">
					<view class="image-index">{{ gallery + 1 }}/{{ files.length }}</view>
					<view class="image-wrapper">
						<image mode="aspectFit" class="popup-image" :src="files[gallery]"></image>
					</view>
					<view class="delete-btn">
						<view class="delete-icon" @tap="deleteImg(gallery)">删除</view>
					</view>
				</view>
			</view>
			<view class="upload-btn-section" v-if="showUpload">
				<view class="add-btn" @tap="chooseImage">添加</view>
			</view>
		</view>
	</view>
</template>
  
<script setup>
import { ref, watch } from 'vue';

const showUpload = ref(true);
const files = ref([]);
const gallery = ref(-1);

watch(files, (newFiles) => {
	if (newFiles.length > 4) {
		showUpload.value = false;
	} else {
		showUpload.value = true;
	}
});

const uploadImages = () => {
	let header = {
		'Content-Type': 'application/json'
	}
	// 获取本地token
	if (uni.getStorageSync("token")) {
		header['Cookie'] = 'token=' + uni.getStorageSync("token");
	}
	const tempFilePaths = files.value;

	for (let i = 0; i < tempFilePaths.length; i++) {
		const filePath = tempFilePaths[i];
		uni.uploadFile({
			url: 'http://localhost:8080/index/product/image',
			filePath: filePath,
			name: 'productImage',
			method: 'POST',
			header: header,
			formData: {},
			success: (res) => {
				const resTemp = JSON.parse(res.data);
				console.log(resTemp.code);
				// 根据返回的状态码做出对应的操作
				if (resTemp.code == 200) {
					console.log("一个上传成功");
				} else {
					switch (resTemp.code) {
						case 401:
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
							break;
						case 404:
							uni.showToast({
								title: '请求地址不存在...',
								icon: "none",
								duration: 1000,
							})
							break;
						default:
							uni.showModal({
								title: '请重试...',
								showCancel: false,
							})
							break;
					}
				}
			}
		});
	}
}

const chooseImage = () => {
	uni.chooseImage({
		sizeType: ['original', 'compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			files.value = [...files.value, res.tempFilePaths[0]];
		}
	});
};

const previewImage = (index) => {
	gallery.value = index;
};

const deleteImg = (index) => {
	files.value.splice(index, 1);
	if (gallery.value === index) {
		gallery.value = -1;
	}
};

const close = () => {
	gallery.value = -1;
};


</script>
  
<style lang="scss" scoped>
.container {
  background-color: #fff;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.upload-section {
  display: flex;
  align-items: center;
}

.upload-btn {
  background-color: #007aff;
  color: #fff;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 4px;
  font-size: 14px;
}

.file-count {
  color: #007aff;
  font-size: 12px;
}

.image-section {
  display: flex;
  flex-wrap: wrap;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
}

.image-item {
  width: 100px;
  height: 100px;
  margin-right: 10px;
  margin-bottom: 10px;
  position: relative;
}

.preview-image {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.image-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-index {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  font-size: 12px;
}

.image-wrapper {
  width: 80%;
  height: 80%;
}

.popup-image {
  width: 100%;
  height: 100%;
}

.delete-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.delete-icon {
  background-color: #007aff;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.upload-btn-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.add-btn {
  background-color: #007aff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
}
</style>