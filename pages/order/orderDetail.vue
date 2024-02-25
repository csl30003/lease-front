<template>
    <view class="container">
        <view class="order-detail">
            <view class="delivery-addr">
                我的地址信息
                <view class="user-info">
                    <text class="item">
                        {{ order.my_address_name }}
                    </text>
                    <text class="item">
                        {{ order.my_address_phone }}
                    </text>
                </view>
                <view class="addr">
                    {{ order.my_address_province }}{{ order.my_address_city }}{{ order.my_address_district }}{{
                        order.my_address_detail }}
                </view>
            </view>

            <view class="delivery-addr">
                对方地址信息
                <view class="user-info">
                    <text class="item">
                        {{ order.his_address_name }}
                    </text>
                    <text class="item">
                        {{ order.his_address_phone }}
                    </text>
                </view>
                <view class="addr">
                    {{ order.his_address_province }}{{ order.his_address_city }}{{ order.his_address_district }}{{
                        order.his_address_detail }}
                </view>
            </view>

            <!-- 商品信息 -->
            <view class="prod-item">
                <view class="item-cont" :data-prodid="order.product_id" @tap="toProdPage">
                    <view class="prod-pic">
                        <image :src="order.product_image" />
                    </view>
                    <view class="prod-info">
                        <view class="prodname">
                            {{ order.product_name }}
                        </view>

                        <view class="prod-info-cont">
                            <text class="number">
                                数量：{{ order.product_quantity }}
                            </text>
                            <text class="number">
                                天数：{{ order.use_days }}
                            </text>
                        </view>

                        <view class="price-nums clearfix">
                            <text class="prodprice">
                                <text class="symbol">
                                    单价 ￥
                                </text>
                                <text class="big-num">
                                    {{ order.product_price }} 每天
                                </text>
                            </text>
                            <view class="btn-box" />
                        </view>
                    </view>
                </view>
            </view>



            <!-- 订单信息 -->
            <view class="order-msg">
                <view class="msg-item">
                    <view class="item">
                        <text class="item-tit">
                            订单编号：
                        </text>
                        <text class="item-txt">
                            {{ order.identifier }}
                        </text>
                    </view>
                    <view class="item">
                        <text class="item-tit">
                            下单时间：
                        </text>
                        <text class="item-txt">
                            {{ order.created_at }}
                        </text>
                    </view>
                </view>
                <view class="msg-item">
                    <view class="item">
                        <text class="item-tit">
                            支付方式：
                        </text>
                        <text class="item-txt">
                            {{ paymentTypeValue }}
                        </text>
                    </view>
                    <view class="item">
                        <text class="item-tit">
                            配送方式：
                        </text>
                        <text class="item-txt">
                            {{ deliveryValue }}
                        </text>
                    </view>
                </view>
            </view>

            <view class="order-msg">
                <view class="msg-item">
                    <view class="item">
                        <view class="item-tit">
                            订单总额：
                        </view>
                        <view class="item-txt price">
                            <text class="symbol">
                                ￥
                            </text>
                            <text class="big-num">
                                {{ order.actual_payment }}
                            </text>
                        </view>
                    </view>
                    <view class="item payment">
                        <view class="item-txt price">
                            实付款：
                            <text class="symbol">
                                ￥
                            </text>
                            <text class="big-num">
                                {{ order.actual_payment }}
                            </text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow, onLoad } from '@dcloudio/uni-app'
import { getOrderAPI } from "@/api/order"


const orderId = ref(0) // 订单id
const order = ref({}) // 订单信息
const paymentTypeValue = ref('') // 支付方式
const deliveryValue = ref('') // 配送方式

onLoad(async (options) => {
    orderId.value = parseInt(options.orderId)
})

onShow(async () => {
    const res = await getOrderAPI(orderId.value)

    order.value = res.data

    paymentTypeValue.value = res.data.payment_type === 0 ? '支付宝支付' : '微信支付'
    deliveryValue.value = res.data.delivery === 0 ? '邮寄' : '自提'
})

const toProdPage = (e) => {
    const prodid = e.currentTarget.dataset.prodid
    uni.navigateTo({
        url: '/pages/product/product?prodid=' + prodid
    })
}
</script>

<style scoped lang="scss">
@use './OrderDetail.scss';
</style>