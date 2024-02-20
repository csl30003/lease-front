<template>
	<view class="container">
		<!-- 商品列表 -->
		<view class="prod-list">

			<!-- 纵向列表 -->
			<view class="cont-item">
				<block v-for="(item, index) in chatUserList" :key="index">
					<view class="show-item" :data-toid="item.to_id" @tap="toChatPage">
						<view class="more-prod-pic">
							<image :src="item.avatar" class="more-pic" />
						</view>
						<view class="prod-text-right">
							<view class="prod-text more">
								{{ item.name }}
							</view>

							<view class="prod-price more">
								<text class="big-num">
									{{ item.content }}
								</text>
							</view>
						</view>
					</view>
				</block>
			</view>

			<!-- 空占位 -->
			<view v-if="!chatUserList.length" :class="['empty', showType == 1 ? 'empty-top' : '']">
				暂无聊天内容
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getChatUserAPI } from "@/api/chat"

const chatUserList = ref([])
const isLoaded = ref(false)

onShow(async () => {
    await toLoadData()
})

const toLoadData = async () => {
    isLoaded.value = false

    const res = await getChatUserAPI()

	chatUserList.value = res.data

    isLoaded.value = true
}

const toChatPage = (e) => {
    uni.navigateTo({
        url: '/pages/chat/chatDetail?toId=' + e.currentTarget.dataset.toid
    })
}

</script>

<style scoped lang="scss">
@use './chat.scss';
</style>