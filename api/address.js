import http from '@/utils/http'

export const getAddressAPI = () => {
    return http({
        url: '/index/address',
        method: 'get',
    })
}

export const getAddressByIdAPI = (id) => {
    return http({
        url: '/index/address/' + id,
        method: 'get',
    })
}

export const setDefaultAddressAPI = (id) => {
    return http({
        url: '/index/address/' + id + '/default',
        method: 'put',
    })
}

export const addAddressAPI = (data) => {
    return http({
        url: '/index/address',
        method: 'post',
        data
    })
}

export const updateAddressAPI = (id, data) => {
    return http({
        url: '/index/address/' + id,
        method: 'put',
        data
    })
}

export const deleteAddressAPI = (id) => {
    return http({
        url: '/index/address/' + id,
        method: 'delete',
    })
}