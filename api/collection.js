import http from '@/utils/http'

export const isCollectionAPI = (productID) => {
    return http({
        url: '/index/collection/isCollection/' + productID,
        method: 'get'
    })

}

export const collectionAPI = (data) => {
    return http({
        url: '/index/collection/addOrCancel',
        method: 'post',
        data: data
    })
}