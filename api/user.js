import http from '@/utils/http'

export const loginAPI = (params) => {
    return http({
        url: '/login',
        method: 'post',
        data: {
            name: params.name,
            password: params.password
        }
    })
}

export const registerAPI = (params) => {
    return http({
        url: '/register',
        method: 'post',
        data: {
            name: params.name,
            password: params.password
        }
    })
}

export const logoutAPI = () => {
    return http({
        url: '/index/logout',
        method: 'post',
    })
}

export const getUserInfoAPI = () => {
    return http({
        url: '/index/getUserInfo',
        method: 'get',
    })
}

export const getOtherUserInfoAPI = (id) => {
    return http({
        url: '/index/getUserInfo/' + id,
        method: 'get',
    })
}

export const updateUserInfoAPI = (params) => {
    return http({
        url: '/index/updateUser',
        method: 'put',
        data: {
            name: params.name,
            phone: params.phone,
            country: params.country,
            province: params.province,
            city: params.city,
            district: params.district
        }
    })
}
