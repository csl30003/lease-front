import http from '@/utils/http'

export const getTwoCommentAPI = (productId) => {
    return http({
        url: '/index/comment/two/' + productId,
        method: 'get',
    })
}

export const getRootCommentAPI = (productId) => {
    return http({
        url: '/index/comment/root/' + productId,
        method: 'get',
    })
}

export const getCommentListAPI = (commentId) => {
    return http({
        url: '/index/comment/list/' + commentId,
        method: 'get',
    })
}

export const addCommentAPI = (data) => {
    return http({
        url: '/index/comment',
        method: 'post',
        data
    })
}