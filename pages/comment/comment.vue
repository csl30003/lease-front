<template>
    <view class="comments-section">
        <!-- 添加发表评论按钮 -->
        <view class="add-comment-button" @tap="showCommentInput(1, 0, 0, '')">
            <text class="add-comment-text">发表评论</text>
        </view>

        <!-- 添加评论输入框 -->
        <view v-if="showInput" class="comment-input-container">
            <input class="comment-input" type="text" :placeholder="replyPlaceholder" v-model="commentInput" />
            <button class="publish-button" @tap="submit">发布</button>
        </view>

        <view v-for="comment in comments" :key="comment.id" class="comment">
            <view class="comment-header" @tap="showCommentInput(2, comment.id, 0, comment.name)">
                <image :src="comment.avatar" alt="User Avatar" class="avatar" />
                <view class="comment-info">
                    <view class="name">{{ comment.name }}</view>
                    <view class="content">{{ comment.content }}</view>
                    <view class="time">{{ comment.created_at }}</view>
                </view>
            </view>

            <view v-if="comment.three_to_comments.length > 0" class="child-comments">
                <view v-for="(childComment, index) in comment.three_to_comments" :key="childComment.id"
                    class="child-comment">
                    <view class="comment-header" @tap="showCommentInput(3, comment.id, childComment.id, childComment.name)">
                        <image :src="childComment.avatar" alt="User Avatar" class="avatar" />
                        <view class="comment-info">
                            <view class="name">{{ childComment.name }}</view>
                            <view class="content">{{ childComment.content }}</view>
                            <view class="time">{{ childComment.created_at }}</view>
                        </view>
                    </view>
                </view>
                <view v-if="comment.child_comment_count > 3" class="child-comments">
                    <!-- 其他代码 -->
                    <view class="more-comments-container">
                        <button @tap="goToCommentDetails(comment.id)" class="more-comments-button">
                            查看更多
                        </button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getRootCommentAPI, addCommentAPI } from "@/api/comment"

let prodId = 0

const comments = ref([])

const flag = ref(0) // 1表示发布顶层评论，2表示回复顶层评论，3表示回复子评论
const showInput = ref(false) // 控制评论输入框的显示与隐藏
const commentInput = ref('') // 评论输入框的内容
const chooseRootCommentId = ref(0) // 选择的顶层评论的id
const chooseToCommentId = ref(0) // 选择的子评论的id
const chooseName = ref('') // 选择的评论的用户名

const replyPlaceholder = ref('')

onLoad(async (options) => {
    prodId = options.prodid// 加载商品信息
    await getComments()
})

const getComments = async () => {
    const res = await getRootCommentAPI(prodId)
    comments.value = res.data

    // 循环遍历评论列表，如果子评论为null，则设置为空数组
    comments.value.forEach(comment => {
        if (!comment.three_to_comments) {
            comment.three_to_comments = []
        }
    })
}

const goToCommentDetails = (commentId) => {
    uni.navigateTo({
        url: '/pages/comment/commentDetail?commentId=' + commentId + '&prodId=' + prodId
    })
}

// 显示评论输入框，并且设置评论初始值
const showCommentInput = async (flagValue, rootCommentId, toCommentId, name) => {
    // 取消评论
    if (showInput.value) {
        showInput.value = false
        commentInput.value = ''
        flag.value = 0
        chooseRootCommentId.value = 0
        chooseToCommentId.value = 0
        chooseName.value = ''
        replyPlaceholder.value = ''
        return
    }

    if (flagValue === 0) {
        replyPlaceholder.value = ''
    } else if (flagValue === 1) {
        replyPlaceholder.value = '发表评论'
    } else if (flagValue === 2) {
        replyPlaceholder.value = '回复 @' + name + ' '
    } else if (flagValue === 3) {
        replyPlaceholder.value = '回复 @' + name + ' '
    }

    showInput.value = true
    commentInput.value = ''
    flag.value = flagValue
    chooseRootCommentId.value = rootCommentId
    chooseToCommentId.value = toCommentId
    chooseName.value = name
}

const submit = async () => {
    if (flag.value === 0) {
        uni.showToast({
            title: '请选择评论类型',
            icon: 'none',
            duration: 2000
        })
    } else if (flag.value === 1) {
        addRootComment()
    } else if (flag.value === 2) {
        replyRootComment()
    } else if (flag.value === 3) {
        replySubComment()
    }
}

const addRootComment = async () => {
    if (commentInput.value.trim() === '') {
        uni.showToast({
            title: '评论内容不能为空',
            icon: 'none',
            duration: 2000
        })
        return
    }

    // 调用接口添加评论
    const res = await addCommentAPI({
        content: commentInput.value,
        product_id: parseInt(prodId),
    })

    if (res.code === 200) {
        commentInput.value = '' // 清空评论输入框内容
        showCommentInput(0, 0, 0, '') // 隐藏评论输入框和设置选择默认值
        await getComments() // 刷新评论列表
        uni.showToast({
            title: '评论成功',
            icon: 'success',
            duration: 2000
        })
    } else {
        uni.showToast({
            title: '评论失败，请稍后再试',
            icon: 'none'
        })
    }
}

const replyRootComment = async () => {
    if (commentInput.value.trim() === '') {
        uni.showToast({
            title: '评论内容不能为空',
            icon: 'none',
            duration: 2000
        })
        return
    }

    // 调用接口添加评论
    const res = await addCommentAPI({
        content: commentInput.value,
        product_id: parseInt(prodId),
        root_comment_id: chooseRootCommentId.value
    })

    if (res.code === 200) {
        commentInput.value = '' // 清空评论输入框内容
        showCommentInput(0, 0, 0, '') // 隐藏评论输入框和设置选择默认值
        await getComments() // 刷新评论列表
        uni.showToast({
            title: '评论成功',
            icon: 'success',
            duration: 2000
        })
    } else {
        uni.showToast({
            title: '评论失败，请稍后再试',
            icon: 'none'
        })
    }
}

const replySubComment = async () => {
    if (commentInput.value.trim() === '') {
        uni.showToast({
            title: '评论内容不能为空',
            icon: 'none',
            duration: 2000
        })
        return
    }

    // 调用接口添加评论
    const res = await addCommentAPI({
        content: replyPlaceholder.value + commentInput.value,
        product_id: parseInt(prodId),
        root_comment_id: chooseRootCommentId.value,
        to_comment_id: chooseToCommentId.value
    })

    if (res.code === 200) {
        commentInput.value = '' // 清空评论输入框内容
        showCommentInput(0, 0, 0, '') // 隐藏评论输入框和设置选择默认值
        await getComments() // 刷新评论列表
        uni.showToast({
            title: '评论成功',
            icon: 'success',
            duration: 2000
        })

    } else {
        uni.showToast({
            title: '评论失败，请稍后再试',
            icon: 'none',
            duration: 2000
        })
    }
}
</script>

<style lang="scss" scoped>
@use './comment.scss';
</style>