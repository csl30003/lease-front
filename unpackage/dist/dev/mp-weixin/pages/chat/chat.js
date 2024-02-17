"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_overlay = common_vendor.resolveComponent("van-overlay");
  _component_van_overlay();
}
const _sfc_main = {
  __name: "chat",
  setup(__props) {
    let code = "";
    common_vendor.onLoad(async () => {
      const res = await common_vendor.wx$1.login();
      code = res.code;
      console.log("code is", code);
    });
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const userInfoDisabled = common_vendor.ref(false);
    const userInfo = common_vendor.reactive({
      thirdAppType: 1,
      thirdUserId: "",
      nickName: "",
      wechatPicture: ""
    });
    common_vendor.ref("");
    const pageOption = common_vendor.ref();
    const overlayShow = common_vendor.ref(false);
    const wxGetUserInfo = () => {
      if (common_vendor.index.getUserProfile) {
        common_vendor.index.getUserProfile({
          desc: "Wexin",
          // 这个参数是必须的
          success: (result) => {
            common_vendor.index.showLoading({
              title: "授权中..."
            });
            userInfoDisabled.value = true;
            userInfo.nickName = result.userInfo.nickName;
            userInfo.wechatPicture = result.userInfo.avatarUrl;
            proxy.$api.user.login({
              thirdAppType: userInfo.thirdAppType,
              thirdUserId: userInfo.thirdUserId,
              nickName: userInfo.nickName,
              wechatPicture: userInfo.wechatPicture
            }).then((res) => {
              userInfoDisabled.value = false;
              common_vendor.index.hideLoading();
              if (res.data.bindSpecialCode == 203) {
                common_vendor.index.setStorageSync("id", res.data.id);
                common_vendor.index.setStorageSync("nickName", res.data.nickName);
                common_vendor.index.setStorageSync("wechatPicture", res.data.wechatPicture);
                overlayShow.value = true;
                return;
              } else {
                common_vendor.index.showToast({
                  title: "登录成功"
                });
                common_vendor.index.setStorageSync("id", res.data.id);
                common_vendor.index.setStorageSync("nickName", res.data.nickName);
                common_vendor.index.setStorageSync("wechatPicture", res.data.wechatPicture);
                common_vendor.index.setStorageSync("tel", res.data.tel.data);
                if (pageOption.value.backtype == 1) {
                  common_vendor.index.redirectTo({
                    url: "/pages/chat/chat"
                  });
                } else {
                  common_vendor.index.switchTab({
                    url: "/pages/chat/chat"
                  });
                }
              }
            }).catch((e) => {
              userInfoDisabled.value = false;
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "用户信息操作失败",
                icon: "none"
              });
            });
          },
          fail: (res) => {
            console.log("用户拒绝授权信息");
          }
        });
      } else {
        common_vendor.index.showToast({
          title: "获取用户信息失败",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: userInfoDisabled.value,
        b: common_vendor.o(wxGetUserInfo),
        c: common_vendor.o((...args) => _ctx.getPhoneNumber && _ctx.getPhoneNumber(...args)),
        d: common_vendor.p({
          show: overlayShow.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/lease/pages/chat/chat.vue"]]);
wx.createPage(MiniProgramPage);
