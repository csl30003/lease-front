"use strict";
const common_vendor = require("../../common/vendor.js");
const api_chat = require("../../api/chat.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "chat",
  setup(__props) {
    const chatUserList = common_vendor.ref([]);
    const isLoaded = common_vendor.ref(false);
    common_vendor.onShow(async () => {
      await toLoadData();
    });
    const toLoadData = async () => {
      isLoaded.value = false;
      const res = await api_chat.getChatUserAPI();
      chatUserList.value = res.data;
      isLoaded.value = true;
    };
    const toChatPage = (e) => {
      common_vendor.index.navigateTo({
        url: "/pages/chat/chatDetail?toId=" + e.currentTarget.dataset.toid
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(chatUserList.value, (item, index, i0) => {
          return {
            a: item.avatar,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.content),
            d: item.to_id,
            e: common_vendor.o(toChatPage, index),
            f: index
          };
        }),
        b: !chatUserList.value.length
      }, !chatUserList.value.length ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0a633310"], ["__file", "D:/HBuilderProjects/lease/pages/chat/chat.vue"]]);
wx.createPage(MiniProgramPage);
