<template>
    <view class="container">
        <view class="order-detail">
            <view class="delivery-addr">
                我的地址信息
                <view class="user-info">
                    <text class="item">
                        {{ myAddressName }}
                    </text>
                    <text class="item">
                        {{ myAddressPhone }}
                    </text>
                </view>
                <view class="addr">
                    {{ myAddressProvince }}{{ myAddressCity }}{{ myAddressDistrict }}{{ myAddressDetail }}
                </view>
            </view>

            <view class="delivery-addr">
                对方地址信息
                <view class="user-info">
                    <text class="item">
                        {{ hisAddressName }}
                    </text>
                    <text class="item">
                        {{ hisAddressPhone }}
                    </text>
                </view>
                <view class="addr">
                    {{ hisAddressProvince }}{{ hisAddressCity }}{{ hisAddressDistrict }}{{ hisAddressDetail }}
                </view>
            </view>

            <!-- 商品信息 -->
            <view class="prod-item">
                <view class="item-cont" :data-prodid="productId" @tap="toProdPage">
                    <view class="prod-pic">
                        <image :src="productImage" />
                    </view>
                    <view class="prod-info">
                        <view class="prodname">
                            {{ productName }}
                        </view>

                        <view class="prod-info-cont">
                            <text class="number">
                                数量：{{ productQuantity }}
                            </text>
                            <text class="number">
                                天数：{{ useDays }}
                            </text>
                        </view>

                        <view class="price-nums clearfix">
                            <text class="prodprice">
                                <text class="symbol">
                                    单价 ￥
                                </text>
                                <text class="big-num">
                                    {{ productPrice }} 每天
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
                                {{ actualPayment }}
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
                                {{ actualPayment }}
                            </text>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 底部栏 -->
            <view class="order-detail-footer">
                <text class="pay" @tap="toPay">
                    下单
                </text>
            </view>
        </view>
    </view>
</template>
  
<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getProductAPI } from "@/api/product"
import { getAddressByIdAPI } from "@/api/address"
import { addOrderAPI } from "@/api/order"


// onLoad((options) => {
//     loadOrderDetail(options.orderNum)
// })

const productId = ref(0) // 商品id
const productName = ref('') // 商品名称
const productPrice = ref(0) // 商品价格
const productStock = ref(0) // 商品当前库存
const productImage = ref('') // 商品图片
const productQuantity = ref(0) // 商品数量
const useDays = ref(0) // 租赁天数
const delivery = ref(0) // 配送方式
const deliveryValue = ref('') // 配送方式
const actualPayment = ref(0) // 实付款
const paymentType = ref(0) // 支付方式id，默认0支付宝
const paymentTypeValue = ref('支付宝支付') // 支付方式
const userId = ref(0) // 用户id
const hisId = ref(0) // 对方id

const myAddressId = ref(0) // 我方地址id
const myAddressName = ref('') // 我方名称
const myAddressPhone = ref('') // 我方电话
const myAddressProvince = ref('') // 我方省
const myAddressCity = ref('') // 我方市
const myAddressDistrict = ref('') // 我方区
const myAddressDetail = ref('') // 我方详细地址
const hisAddressId = ref(0) // 对方地址id
const hisAddressName = ref('') // 对方名称
const hisAddressPhone = ref('') // 对方电话
const hisAddressProvince = ref('') // 对方省
const hisAddressCity = ref('') // 对方市
const hisAddressDistrict = ref('') // 对方区
const hisAddressDetail = ref('') // 对方详细地址

