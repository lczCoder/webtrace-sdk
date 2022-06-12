/* 错误处理 */

export default {
  init() {
    window.addEventListener("error", (event) => {
      console.log('error1',event);
    });
    // 监控未处理的promise.reject事件
    window.addEventListener("unhandledrejection", (event) => {
      console.log(event.reason);
    });


  },
};
