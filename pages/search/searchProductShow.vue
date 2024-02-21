<template>
    <view class="container">
        <!-- 搜索框 -->
        <view class="fixed-box">
            <view class="search-bar">
                <view class="search-box">
                    <input placeholder="输入关键字搜索" class="sear-input" :value="prodName" confirm-type="search"
                        @input="getSearchContent" @confirm="toSearchConfirm">
                    <image src="@/static/images/icon/search.png" class="search-img" />
                </view>
            </view>
            <view class="tabs">
                <text :class="'tab-item complete ' + (sts == 0 ? 'on' : '')" data-sts="0" @tap="onStsTap">
                    时间
                </text>
                <text :class="'tab-item ' + (sts == 1 ? 'on' : '')" data-sts="1" @tap="onStsTap">
                    使用时间
                </text>
                <text :class="'tab-item ' + (sts == 2 ? 'on' : '')" data-sts="2" @tap="onStsTap">
                    价格
                </text>
            </view>
        </view>

        <!-- 商品列表 -->
        <view class="prod-list">

            <!-- 纵向列表 -->
            <view class="cont-item">
                <block v-for="(item, index) in searchProdList" :key="index">
                    <view class="show-item" :data-prodid="item.id" @tap="toProdPage">
                        <view class="more-prod-pic">
                            <image :src="item.main_image" class="more-pic" />
                        </view>
                        <view class="prod-text-right">
                            <view class="prod-text more">
                                {{ item.name }}
                            </view>
                            
                            <view class="prod-price more">
                                <text class="symbol">
                                    ￥
                                </text>
                                <text class="big-num">
                                    {{ item.price }}
                                </text>
                                <text class="symbol">
                                    每天
                                </text>
                            </view>

                            <view class="cate-prod-info">
                                {{ item.detail }}
                            </view>
                        </view>
                    </view>
                </block>
            </view>

            <!-- 空占位 -->
            <view v-if="!searchProdList.length" :class="['empty', 'empty-top']">
                暂无结果
            </view>
        </view>
    </view>
</template>
  
<script setup>
import { ref } from 'vue'
import { onShow, onLoad, onReachBottom } from '@dcloudio/uni-app'
import { getProductListAPI } from "@/api/product"

const prodName = ref('')

/**
 * 生命周期函数--监听页面加载
 */
onLoad((options) => {
    prodName.value = options.prodName
})

/**
 * 生命周期函数--监听页面显示
 */
onShow(async () => {
    await toLoadData()
})

const isLoaded = ref(false) // 列表是否加载完毕
const current = ref(1)
const pages = ref(0)
/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom(async () => {
    if (current.value < pages.value) {
        current.value = current.value + 1
        await toLoadData()
    }
})

/**
 * 输入商品获取数据
 * @param e
 */
const getSearchContent = (e) => {
    prodName.value = e.detail.value
}

const sts = ref(0)
const searchProdList = ref([])
/**
 *  请求商品接口
 */
const toLoadData = async () => {
    isLoaded.value = false

    const res = await getProductListAPI({
        current: current.value,
        size: 10,
        name: prodName.value,
        sort: sts.value
    })

    isLoaded.value = true
    if (current.value == 1) {
        searchProdList.value = res.data.records
    } else {
        searchProdList.value = searchProdList.value.concat(res.data.records)
    }
    pages.value = res.data.pages
}

/**
 * 当前搜索页二次搜索商品
 */
const toSearchConfirm = (e) => {
    if (e.detail.value) {
        let recentSearch = uni.getStorageSync('recentSearch') || []
        recentSearch = recentSearch.filter(item => item !== prodName.value)
        recentSearch.unshift(prodName.value)
        if (recentSearch.length > 10) {
            recentSearch.pop()
        }
        uni.setStorageSync('recentSearch', recentSearch)
    }
    uni.redirectTo({
        url: '/pages/search/searchProductShow?prodName=' + e.detail.value
    })
}

/**
 * 状态点击事件
 */
const onStsTap = async (e) => {
    sts.value = e.currentTarget.dataset.sts
    current.value = 1
    pages.value = 0
    searchProdList.value = []
    await toLoadData()
}

const toProdPage = (e) => {
    uni.navigateTo({
        url: '/pages/product/product?prodid=' + e.currentTarget.dataset.prodid
    })
}
</script>
  
<style scoped lang="scss">
@use './searchProductShow.scss';
</style>
  