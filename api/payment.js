import http from '@/utils/http'

export const alipayAPI = (id) => {
    return http({
        url: '/index/alipay/' + id,
        method: 'get'
    })
}

export const getPaymentAPI = () => {
    return http({
        url: '/index/payment',
        method: 'get'
    })
}

export const withdrawAPI = () => {
    return http({
        url: '/index/withdraw',
        method: 'post'
    })
}