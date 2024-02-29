"use strict";
const common_vendor = require("../common/vendor.js");
const base_url = "http://localhost:8080";
const http = (params) => {
  let url = params.url;
  let method = params.method || "get";
  let data = params.data || {};
  let header = {};
  if (method == "post") {
    header = {
      "Content-Type": "application/json"
    };
  }
  if (common_vendor.index.getStorageSync("token")) {
    header["Cookie"] = "token=" + common_vendor.index.getStorageSync("token");
  }
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: base_url + url,
      method,
      header,
      data,
      success(response) {
        const res = response;
        if (res.data.code == 200) {
          resolve(res.data);
        } else {
          switch (res.data.code) {
            case 401:
              common_vendor.index.clearStorageSync();
              common_vendor.index.showModal({
                title: "提示",
                content: "请登录",
                showCancel: true,
                success(res2) {
                  if (res2.confirm) {
                    setTimeout(() => {
                      common_vendor.index.navigateTo({
                        url: "/pages/login/login"
                      });
                    }, 1e3);
                  }
                }
              });
              break;
            case 404:
              common_vendor.index.showToast({
                title: "请求地址不存在...",
                icon: "none",
                duration: 1e3
              });
              break;
            default:
              common_vendor.index.showModal({
                title: res.data.message,
                showCancel: false
              });
              break;
          }
        }
      },
      fail(err) {
        console.log(err);
        if (err.errMsg.indexOf("request:fail") !== -1) {
          common_vendor.wx$1.showToast({
            title: "网络异常",
            icon: "error",
            duration: 2e3
          });
        } else {
          common_vendor.wx$1.showToast({
            title: "未知异常",
            duration: 2e3
          });
        }
        reject(err);
      },
      complete() {
      }
    });
  }).catch((e) => {
  });
};
exports.http = http;
