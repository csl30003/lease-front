import http from '@/utils/http'

export const addProductAPI = (data) => {
    return http({
        url: '/index/product',
        method: 'post',
        data
    })
}

export const updateProductStatusAPI = (data) => {
    return http({
        url: '/index/product/status',
        method: 'put',
        data
    })
}

export const getMyProductAPI = (status) => {
    return http({
        url: '/index/product/my/' + status,
        method: 'get',
    })
}

export const getProductListAPI = (data) => {
    return http({
        url: '/index/product/list',
        method: 'get',
        data: data
    })
}