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

export const alipayAPI = (id) => {
    return http({
        url: '/index/alipay/' + id,
        method: 'get'
    })
}

export const getMyOrderAPI = (data) => {
    return http({
        url: '/index/order/my',
        method: 'get',
        data
    })
}

export const iReceiveOrderAPI = (id) => {
    return http({
        url: '/index/order/receive/my/' + id,
        method: 'put'
    })
}

export const iReturnOrderAPI = (id) => {
    return http({
        url: '/index/order/return/my/' + id,
        method: 'put'
    })
}