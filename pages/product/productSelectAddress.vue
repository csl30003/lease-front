<template>
    <view class="container">
        <view class="main">
            <view v-if="addressList.length === 0" class="empty">
                <view class="img">
                    <image src="http://jiales.gz-yami.com/addr.png" />
                </view>
                <view class="txt">
                    您还没有收货地址
                </view>
            </view>
            <radio-group class="radio-group">
                <block v-for="(item, index) in addressList" :key="index">
                    <view class="address" :data-addressid="item.id" @tap="toCheckOrder">
                        <view class="personal">
                            <view class="info-tit">
                                <text class="name">
                                    {{ item.name }}
                                </text>
                                <text class="tel">
                                    {{ item.phone }}
                                </text>
                            </view>
                            <view class="addr">
                                <text class="addr-get">
                                    {{ item.province }}{{ item.city }}{{ item.district }}{{ item.detail }}
                                </text>
                            </view>
                        </view>
                    </view>
                </block>
            </radio-group>
        </view>
    </view>
</template>
  
<script setup>
import { ref } from 'vue'
import { onShow, onLoad } from '@dcloudio/uni-app'
import { getAddressAPI } from "@/api/address"

const addressList = ref([])

const productId = ref('')
const quantity = ref('')
const days = ref('')
/**
 * 加载地址列表
 */
onShow(() => {
    onGetList()
})

onLoad(async (options) => {
    productId.value = options.productId
    quantity.value = options.quantity
    days.value = options.days
})

/**
 * 获取收获列表接口
 */
const onGetList = async () => {
    uni.showLoading()

    let res = await getAddressAPI()
    addressList.value = res.data

    uni.hideLoading()
}

const toCheckOrder = (e) => {
    // 获取地址id
    const addressId = e.currentTarget.dataset.addressid
    uni.navigateTo({
		url: '/pages/order/order?productId=' + productId.value + '&quantity=' + quantity.value + '&days=' + days.value + '&addressId=' + addressId
	})
}
</script>
  
<style scoped lang="scss">
@use './productSelectAddress.scss';
</style>
  