<template>
    <view class="container">
        <!-- 头部菜单 -->
        <scroll-view scroll-x="true" class="order-tit" :scroll-with-animation="true">
            <text data-sts="10" :class="sts == 10 ? 'on' : ''" @tap="onStsTap">
                全部
            </text>
            <text data-sts="0" :class="sts == 0 ? 'on' : ''" @tap="onStsTap">
                已取消
            </text>
            <text data-sts="1" :class="sts == 1 ? 'on' : ''" @tap="onStsTap">
                待支付
            </text>
            <text data-sts="2" :class="sts == 2 ? 'on' : ''" @tap="onStsTap">
                待对方发货
            </text>
            <text data-sts="3" :class="sts == 3 ? 'on' : ''" @tap="onStsTap">
                待我方收货
            </text>
            <text data-sts="4" :class="sts == 4 ? 'on' : ''" @tap="onStsTap">
                待我方归还
            </text>
            <text data-sts="5" :class="sts == 5 ? 'on' : ''" @tap="onStsTap">
                待对方收货
            </text>
            <text data-sts="6" :class="sts == 6 ? 'on' : ''" @tap="onStsTap">
                待对方检查
            </text>
            <text data-sts="7" :class="sts == 7 ? 'on' : ''" @tap="onStsTap">
                待共同解决
            </text>
            <text data-sts="8" :class="sts == 8 ? 'on' : ''" @tap="onStsTap">
                已完成
            </text>
        </scroll-view>
        <!-- end 头部菜单 -->

        <view class="main">
            <view v-if="orderList.length == 0" class="empty">
                还没有任何相关订单
            </view>
            <!-- 订单列表 -->
            <block v-for="(item, index) in orderList" :key="index">
                <view class="prod-item">
                    <view class="order-num">
                        <text>订单编号：{{ item.identifier }}</text>
                        <view class="order-state">
                            <text
                                :class="'order-sts  ' + (item.status == 1 || item.status == 3 || item.status == 4 || item.status == 7 ? 'red' : '') + '  ' + ((item.status == 8) ? 'gray' : '')">
                                {{
                                    item.status == 0 ? '已取消' : (item.status == 1 ? '待支付' : (item.status == 2 ? '待对方发货' : (item.status == 3 ? '待我方收货' : (item.status == 4 ? '待我方归还' : (item.status == 5 ? '待对方收货' : (item.status == 6 ? '待对方检查' : (item.status == 7 ? '待共同解决' : '已完成')))))))
                                }}
                            </text>

                            <!-- <view v-if="item.status == 8" class="clear-btn">
                                <image src="@/static/images/icon/clear-his.png" class="clear-list-btn"
                                    :data-id="item.id" @tap="delOrderList" />
                            </view> -->
                        </view>
                    </view>

                    <view>
                        <view class="item-cont" :data-id="item.id" @tap="toOrderDetailPage">
                            <view class="prod-pic">
                                <image :src="item.product_image" />
                            </view>
                            <view class="prod-info">
                                <view class="prodname">
                                    {{ item.product_name }}
                                </view>
                                <!-- <view class="prod-info-cont">
                                    {{ item.skuName }}
                                </view> -->
                                <view class="price-nums">
                                    <text class="prodprice">
                                        <text class="symbol">
                                            ￥
                                        </text>
                                        <text class="big-num">
                                            {{ item.product_price }}
                                        </text>
                                    </text>
                                    <text class="prodcount">
                                        租赁数量x{{ item.product_quantity }}
                                    </text>
                                    <text class="prodcount">
                                        租赁天数x{{ item.use_days }}
                                    </text>
                                </view>
                            </view>
                        </view>
                    </view>

                    <view class="total-num">
                        <text class="prodcount">
                            共1件商品
                        </text>
                        <view class="prodprice">
                            合计：
                            <text class="symbol">
                                ￥
                            </text>
                            <text class="big-num">
                                {{ item.actual_payment }}
                            </text>
                        </view>
                    </view>
                    <!-- end 商品列表 -->

                    <view class="prod-foot">
                        <view class="btn">
                            <text v-if="item.status == 1" class="button" :data-id="item.id"
                                hover-class="none" @tap="onCancelOrder">
                                取消订单
                            </text>
                            <text v-if="item.status == 1" class="button warn" :data-id="item.id"
                                hover-class="none" @tap="normalPay">
                                付款
                            </text>
                            <text v-if="item.status == 3" class="button warn" :data-id="item.id"
                                hover-class="none" @tap="onConfirmReceive">
                                确认收货
                            </text>
                            <text v-if="item.status == 4" class="button warn"
                                :data-id="item.id" hover-class="none" @tap="toReturn">
                                确认归还
                            </text>
                            <text v-if="item.status == 7" class="button warn"
                                :data-id="item.id" hover-class="none" @tap="toComplete">
                                我已解决
                            </text>
                        </view>
                    </view>
                </view>
            </block>
        </view>
    </view>
    <!-- end 订单列表 -->
