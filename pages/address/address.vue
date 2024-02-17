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
                    <view class="address">
                        <view class="personal">
                            <view class="info-tit">
                                <text class="name">
                                    {{ item.name }}
                                </text>
                                <text class="tel">
                                    {{ item.phone }}
                                </text>
                                <image src="@/static/images/icon/revise.png" :data-addrid="item.id"
                                    @tap.stop="toEditAddress" />
                            </view>
                            <view class="addr">
                                <text class="addr-get">
                                    {{ item.province }}{{ item.city }}{{ item.district }}{{ item.detail }}
                                </text>
                            </view>
                        </view>
                        <view class="select-btn" :data-addrid="item.id">
                            <view class="box">
                                <radio :value="item.prodId" :checked="item.is_default == 1" color="#eb2444"
                                    :data-addrid="item.id" @tap="onDefaultAddr" />
                                设为默认地址
                            </view>
                        </view>
                    </view>
                </block>
            </radio-group>
        </view>
        <view class="footer" @tap="onAddAddr">
            <text>新增收货地址</text>
        </view>
    </view>
</template>
  
<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getAddressAPI, setDefaultAddressAPI } from "@/api/address"

const addressList = ref([])
/**
 * 加载地址列表
 */
onShow(() => {
    onGetList()
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

/**
 * 新增收货地址
 */
const onAddAddr = () => {
    uni.navigateTo({
        url: '/pages/address/editAddress'
    })
}

/**
 * 设置为默认地址
 */
const onDefaultAddr = async (e) => {
    const addrId = e.currentTarget.dataset.addrid
    uni.showLoading()
    await setDefaultAddressAPI(addrId)
    uni.hideLoading()
}

/**
 * 修改地址
 */
const toEditAddress = (e) => {
    const addrId = e.currentTarget.dataset.addrid
    uni.navigateTo({
        url: '/pages/address/editAddress?addrId=' + addrId
    })
}
</script>
  
<style scoped lang="scss">
@use './address.scss';
</style>
  