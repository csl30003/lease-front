import http from '@/utils/http'

// hello world
export const helloWorld = (params) => {
    return http({
        url: '/hello',
        method: 'post',
        data: {
            name: 'world',
            sex: params
        }
    })
}

// // 以下 api 为博主项目示例，实际与项目相匹配

// // 分页查询学习列表
// export const pageStudyInfo = (params) => {
//     return http({
//         url: '/study/studyInfo/page',
//         method: 'get',
//         data: params
//     })
// }
// // 查询学习列表
// export const listStudyInfo = (params) => {
//     return http({
//         url: '/study/studyInfo/list',
//         method: 'get',
//         data: params
//     })
// }


// // 获取学习列表详细信息
// export const studyInfoById= (id) => {
//     return http({
//         url: '/study/studyInfo/'+id,
//         method: 'get',
//     })
// }

// // 增加学习列表
// export const saveStudyInfo = (params) => {
//     return http({
//         url: '/study/studyInfo',
//         method: 'post',
//         data: params
//     })
// }

// // 修改学习列表
// export const updateStudyInfo = (params) => {
//     return http({
//         url: '/study/studyInfo',
//         method: 'put',
//         data: params
//     })
// }

// // 删除学习列表
// export const deleteStudyInfo = (id) => {
//     return http({
//         url: '/study/studyInfo/delete?id='+id,
//         method: 'delete',
//     })
// }