onLoad(async (options) => {
    productId.value = parseInt(options.productId)
    productQuantity.value = parseInt(options.quantity)
    useDays.value = parseInt(options.days)

    if (uni.getStorageSync('loginResult')) {
        userId.value = uni.getStorageSync('loginResult').id
    } else {
        // 未登录
        uni.clearStorageSync()
        uni.showModal({
            title: "提示",
            content: "请登录",
            showCancel: false,
            success(res) {
                setTimeout(() => {
                    uni.navigateTo({
                        url: "/pages/login/login",
                    })
                }, 1000);
            },
            fail: (fail) => {
                setTimeout(() => {
                    uni.navigateTo({
                        url: "/pages/index/index",
                    })
                }, 1000);
            },
        });
    }
    myAddressId.value = parseInt(options.addressId)

    // 通过productId获取商品信息和对方地址信息
    const res = await getProductAPI(productId.value)
    productName.value = res.data.name
    productPrice.value = res.data.price
    productStock.value = res.data.stock
    productImage.value = res.data.main_image
    delivery.value = res.data.delivery
    deliveryValue.value = res.data.delivery === 0 ? '邮寄' : '自提'
    hisId.value = res.data.user_id
    hisAddressId.value = res.data.address_id
    hisAddressName.value = res.data.address_name
    hisAddressPhone.value = res.data.address_phone
    hisAddressProvince.value = res.data.address_province
    hisAddressCity.value = res.data.address_city
    hisAddressDistrict.value = res.data.address_district
    hisAddressDetail.value = res.data.address_detail

    // 通过我方地址id获取我方地址信息
    const res2 = await getAddressByIdAPI(myAddressId.value)
    myAddressName.value = res2.data.name
    myAddressPhone.value = res2.data.phone
    myAddressProvince.value = res2.data.province
    myAddressCity.value = res2.data.city
    myAddressDistrict.value = res2.data.district
    myAddressDetail.value = res2.data.detail

    // 计算实际付款
    actualPayment.value = productPrice.value * productQuantity.value * useDays.value
})

/**
 * 跳转商品详情页
 * @param e
 */
const toProdPage = (e) => {
    const prodid = e.currentTarget.dataset.prodid
    uni.navigateTo({
        url: '/pages/product/product?prodid=' + prodid
    })
}

const toPay = async () => {
    uni.showModal({
        title: '提示',
        content: '确定下单吗？',
        showCancel: true,
        success: async (res) => {
            if (res.confirm) {
                // 如果库存不够
                if (productStock.value < productQuantity.value) {
                    uni.showToast({
                        title: '库存不足',
                        icon: 'none'
                    })
                    return
                }

                const r = await addOrderAPI({
                    status: 1,
                    product_price: productPrice.value,
                    use_days: useDays.value,
                    product_quantity: productQuantity.value,
                    actual_payment: actualPayment.value,
                    payment_type: paymentType.value,
                    user_id: userId.value,
                    his_id: hisId.value,
                    my_address_id: myAddressId.value,
                    his_address_id: hisAddressId.value,
                    product_id: productId.value
                })

                if (r.data) {
                    uni.showToast({
                        title: '下单成功',
                        icon: 'none'
                    })
                    setTimeout(() => {
                        uni.reLaunch({
                            url: '/pages/order/pendingPaymentOrder?orderId=' + r.data
                        })
                    }, 1000)
                }

            }
        }
    })
}


const remarks = ref('')
const orderItemDtos = ref([])
const reduceAmount = ref('')
const transfee = ref('')
const status = ref(0)
const actualTotal = ref(0)
const userAddrDto = ref(null)
const orderNumber = ref('')
const createTime = ref('')
const total = ref(0) // 商品总额
/**
 * 加载订单数据
 */
const loadOrderDetail = (orderNum) => {
    uni.showLoading() // 加载订单详情
    http.request({
        url: '/p/myOrder/orderDetail',
        method: 'GET',
        data: {
            orderNumber: orderNum
        }
    })
        .then(({ data }) => {
            orderNumber.value = orderNum
            actualTotal.value = data.actualTotal
            userAddrDto.value = data.userAddrDto
            remarks.value = data.remarks
            orderItemDtos.value = data.orderItemDtos
            createTime.value = data.createTime
            status.value = data.status
            transfee.value = data.transfee
            reduceAmount.value = data.reduceAmount
            total.value = data.total
            uni.hideLoading()
        })
}

/**
 * 删除已完成||已取消的订单
 */
const delOrderList = () => {
    uni.showModal({
        title: '',
        content: '确定要删除此订单吗？',
        confirmColor: '#eb2444',
        success(res) {
            if (res.confirm) {
                uni.showLoading()
                http.request({
                    url: '/p/myOrder/' + orderNumber.value,
                    method: 'DELETE'
                })
                    .then(() => {
                        uni.hideLoading()
                        uni.showToast({
                            title: res || '删除成功',
                            icon: 'none'
                        })
                        setTimeout(() => {
                            uni.redirectTo({
                                url: '/pages/orderList/orderList'
                            })
                        }, 1000)
                    })
            }
        }
    })
}
</script>
  
<style scoped lang="scss">
@use './order.scss';
</style>
  