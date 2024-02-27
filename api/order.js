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

export const iSolveOrderAPI = (id) => {
    return http({
        url: '/index/order/solve/' + id,
        method: 'put'
    })
}

export const getMyReleaseOrderAPI = (data) => {
    return http({
        url: '/index/order/his',
        method: 'get',
        data
    })
}

export const heDeliveryOrderAPI = (id) => {
    return http({
        url: '/index/order/delivery/his/' + id,
        method: 'put'
    })
}

export const heReceiveOrderAPI = (id) => {
    return http({
        url: '/index/order/receive/his/' + id,
        method: 'put'
    })
}

export const heInspectOrderHasProblemAPI = (id) => {
    return http({
        url: '/index/order/inspect/problem/his/' + id,
        method: 'put'
    })
}

export const heInspectOrderWithoutProblemAPI = (id) => {
    return http({
        url: '/index/order/inspect/ok/his/' + id,
        method: 'put'
    })
}

export const getOrderCountAPI = () => {
    return http({
        url: '/index/order/count',
        method: 'get'
    })
}