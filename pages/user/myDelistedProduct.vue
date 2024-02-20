<template>
    <view class="product-list">
        <view v-for="product in products" :key="product.id" class="product-item">
            <view class="left-column">
                <image :src="product.main_image" mode="widthFix" class="main-image" />
            </view>
            <view class="right-column">
                <view class="product-info">
                    <view class="product-name">{{ product.name }}</view>
                    <view class="product-price">{{ product.price }} 元/天</view>
                    <view class="product-stock">库存: {{ product.stock }}</view>
                </view>
                <button class="off-sale-button" @tap="grounding(product.id)">上架</button>
            </view>
        </view>
    </view>
</template>
  
<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app'
import { getMyProductAPI, updateProductStatusAPI } from "@/api/product"

let products = ref([]);

onShow(async () => {
    // 获取我的发布的下架的商品列表
    const res = await getMyProductAPI(2)
    products.value = res.data
})

const grounding = async (productId) => {
    // 调用上架商品 API
    await updateProductStatusAPI({
        id: productId,
        status: 1
    })
    // 重新获取商品列表
    const res = await getMyProductAPI(2)
    products.value = res.data
}

</script>
  
<style scoped lang="scss">
@use './myDelistedProduct.scss';
</style>