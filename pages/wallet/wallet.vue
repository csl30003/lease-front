<template>
    <view class="wallet">
        <view class="wallet-info">
            <span class="wallet-balance">{{ balance }}元</span>
            <view class="withdraw-btn" @click="withdraw">提现</view>
        </view>
        <view class="transaction-list">
            <view v-for="payment in paymentList" :key="payment.id">
                <view class="transaction-amount">
                    {{ payment.money }} 元
                </view>
                <view :class="['transaction-type', payment.type === 1 ? 'income' : 'expense']">
                    {{ payment.type === 1 ? '收入' : '提现' }}
                </view>
                <view v-if="payment.order_id !== 0" class="transaction-identifier">
                    来自订单 {{ payment.order_identifier }}
                </view>
                <view class="transaction-time">
                    {{ payment.created_at }}
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getUserInfoAPI } from "@/api/user"
import { getPaymentAPI, withdrawAPI } from "@/api/payment"

onLoad(async () => {
    loadData()
})

const balance = ref(0)
const paymentList = ref([])

const loadData = async () => {
    const res = await getUserInfoAPI()
    balance.value = res.data.wallet

    const res2 = await getPaymentAPI()
    paymentList.value = res2.data
}

const withdraw = async () => {
    const res = await withdrawAPI()

    uni.showToast({
        title: res.message,
        icon: 'none'
    })
}
</script>

<style scoped lang="scss">
@use './wallet.scss';
</style>
  