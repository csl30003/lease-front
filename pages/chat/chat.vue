<template>
	<view class="container">
		<view class="header">
			<button class="publish-button" @click="publish">发布</button>
		</view>

		<view class="content">
			<textarea class="details-input" v-model="details" placeholder="请输入商品详情"></textarea>
			<view class="image-container">
				<view v-for="(image, index) in images" :key="index" class="image-item">
					<image :src="image" mode="aspectFill" class="image"></image>
					<button class="delete-button" @click="deleteImage(index)">删除</button>
				</view>
				<button class="add-image-button" @click="addImage" v-if="images.length < 9">添加图片</button>
			</view>


			<picker class="category-picker" mode="selector" :range="categories" @change="changeCategory">
				<view class="picker-container">
					<text>选择分类：</text>
					<text class="selected-category">{{ selectedCategory }}</text>
				</view>
			</picker>
			<input class="price-input" type="number" v-model="price" placeholder="请输入价格">
			<picker class="shipping-picker" mode="selector" :range="shippingOptions" @change="changeShipping">
				<view class="picker-container">
					<text>发货方式：</text>
					<text class="selected-shipping">{{ selectedShipping }}</text>
				</view>
			</picker>
			<input class="freight-input" type="number" v-model="freight" placeholder="请输入运费"
				v-if="selectedShipping === '快递'">

			<!-- 按钮，前往分类页面 -->
			<view @tap="toSelectCategory">
				<button>
					选择类别
				</button>
			</view>
		</view>
	</view>
</template>
  
<script setup>
import { ref } from 'vue'

const details = ref('')
const images = ref([])
const categories = ['分类1', '分类2', '分类3'] // 替换为实际的分类数据
const selectedCategory = ref('')
const price = ref('')
const shippingOptions = ['快递', '自取'] // 替换为实际的发货方式数据
const selectedShipping = ref('')
const freight = ref('')

const publish = () => {
	// 在这里执行发布商品的逻辑，将表单数据提交到后端
};

const addImage = () => {
	// 添加图片的逻辑
	// 使用uniapp的API选择图片并将图片添加到images数组中
};

const deleteImage = (index) => {
	// 删除图片的逻辑
	// 从images数组中移除指定索引的图片
};

const changeCategory = (event) => {
	selectedCategory.value = categories[event.detail.value];
};

const changeShipping = (event) => {
	selectedShipping.value = shippingOptions[event.detail.value];
	// 当选择自取时，将运费字段重置为空
	if (selectedShipping.value === '自取') {
		freight.value = '';
	}
};

const toSelectCategory = () => {
	uni.navigateTo({
		url: "/pages/category/selectCategory",
	})
}
</script>
  
<style>
.container {
	flex: 1;
	padding: 20px;
}

.header {
	display: flex;
	justify-content: flex-end;
}

.publish-button {
	background-color: #007aff;
	color: #ffffff;
	padding: 10px 20px;
	border-radius: 4px;
}

.content {
	margin-top: 20px;
}

.details-input {
	width: 94%;
	height: 150px;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
	margin-bottom: 20px;
}

.image-container {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 20px;
}

.image-item {
	position: relative;
	width: calc(33.33% - 10px);
	margin-right: 10px;
	margin-bottom: 10px;
}

.image {
	width: 100%;
	height: 100px;
	object-fit: cover;
}

.delete-button {
	position: absolute;
	top: 4px;
	right: 4px;
	background-color: #ff3b30;
	color: #ffffff;
	padding: 4px 8px;
	border-radius: 4px;
}

.add-image-button {
	width: 100%;
	background-color: #007aff;
	color: #ffffff;
	padding: 10px;
}

.category-picker {
	width: 100%;
	height: 50px;
	margin-bottom: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
}

.picker-container {
	display: flex;
	align-items: center;
}

.selected-category {
	margin-left: 5px;
}

.price-input {
	width: 94%;
	margin-bottom: 10px;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
}

.shipping-picker {
	width: 100%;
	height: 50px;
	margin-bottom: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
}

.selected-shipping {
	margin-left: 5px;
}

.freight-input {
	width: 94%;
	margin-bottom: 10px;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
}
</style>