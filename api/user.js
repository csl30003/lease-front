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