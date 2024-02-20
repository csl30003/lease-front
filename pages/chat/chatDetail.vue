<template>
    <view class="chat">
        <scroll-view :style="{ height: `${windowHeight}rpx` }" id="scrollview" scroll-y="true" :scroll-top="scrollTop"
            :scroll-with-animation="true" class="scroll-view">
            <!-- 聊天主体 -->
            <view id="msglistview" class="chat-body">
                <!-- 聊天记录 -->
                <view v-for="(item, index) in msgList" :key="index">
                    <!-- 自己发的消息 -->
                    <view class="item self" v-if="item.to_id === parseInt(toId)">
                        <!-- 文字内容 -->
                        <view class="content right">
                            {{ item.content }}
                        </view>
                        <!-- 头像 -->
                        <view class="avatar">
                            <image :src="fromAvatar"></image>
                        </view>
                    </view>
                    <!-- 对方发的消息 -->
                    <view class="item Ai" v-else>
                        <!-- 头像 -->
                        <view class="avatar">
                            <image :src="toAvatar"></image>
                        </view>
                        <!-- 文字内容 -->
                        <view class="content left">
                            {{ item.content }}
                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>
        <!-- 底部消息发送栏 -->
        <!-- 用来占位，防止聊天消息被发送框遮挡 -->
        <view class="chat-bottom">
            <view class="send-msg">
                <view class="uni-textarea">
                    <textarea :value="chatMsg" maxlength="300" :show-confirm-bar="false" auto-height
                        @input="onMessageInput"></textarea>
                </view>
                <button @click="handleSend" class="send-btn">发送</button>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
import { getUserInfoAPI, getOtherUserInfoAPI } from "@/api/user"
import { getChatListAPI, addMessageAPI } from "@/api/chat"

const scrollTop = ref(0);
const chatMsg = ref('');
const toId = ref('');
const toName = ref('');
const toAvatar = ref('');
const fromId = ref('');
const fromName = ref('');
const fromAvatar = ref('');
const msgList = ref([]);

onLoad(async (options) => {
    toId.value = options.toId
    await getMyInfo()
    await getUserInfo()
    await getMessages()

    // 如果msgList长度为0，说明是第一次进入聊天页面，对方自动发送一条打招呼的信息
    if (msgList.value.length === 0) {
        let obj = {
            from_id: parseInt(toId.value),
            to_id: parseInt(fromId.value),
            content: '您好，有什么需要帮助的吗？'
        }
        const res = await addMessageAPI(obj)
        msgList.value.push(obj);
    }
})

const getMyInfo = async () => {
    // 获取我的信息
    const res = await getUserInfoAPI()
    fromId.value = res.data.id
    fromName.value = res.data.name
    fromAvatar.value = res.data.avatar
}

const getUserInfo = async () => {
    // 获取对方的信息
    const res = await getOtherUserInfoAPI(toId.value)
    toName.value = res.data.name
    toAvatar.value = res.data.avatar
}

const getMessages = async () => {
    // 获取聊天记录
    const res = await getChatListAPI(toId.value)

    msgList.value = res.data
}

const windowHeight = computed(() => {
    return rpxToPx(uni.getSystemInfoSync().windowHeight);
});

// px转换成rpx
function rpxToPx(px) {
    let deviceWidth = wx.getSystemInfoSync().windowWidth;
    let rpx = (750 / deviceWidth) * Number(px);
    return Math.floor(rpx);
}

const onMessageInput = (e) => {
    chatMsg.value = e.detail.value
}

// 发送消息
const handleSend = async () => {
    //如果消息不为空
    if (chatMsg.value && !/^\s+$/.test(chatMsg.value)) {
        let obj = {
            from_id: parseInt(fromId.value),
            to_id: parseInt(toId.value),
            content: chatMsg.value
        }
        const res = await addMessageAPI(obj)

        // 注意，现在直接将obj加入列表问题不大，但是这个obj是没有id、时间等信息的，实际上，最好是后端返回的数据
        msgList.value.push(obj);
        chatMsg.value = '';
    } else {
        showToast('不能发送空白消息');
    }
}
</script>

<style lang="scss" scoped>
@use './chatDetail.scss';
</style>
