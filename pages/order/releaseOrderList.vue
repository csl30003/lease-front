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
                待对方支付
            </text>
            <text data-sts="2" :class="sts == 2 ? 'on' : ''" @tap="onStsTap">
                待我方发货
            </text>
            <text data-sts="3" :class="sts == 3 ? 'on' : ''" @tap="onStsTap">
                待对方收货
            </text>
            <text data-sts="4" :class="sts == 4 ? 'on' : ''" @tap="onStsTap">
                待对方归还
            </text>
            <text data-sts="5" :class="sts == 5 ? 'on' : ''" @tap="onStsTap">
                待我方收货
            </text>
            <text data-sts="6" :class="sts == 6 ? 'on' : ''" @tap="onStsTap">
                待我方检查
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
                                :class="'order-sts  ' + (item.status == 2 || item.status == 5 || item.status == 6 || item.status == 7 ? 'red' : '') + '  ' + ((item.status == 8) ? 'gray' : '')">
                                {{
                                    item.status == 0 ? '已取消' : (item.status == 1 ? '待对方支付' : (item.status == 2 ? '待我方发货' :
                                        (item.status == 3 ? '待对方收货' : (item.status == 4 ? '待对方归还' : (item.status == 5 ? '待我方收货' :
                                            (item.status == 6 ? '待我方检查' : (item.status == 7 ? '待共同解决' : '已完成')))))))
                                }}
                            </text>
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
                            <text v-if="item.status == 2" class="button warn" :data-id="item.id" hover-class="none"
                                @tap="toDelivery">
                                确认发货
                            </text>
                            <text v-if="item.status == 5" class="button warn" :data-id="item.id" hover-class="none"
                                @tap="onConfirmReceive">
                                确认收货
                            </text>
                            <text v-if="item.status == 6" class="button warn" :data-id="item.id" hover-class="none"
                                @tap="onInspect">
                                检查完毕
                            </text>
                            <text v-if="item.status == 7" class="button warn" :data-id="item.id" hover-class="none"
                                @tap="toComplete">
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
import { getMyReleaseOrderAPI, heDeliveryOrderAPI, heReceiveOrderAPI, heInspectOrderHasProblemAPI, heInspectOrderWithoutProblemAPI, iSolveOrderAPI } from "@/api/order"

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
    const res = await getMyReleaseOrderAPI({
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
 * 查看订单详情
 */
const toOrderDetailPage = (e) => {
    uni.navigateTo({
        url: '/pages/order/orderDetail?orderId=' + e.currentTarget.dataset.id
    })
}

/**
 * 确认发货
 */
const toDelivery = (e) => {
    uni.showModal({
        title: '',
        content: '确定已经发货了吗？',
        confirmColor: '#eb2444',

        async success(res) {
            if (res.confirm) {
                const res = await heDeliveryOrderAPI(e.currentTarget.dataset.id)
                loadOrderData(sts.value, 1)
            }
        }
    })
}

/**
 * 确认收货
 */
const onConfirmReceive = async (e) => {
    uni.showModal({
        title: '',
        content: '我已收到顾客归还的商品？',
        confirmColor: '#eb2444',

        async success(res) {
            if (res.confirm) {
                const res = await heReceiveOrderAPI(e.currentTarget.dataset.id)
                loadOrderData(sts.value, 1)
            }
        }
    })
}

/**
 * 检查完毕
 */
const onInspect = (e) => {
    uni.showActionSheet({
        itemList: ['无问题，订单完成', '有问题，需要双方协商解决'],
        async success(res) {
            if (res.tapIndex === 1) {
                // 订单进入状态7
                const res = await heInspectOrderHasProblemAPI(e.currentTarget.dataset.id)
                loadOrderData(sts.value, 1)
            } else if (res.tapIndex === 0) {
                // 订单进入状态8
                const res = await heInspectOrderWithoutProblemAPI(e.currentTarget.dataset.id)
                loadOrderData(sts.value, 1)
            }
        }
    })
}

/**
 * 确认解决
 */
const toComplete = async (e) => {
    uni.showModal({
        title: '',
        content: '我已解决问题？',
        confirmColor: '#eb2444',

        async success(res) {
            if (res.confirm) {
                const res = await iSolveOrderAPI(e.currentTarget.dataset.id)
                loadOrderData(sts.value, 1)

                if (res.data === 1) {
                    uni.showToast({
                        title: '我方已解决问题，等待对方确认',
                        icon: 'none'
                    })
                } else if (res.data === 2) {
                    uni.showToast({
                        title: '双方都确认解决问题，订单已完成',
                        icon: 'none'
                    })
                } else {
                    uni.showToast({
                        title: res.message,
                        icon: 'none'
                    })
                }
            }
        }
    })
}
</script>
  
<style scoped lang="scss">
@use './releaseOrderList.scss';
</style>
  