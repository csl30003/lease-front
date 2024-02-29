<template>
    <view class="Mall4j container">
        <!-- 顶部子分类tab -->
        <scroll-view scroll-x="true" class="category-tit" :scroll-into-view="intoView" :scroll-with-animation="true">
            <block v-for="(item, index) in subCategoryList" :key="index">
                <view :id="'sw' + item.id" :class="'category-item ' + (item.id == categoryId ? 'on' : '')"
                    :data-id="item.id" @tap="onSubCategoryTap">
                    {{ item.name }}
                </view>
            </block>
        </scroll-view>
        <!-- 商品列表 -->
        <view class="prod-item">
            <block v-if="prodList.length">
                <block v-for="(prod, key) in prodList" :key="key">
                    <view class="prod-items" :data-prodid="prod.id" @tap="toProdPage">
                        <view class="hot-imagecont">
                            <image :src="prod.main_image" class="hotsaleimg" />
                        </view>
                        <view class="hot-text">
                            <view class="hotprod-text">
                                {{ prod.name }}
                            </view>
                            <view class="prod-text-info">
                                <view class="price">
                                    <text class="symbol">
                                        ￥
                                    </text>
                                    <text class="big-num">
                                        {{ prod.price }}
                                    </text>
                                    <text class="symbol">
                                        每天
                                    </text>
                                </view>
                            </view>
                        </view>
                    </view>
                </block>
            </block>
            <view v-else class="empty-wrap">
                暂无商品数据~
            </view>
        </view>
    </view>
</template>
  
<script setup>
import { ref, nextTick } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { getCategoryAPI } from "@/api/category"
import { getProductListAPI } from "@/api/product"

const parentId = ref('')
const categoryId = ref(0)
/**
 * 生命周期函数--监听页面加载
 */
onLoad(async (options) => {
    parentId.value = options.parentId
    categoryId.value = options.categoryId
    await getSubCategory()

    await getProdList()
})

const current = ref(1)
const pages = ref(0)
/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom(() => {
    if (current.value < pages.value) {
        current.value = current.value + 1
        getProdList()
    }
})

const intoView = ref('')
const subCategoryList = ref([])
/**
 * 获取顶栏子分类数据
 */
const getSubCategory = async () => {
    const res = await getCategoryAPI(parentId.value)

    subCategoryList.value = res.data
    if (res.data.length === 0) {
        return
    }

    if (categoryId.value === '0') {
        categoryId.value = subCategoryList.value[0].id
    }

    nextTick(() => {
        intoView.value = 'sw' + categoryId.value
    })
}

const prodList = ref([])
const isLoaded = ref(false) // 列表是否加载完毕
/**
 * 根据分类id获取商品列表数据
 */
const getProdList = async () => {
    isLoaded.value = false

    const res = await getProductListAPI({
        category_id: categoryId.value,
        current: current.value,
        size: 10,
        sort: 0,
        order: 'desc',
    })
    isLoaded.value = true
    if (current.value == 1) {
        prodList.value = res.data.records
    } else {
        prodList.value = prodList.value.concat(res.data.records)
    }
    pages.value = res.data.pages
}

/**
 * 切换顶部分类
 */
const onSubCategoryTap = (e) => {
    categoryId.value = e.currentTarget.dataset.id
    current.value = 1
    pages.value = 0
    intoView.value = 'sw' + e.currentTarget.dataset.id
    getProdList()
}

/**
 * 跳转商品下详情
 */
const toProdPage = (e) => {
    const prodid = e.currentTarget.dataset.prodid
    if (prodid) {
        uni.navigateTo({
            url: '/pages/product/product?prodid=' + prodid
        })
    }
}
</script>
  
<style lang="scss" scoped>
@import "./categoryShow.scss";
</style>
  