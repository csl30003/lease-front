import http from '@/utils/http'

export const addOrderAPI = (data) => {
    return http({
        url: '/index/order',
        method: 'post',
        data
    })
}

export const getOrderAPI = (id) => {
    return http({
        url: '/index/order/' + id, 
        method: 'get'
    })
}

export const cancelOrderAPI = (id) => {
    return http({
        url: '/index/order/' + id,
        method: 'delete'
    })
}