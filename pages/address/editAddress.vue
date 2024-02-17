<template>
    <view class="container">
        <!--input列表 -->
        <view class="input-box">
            <view class="section">
                <text>收 货 人</text>
                <input placeholder="姓名" type="text" maxlength="15" :value="name" @input="onNameInput">
            </view>
            <view class="section">
                <text>手机号码</text>
                <input placeholder="11位手机号码" type="number" maxlength="11" :value="phone" @input="onPhoneInput">
            </view>
            <view class="section">
                <text>省份</text>
                <input placeholder="省份" type="text" :value="province" @input="onProvinceInput">
            </view>
            <view class="section">
                <text>城市</text>
                <input placeholder="城市" type="text" :value="city" @input="onCityInput">
            </view>
            <view class="section">
                <text>区县</text>
                <input placeholder="区县" type="text" :value="district" @input="onDistrictInput">
            </view>
            <view class="section">
                <text>详细地址</text>
                <input placeholder="如楼号/单元/门牌号" type="text" :value="detail" @input="onDetailInput">
            </view>
        </view>
        <!-- end input列表 -->
        <!-- 功能按钮 -->
        <view class="btn-box">
            <view class="keep btn" @tap="onSaveAddr">
                <text>保存收货地址</text>
            </view>

            <view v-if="addrId != 0" class="clear btn" @tap="onDeleteAddr">
                <text>删除收货地址</text>
            </view>
        </view>
        <!-- end 功能按钮 -->
    </view>
</template>
  
<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getAddressByIdAPI, addAddressAPI, updateAddressAPI, deleteAddressAPI } from "@/api/address"

const addrId = ref(0)
const name = ref('')
const phone = ref('')
const province = ref('')
const city = ref('')
const district = ref('')
const detail = ref('')
const isDefault = ref(0)

onLoad(async (options) => {
    if (options.addrId) {
        uni.showLoading()
        let res = await getAddressByIdAPI(options.addrId)
        province.value = res.data.province
        city.value = res.data.city
        district.value = res.data.district
        name.value = res.data.name
        phone.value = res.data.phone
        detail.value = res.data.detail
        addrId.value = options.addrId
        isDefault.value = res.data.is_default
        uni.hideLoading()
    }
})

/**
 * 保存地址
 */
const onSaveAddr = async () => {
    const nameParam = name.value
    const phoneParam = phone.value
    const provinceParam = province.value
    const cityParam = city.value
    const districtParam = district.value
    const detailParam = detail.value

    if (!nameParam.trim()) {
        name.value = ''
        uni.showToast({
            title: '请输入收货人姓名',
            icon: 'none'
        })
        return
    }

    if (!phoneParam) {
        uni.showToast({
            title: '请输入手机号码',
            icon: 'none'
        })
        return
    }

    if (phoneParam.length != 11) {
        uni.showToast({
            title: '请输入正确的手机号码',
            icon: 'none'
        })
        return
    }

    if (!provinceParam.trim()) {
        receiver.value = ''
        uni.showToast({
            title: '请输入省份',
            icon: 'none'
        })
        return
    }

    if (!cityParam.trim()) {
        receiver.value = ''
        uni.showToast({
            title: '请输入城市',
            icon: 'none'
        })
        return
    }

    if (!districtParam.trim()) {
        receiver.value = ''
        uni.showToast({
            title: '请输入区县',
            icon: 'none'
        })
        return
    }

    if (!detailParam.trim()) {
        receiver.value = ''
        uni.showToast({
            title: '请输入详细地址',
            icon: 'none'
        })
        return
    }

    uni.showLoading()

    if (addrId.value != 0) {
        // 修改地址
        await updateAddressAPI(addrId.value, {
            name: name.value,
            phone: phone.value,
            province: province.value,
            city: city.value,
            district: district.value,
            detail: detail.value,
            is_default: isDefault.value
        })
    } else {
        // 添加地址
        await addAddressAPI({
            name: name.value,
            phone: phone.value,
            province: province.value,
            city: city.value,
            district: district.value,
            detail: detail.value
        })
    }
    uni.hideLoading()
    uni.navigateBack({
        delta: 1
    })
}

const onNameInput = (e) => {
    name.value = e.detail.value
}
const onPhoneInput = (e) => {
    phone.value = e.detail.value
}
const onProvinceInput = (e) => {
    province.value = e.detail.value
}
const onCityInput = (e) => {
    city.value = e.detail.value
}
const onDistrictInput = (e) => {
    district.value = e.detail.value
}
const onDetailInput = (e) => {
    detail.value = e.detail.value
}

/**
 * 删除配送地址
 */
const onDeleteAddr = async () => {
    uni.showModal({
        title: '',
        content: '确定要删除此收货地址吗？',
        confirmColor: '#eb2444',

        async success(res) {
            if (res.confirm) {
                const addrIdParam = addrId.value
                uni.showLoading()

                await deleteAddressAPI(addrIdParam)

                uni.hideLoading()
                uni.navigateBack({
                    delta: 1
                })
            }
        }
    })
}
</script>
  
<style scoped lang="scss">
@use './editAddress.scss';
</style>
  