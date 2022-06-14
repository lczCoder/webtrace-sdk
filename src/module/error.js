/* 错误处理 */
import { g_config } from "@m/config";

export default {
  init() {
    // 判断是否自动开启错误上报
    if (g_config.error) {
      window.onerror = function (event) {
        console.log("error1", event);
      };
      // 监控未处理的promise.reject事件
      window.addEventListener("unhandledrejection", (event) => {
        console.log("error2", event.reason);
      });
    } else {
      return false;
    }
  },
};