</template>
  
<script setup>
import { ref } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { getMyOrderAPI, iReceiveOrderAPI, iReturnOrderAPI } from "@/api/order"

const sts = ref(0)
/**
 * 生命周期函数--监听页面加载
 */
onLoad((options) => {
    if (options.sts) {
        sts.value = options.sts
        loadOrderData(options.sts, 1)
    } else {
        // 目前状态有0-8，其他表示全部
        loadOrderData(10, 1)
    }
})

const current = ref(1)
const pages = ref(0)
/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom(() => {
    if (current.value < pages.value) {
        current.value = current.value + 1
        loadOrderData(sts.value, current.value)
    }
})

const orderList = ref([])
/**
 * 加载订单数据
 */
const loadOrderData = async (sts, currentParam) => {
    const res = await getMyOrderAPI({
        current: currentParam,
        size: 10,
        status: sts
    })
    if (current.value === 1) {
        orderList.value = res.data.records
        if (!orderList.value) {
            orderList.value = []
        }
    } else {
        orderList.value = orderList.value.concat(res.data.records)
    }
    pages.value = res.data.pages
}

/**
 * 状态点击事件
 */
const onStsTap = (e) => {
    sts.value = e.currentTarget.dataset.sts
    current.value = 1
    pages.value = 0
    loadOrderData(sts.value, current.value)
}

/**
 * 取消订单
 */
const onCancelOrder = (e) => {
    uni.navigateTo({
		url: '/pages/order/pendingPaymentOrder?orderId=' + e.currentTarget.dataset.id
	})
}

/**
 * 前往支付
 * @param e
 */
const normalPay = (e) => {
    uni.navigateTo({
		url: '/pages/order/pendingPaymentOrder?orderId=' + e.currentTarget.dataset.id
	})
}

/**
 * 查看订单详情
 */
const toOrderDetailPage = (e) => {
    uni.navigateTo({
        url: '/pages/order/orderDetail?orderId=' + e.currentTarget.dataset.id
    })
}

/**
 * 确认收货
 */
const onConfirmReceive = async (e) => {
    uni.showModal({
        title: '',
        content: '我已收到货？',
        confirmColor: '#eb2444',

        async success(res) {
            if (res.confirm) {
                const res = await iReceiveOrderAPI(e.currentTarget.dataset.id)
                loadOrderData(sts.value, 1)
            }
        }
    })
}

const toReturn = async (e) => {
    uni.showModal({
        title: '',
        content: '我已归还商品？',
        confirmColor: '#eb2444',

        async success(res) {
            if (res.confirm) {
                const res = await iReturnOrderAPI(e.currentTarget.dataset.id)
                loadOrderData(sts.value, 1)
            }
        }
    })
}

/**
 * 删除已完成||已取消的订单
 * @param e
 */
const delOrderList = (e) => {
    uni.showModal({
        title: '',
        content: '确定要删除此订单吗？',
        confirmColor: '#eb2444',

        success(res) {
            if (res.confirm) {
                const ordernum = e.currentTarget.dataset.ordernum
                uni.showLoading()

                http.request({
                    url: '/p/myOrder/' + ordernum,
                    method: 'DELETE'
                })
                    .then(() => {
                        loadOrderData(sts.value, 1)
                        uni.hideLoading()
                    })
            }
        }
    })
}

</script>
  
<style scoped lang="scss">
@use './orderList.scss';
</style>
  