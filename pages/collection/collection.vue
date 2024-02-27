<template>
    <view class="prod-list">
    <view class="prod-row" v-for="(item, index) in collectionList" :key="index">
      <view class="prod-items" :data-id="item.product_id" @tap="toProdPage">
        <view class="hot-imagecont">
          <image :src="item.main_image" class="hotsaleimg" />
        </view>
        <view class="hot-text">
          <view class="hotprod-text">
            {{ item.name }}
          </view>
          <view class="prod-text-info">
            <view class="price">
              <text class="symbol">
                ￥
              </text>
              <text class="big-num">
                {{ item.price }}
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
import { onShow } from '@dcloudio/uni-app'
import { getCollectionAPI } from "@/api/collection"

onShow(() => {
    getCollection()
})

const collectionList = ref([])

const getCollection = async () => {
    const res = await getCollectionAPI()
    collectionList.value = res.data
    if (!collectionList.value) {
        collectionList.value = []
    }
}

const toProdPage = (e) => {
  const prodid = e.currentTarget.dataset.id
  uni.navigateTo({
    url: '/pages/product/product?prodid=' + prodid
  })
}
</script>
  
<style scoped lang="scss">
@use './collection.scss';
</style>
  