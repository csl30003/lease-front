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
                    <view class="address" :data-addressid="item.id" @tap="toFillInformation">
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
import { getAddressAPI, setDefaultAddressAPI } from "@/api/address"

const addressList = ref([])
const categoryId = ref('')
/**
 * 加载地址列表
 */
onShow(() => {
    onGetList()
})

onLoad(async (options) => {
    if (options.categoryId) {
        categoryId.value = options.categoryId
    }
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

const toFillInformation = (e) => {
    // 获取地址id
    const addressId = e.currentTarget.dataset.addressid
    uni.navigateTo({
		url: '/pages/release/fillInformation?categoryId=' + categoryId.value + '&addressId=' + addressId
	})
}
</script>
  
<style scoped lang="scss">
@use './selectAddress.scss';
</style>
  