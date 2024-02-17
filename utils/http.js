// 全局请求封装
const base_url = 'http://localhost:8080'
// 需要修改token，和根据实际修改请求头
export default (params) => {
    let url = params.url;
    let method = params.method || "get";
    let data = params.data || {};
    let header = {}
    if (method == "post") {
        header = {
            'Content-Type': 'application/json'
        };
    }
    // 获取本地token
    if (uni.getStorageSync("token")) {
        header['Cookie'] = 'token=' + uni.getStorageSync("token");
    }

    return new Promise((resolve, reject) => {
        uni.request({
            url: base_url + url,
            method: method,
            header: header,
            data: data,
            success(response) {
                const res = response
                // 根据返回的状态码做出对应的操作
                if (res.data.code == 200) {
                    resolve(res.data);
                } else {
                    uni.clearStorageSync()
                    switch (res.data.code) {
                        case 401:
                            uni.showModal({
                                title: "提示",
                                content: "请登录",
                                showCancel: false,
                                success(res) {
                                    setTimeout(() => {
                                        uni.navigateTo({
                                            url: "/pages/login/login",
                                        })
                                    }, 1000);
                                },
                            });
                            break;
                        case 404:
                            uni.showToast({
                                title: '请求地址不存在...',
                                duration: 2000,
                            })
                            break;
                        default:
                            uni.showToast({
                                title: '请重试...',
                                duration: 2000,
                            })
                            break;
                    }
                }
            },
            fail(err) {
                console.log(err)
                if (err.errMsg.indexOf('request:fail') !== -1) {
                    wx.showToast({
                        title: '网络异常',
                        icon: "error",
                        duration: 2000
                    })
                } else {
                    wx.showToast({
                        title: '未知异常',
                        duration: 2000
                    })
                }
                reject(err);

            },
            complete() {
                // 不管成功还是失败都会执行
                uni.hideLoading();
                uni.hideToast();
            }
        });
    }).catch((e) => { });
};