import http from '@/utils/http'

export const getChatUserAPI = () => {
    return http({
        url: '/index/message/user',
        method: 'get',
    })
}

export const getChatListAPI = (toId) => {
    return http({
        url: '/index/message/list/' + toId,
        method: 'get',
    })
}

export const addMessageAPI = (data) => {
    return http({
        url: '/index/message',
        method: 'post',
        data
    })
}