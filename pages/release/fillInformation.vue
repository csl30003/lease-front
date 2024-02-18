<template>
    <view class="form-container">
        <view class="form-item">
            <text class="label">名称</text>
            <input class="input" @input="onNameInput" placeholder="请输入商品名称" />
        </view>
        <view class="form-item">
            <text class="label">详情</text>
            <textarea class="textarea" @input="onDetailsInput" placeholder="请输入商品详情"></textarea>
        </view>
        <view class="form-item">
            <text class="label">价格（天）</text>
            <input class="input" type="number" @input="onPriceInput" placeholder="请输入商品价格" />
        </view>
        <view class="form-item">
            <text class="label">数量</text>
            <input class="input" type="number" @input="onQuantityInput" placeholder="请输入商品数量" />
        </view>
        <view class="form-item">
            <text class="label">配送方式</text>
            <picker class="picker" mode="selector" :range="deliveryMethods" @change="onDeliveryMethodChange">
                <view class="picker-container">
                    <text v-if="!isDeliveryMethodSelected">点击选择配送方式</text>
                    <text class="selected-option">{{ deliveryMethods[deliveryMethod] }}</text>
                </view>
            </picker>
        </view>
        <view class="form-item">
            <text class="label">成色</text>
            <picker class="picker" mode="selector" :range="conditions" @change="onConditionChange">
                <view class="picker-container">
                    <text v-if="!isConditionSelected">点击选择成色</text>
                    <text class="selected-option">{{ conditions[condition] }}</text>
                </view>
            </picker>
        </view>
        <view class="form-item">
            <text class="label">已用年限</text>
            <input class="input" type="number" @input="onUsedYearsInput" placeholder="请输入已用年限" />
        </view>
        <view class="btn-container">
            <button class="btn" @click="submitForm">继续</button>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const categoryId = ref('')
const addressId = ref('')
const name = ref('');
const details = ref('');
const price = ref(0);
const quantity = ref(0);
const deliveryMethod = ref('');
const condition = ref('');
const usedYears = ref(0);

const deliveryMethods = ref(['邮寄', '自提']);
const conditions = ref(['全新', '几乎全新', '轻微使用痕迹', '明显使用痕迹']);

const isDeliveryMethodSelected = ref(false);
const isConditionSelected = ref(false);

onLoad(async (options) => {
    categoryId.value = options.categoryId
    addressId.value = options.addressId
})

const onNameInput = (e) => {
    name.value = e.detail.value;
}

const onDetailsInput = (e) => {
    details.value = e.detail.value;
}

const onPriceInput = (e) => {
    price.value = Number(e.detail.value);
}

const onQuantityInput = (e) => {
    quantity.value = Number(e.detail.value);
}

const onDeliveryMethodChange = (e) => {
    deliveryMethod.value = e.detail.value;
    isDeliveryMethodSelected.value = true;
};

const onConditionChange = (e) => {
    condition.value = e.detail.value;
    isConditionSelected.value = true;
};

const onUsedYearsInput = (e) => {
    usedYears.value = Number(e.detail.value);
}

function submitForm() {
    console.log('categoryId:', categoryId.value);
    console.log('addressId:', addressId.value);
    console.log('name:', name.value);
    console.log('details:', details.value);
    console.log('price:', price.value);
    console.log('quantity:', quantity.value);
    console.log('deliveryMethod:', deliveryMethod.value);
    console.log('condition:', condition.value);
    console.log('usedYears:', usedYears.value);

    const nameParam = name.value
    const detailsParam = details.value
    const priceParam = price.value
    const quantityParam = quantity.value
    const deliveryMethodParam = deliveryMethod.value
    const conditionParam = condition.value
    const usedYearsParam = usedYears.value

    if (!nameParam.trim()) {
        name.value = ''
        uni.showToast({
            title: '请输入商品名称',
            icon: 'none'
        })
        return
    }

    if (!detailsParam.trim()) {
        details.value = ''
        uni.showToast({
            title: '请输入商品详情',
            icon: 'none'
        })
        return
    }

    if (!priceParam) {
        price.value = 0
        uni.showToast({
            title: '请输入商品价格',
            icon: 'none'
        })
        return
    }

    if (!quantityParam) {
        quantity.value = 0
        uni.showToast({
            title: '请输入商品数量',
            icon: 'none'
        })
        return
    }

    if (!deliveryMethodParam) {
        uni.showToast({
            title: '请选择配送方式',
            icon: 'none'
        })
        return
    }

    if (!conditionParam) {
        uni.showToast({
            title: '请选择成色',
            icon: 'none'
        })
        return
    }

    if (!usedYearsParam) {
        usedYears.value = 0
        uni.showToast({
            title: '请输入已用年限',
            icon: 'none'
        })
        return
    }

}
</script>

<style scoped lang="scss">
.form-container {
    padding: 20rpx;
}

.form-item {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
}

.label {
    flex: 1;
    font-size: 28rpx;
    color: #333333;
}

.input {
    flex: 3;
    padding: 10rpx;
    border: 1rpx solid #dddddd;
    border-radius: 5rpx;
}
.textarea {
    flex: 3;
    padding: 10rpx;
    border: 1rpx solid #dddddd;
    border-radius: 5rpx;
}

.picker {
    flex: 3;
    position: relative;
}

.picker-text {
    font-size: 28rpx;
    color: #333333;
}

.picker-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.picker-view-item {
    line-height: 50rpx;
    font-size: 28rpx;
    color: #333333;
    text-align: center;
}

.btn-container {
    display: flex;
    justify-content: center;
    margin-top: 40rpx;
}

.btn {
    padding: 10rpx 20rpx;
    font-size: 30rpx;
    color: #ffffff;
    background-color: #007aff;
    border-radius: 5rpx;
}
</style>
