"use strict";
const common_vendor = require("../../common/vendor.js");
const api_comment = require("../../api/comment.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "commentDetail",
  setup(__props) {
    let commentId = 0;
    let prodId = 0;
    const comment = common_vendor.ref({});
    const comments = common_vendor.ref([]);
    const flag = common_vendor.ref(0);
    const showInput = common_vendor.ref(false);
    const commentInput = common_vendor.ref("");
    const chooseRootCommentId = common_vendor.ref(0);
    const chooseToCommentId = common_vendor.ref(0);
    const chooseName = common_vendor.ref("");
    const replyPlaceholder = common_vendor.ref("");
    common_vendor.onLoad(async (options) => {
      commentId = options.commentId;
      prodId = options.prodId;
      await getComments();
    });
    const getComments = async () => {
      const res = await api_comment.getCommentListAPI(commentId);
      comment.value = res.data[0];
      comments.value = res.data;
    };
    const showCommentInput = async (flagValue, rootCommentId, toCommentId, name) => {
      if (showInput.value) {
        showInput.value = false;
        commentInput.value = "";
        flag.value = 0;
        chooseRootCommentId.value = 0;
        chooseToCommentId.value = 0;
        chooseName.value = "";
        replyPlaceholder.value = "";
        return;
      }
      if (flagValue === 0) {
        replyPlaceholder.value = "";
      } else if (flagValue === 1) {
        replyPlaceholder.value = "发表评论";
      } else if (flagValue === 2) {
        replyPlaceholder.value = "回复 @" + name + " ";
      } else if (flagValue === 3) {
        replyPlaceholder.value = "回复 @" + name + " ";
      }
      showInput.value = true;
      commentInput.value = "";
      flag.value = flagValue;
      chooseRootCommentId.value = rootCommentId;
      chooseToCommentId.value = toCommentId;
      chooseName.value = name;
    };
    const submit = async () => {
      if (flag.value === 0) {
        common_vendor.index.showToast({
          title: "请选择评论类型",
          icon: "none",
          duration: 2e3
        });
      } else if (flag.value === 1) {
        addRootComment();
      } else if (flag.value === 2) {
        replyRootComment();
      } else if (flag.value === 3) {
        replySubComment();
      }
    };
    const replyRootComment = async () => {
      if (commentInput.value.trim() === "") {
        common_vendor.index.showToast({
          title: "评论内容不能为空",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      const res = await api_comment.addCommentAPI({
        content: commentInput.value,
        product_id: parseInt(prodId),
        root_comment_id: chooseRootCommentId.value
      });
      if (res.code === 200) {
        commentInput.value = "";
        showCommentInput(0, 0, 0, "");
        await getComments();
        common_vendor.index.showToast({
          title: "评论成功",
          icon: "success",
          duration: 2e3
        });
      } else {
        common_vendor.index.showToast({
          title: "评论失败，请稍后再试",
          icon: "none"
        });
      }
    };
    const replySubComment = async () => {
      if (commentInput.value.trim() === "") {
        common_vendor.index.showToast({
          title: "评论内容不能为空",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      const res = await api_comment.addCommentAPI({
        content: replyPlaceholder.value + commentInput.value,
        product_id: parseInt(prodId),
        root_comment_id: chooseRootCommentId.value,
        to_comment_id: chooseToCommentId.value
      });
      if (res.code === 200) {
        commentInput.value = "";
        showCommentInput(0, 0, 0, "");
        await getComments();
        common_vendor.index.showToast({
          title: "评论成功",
          icon: "success",
          duration: 2e3
        });
      } else {
        common_vendor.index.showToast({
          title: "评论失败，请稍后再试",
          icon: "none",
          duration: 2e3
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showInput.value
      }, showInput.value ? {
        b: replyPlaceholder.value,
        c: commentInput.value,
        d: common_vendor.o(($event) => commentInput.value = $event.detail.value),
        e: common_vendor.o(submit)
      } : {}, {
        f: comment.value.avatar,
        g: common_vendor.t(comment.value.name),
        h: common_vendor.t(comment.value.content),
        i: common_vendor.t(comment.value.created_at),
        j: common_vendor.o(($event) => showCommentInput(2, comment.value.id, 0, comment.value.name)),
        k: common_vendor.f(comments.value, (childComment, index, i0) => {
          return common_vendor.e({
            a: index !== 0
          }, index !== 0 ? {
            b: childComment.avatar,
            c: common_vendor.t(childComment.name),
            d: common_vendor.t(childComment.content),
            e: common_vendor.t(childComment.created_at),
            f: common_vendor.o(($event) => showCommentInput(3, comment.value.id, childComment.id, childComment.name), childComment.id)
          } : {}, {
            g: childComment.id
          });
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4542555e"], ["__file", "D:/HBuilderProjects/lease/pages/comment/commentDetail.vue"]]);
wx.createPage(MiniProgramPage);
