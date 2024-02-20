"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const api_chat = require("../../api/chat.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "chatDetail",
  setup(__props) {
    const scrollTop = common_vendor.ref(0);
    const chatMsg = common_vendor.ref("");
    const toId = common_vendor.ref("");
    const toName = common_vendor.ref("");
    const toAvatar = common_vendor.ref("");
    const fromId = common_vendor.ref("");
    const fromName = common_vendor.ref("");
    const fromAvatar = common_vendor.ref("");
    const msgList = common_vendor.ref([]);
    common_vendor.onLoad(async (options) => {
      toId.value = options.toId;
      await getMyInfo();
      await getUserInfo();
      await getMessages();
      if (msgList.value.length === 0) {
        let obj = {
          from_id: parseInt(toId.value),
          to_id: parseInt(fromId.value),
          content: "您好，有什么需要帮助的吗？"
        };
        await api_chat.addMessageAPI(obj);
        msgList.value.push(obj);
      }
    });
    const getMyInfo = async () => {
      const res = await api_user.getUserInfoAPI();
      fromId.value = res.data.id;
      fromName.value = res.data.name;
      fromAvatar.value = res.data.avatar;
    };
    const getUserInfo = async () => {
      const res = await api_user.getOtherUserInfoAPI(toId.value);
      toName.value = res.data.name;
      toAvatar.value = res.data.avatar;
    };
    const getMessages = async () => {
      const res = await api_chat.getChatListAPI(toId.value);
      msgList.value = res.data;
    };
    const windowHeight = common_vendor.computed(() => {
      return rpxToPx(common_vendor.index.getSystemInfoSync().windowHeight);
    });
    function rpxToPx(px) {
      let deviceWidth = common_vendor.wx$1.getSystemInfoSync().windowWidth;
      let rpx = 750 / deviceWidth * Number(px);
      return Math.floor(rpx);
    }
    const onMessageInput = (e) => {
      chatMsg.value = e.detail.value;
    };
    const handleSend = async () => {
      if (chatMsg.value && !/^\s+$/.test(chatMsg.value)) {
        let obj = {
          from_id: parseInt(fromId.value),
          to_id: parseInt(toId.value),
          content: chatMsg.value
        };
        await api_chat.addMessageAPI(obj);
        msgList.value.push(obj);
        chatMsg.value = "";
      } else {
        showToast("不能发送空白消息");
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(msgList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.to_id === parseInt(toId.value)
          }, item.to_id === parseInt(toId.value) ? {
            b: common_vendor.t(item.content),
            c: fromAvatar.value
          } : {
            d: toAvatar.value,
            e: common_vendor.t(item.content)
          }, {
            f: index
          });
        }),
        b: `${common_vendor.unref(windowHeight)}rpx`,
        c: scrollTop.value,
        d: chatMsg.value,
        e: common_vendor.o(onMessageInput),
        f: common_vendor.o(handleSend)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4382e910"], ["__file", "D:/HBuilderProjects/lease/pages/chat/chatDetail.vue"]]);
wx.createPage(MiniProgramPage);
