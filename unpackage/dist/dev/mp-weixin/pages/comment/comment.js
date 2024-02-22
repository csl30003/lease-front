"use strict";
const common_vendor = require("../../common/vendor.js");
const api_comment = require("../../api/comment.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "comment",
  setup(__props) {
    let prodId = 0;
    const comments = common_vendor.ref([]);
    const flag = common_vendor.ref(0);
    const showInput = common_vendor.ref(false);
    const commentInput = common_vendor.ref("");
    const chooseRootCommentId = common_vendor.ref(0);
    const chooseToCommentId = common_vendor.ref(0);
    const chooseName = common_vendor.ref("");
    const replyPlaceholder = common_vendor.ref("");
    common_vendor.onLoad(async (options) => {
      prodId = options.prodid;
      await getComments();
    });
    const getComments = async () => {
      const res = await api_comment.getRootCommentAPI(prodId);
      comments.value = res.data;
      if (!comments.value) {
        comments.value = [];
      }
      comments.value.forEach((comment) => {
        if (!comment.three_to_comments) {
          comment.three_to_comments = [];
        }
      });
    };
    const goToCommentDetails = (commentId) => {
      common_vendor.index.navigateTo({
        url: "/pages/comment/commentDetail?commentId=" + commentId + "&prodId=" + prodId
      });
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
    const addRootComment = async () => {
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
        product_id: parseInt(prodId)
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
        a: common_vendor.o(($event) => showCommentInput(1, 0, 0, "")),
        b: showInput.value
      }, showInput.value ? {
        c: replyPlaceholder.value,
        d: commentInput.value,
        e: common_vendor.o(($event) => commentInput.value = $event.detail.value),
        f: common_vendor.o(submit)
      } : {}, {
        g: common_vendor.f(comments.value, (comment, k0, i0) => {
          return common_vendor.e({
            a: comment.avatar,
            b: common_vendor.t(comment.name),
            c: common_vendor.t(comment.content),
            d: common_vendor.t(comment.created_at),
            e: common_vendor.o(($event) => showCommentInput(2, comment.id, 0, comment.name), comment.id),
            f: comment.three_to_comments.length > 0
          }, comment.three_to_comments.length > 0 ? common_vendor.e({
            g: common_vendor.f(comment.three_to_comments, (childComment, index, i1) => {
              return {
                a: childComment.avatar,
                b: common_vendor.t(childComment.name),
                c: common_vendor.t(childComment.content),
                d: common_vendor.t(childComment.created_at),
                e: common_vendor.o(($event) => showCommentInput(3, comment.id, childComment.id, childComment.name), childComment.id),
                f: childComment.id
              };
            }),
            h: comment.child_comment_count > 3
          }, comment.child_comment_count > 3 ? {
            i: common_vendor.o(($event) => goToCommentDetails(comment.id), comment.id)
          } : {}) : {}, {
            j: comment.id
          });
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07c9d405"], ["__file", "D:/HBuilderProjects/lease/pages/comment/comment.vue"]]);
wx.createPage(MiniProgramPage);
