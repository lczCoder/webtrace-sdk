/* 上报事件处理 */
export default {
  init() {
    // 关闭网页,上报缓存中的数据
    window.document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        navigator.sendBeacon(
          "http://localhost:3001/post",
          JSON.stringify({ name: "lcz" })
        );
      }
    });
  },
};
