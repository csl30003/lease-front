<template>
    <view class="container">
        <view class="input-box">
            <view class="section">
                <text>昵称</text>
                <input placeholder="昵称" type="text" maxlength="15" :value="name" @input="onNameInput">
            </view>
            <view class="section">
                <text>手机号码</text>
                <input placeholder="11位手机号码" type="number" maxlength="11" :value="phone" @input="onPhoneInput">
            </view>
            <view class="section">
                <text>国家</text>
                <input placeholder="国家" type="text" :value="country" @input="onCountryInput">
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
            <!-- 头像 -->

        </view>

        <view class="btn-box">
            <view class="keep btn" @tap="onSave">
                <text>保存个人信息</text>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getUserInfoAPI } from "@/api/user"

const userId = ref(0)
const name = ref('')
const phone = ref('')
const avatar = ref('')
const country = ref('')
const province = ref('')
const city = ref('')
const district = ref('')

onLoad(async () => {
    uni.showLoading()
    let res = await getUserInfoAPI()
    console.log(res)
    country.value = res.data.country
    province.value = res.data.province
    city.value = res.data.city
    district.value = res.data.district
    name.value = res.data.name
    phone.value = res.data.phone
    avatar.value = res.data.avatar
    userId.value = res.data.id
    uni.hideLoading()
})

// 保存个人信息
const onSave = () => {
    const nameParam = name.value
    const phoneParam = phone.value
    const countryParam = country.value
    const provinceParam = province.value
    const cityParam = city.value
    const districtParam = district.value
}
</script>

<style scoped lang="scss">
@use './editUser.scss';
</style>