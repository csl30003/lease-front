import http from '@/utils/http'

export const getCategoryAPI = (parentId) => {
    return http({
        url: '/category/' + parentId,
        method: 'get',
    })
}