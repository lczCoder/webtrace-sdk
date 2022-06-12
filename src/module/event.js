/* 上报事件处理 */
import {g_config} from '@m/config'
export default {
  init() {
    console.log('事件初始化');
    // 网页隐藏上报缓存中的数据
    window.document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        navigator.sendBeacon(
          "http://localhost:3001/post",
          JSON.stringify(g_config)
        );
      }
    });
    // 网页销毁,上报缓存中的数据
    window.onbeforeunload = function(e) {
      navigator.sendBeacon(
        "http://localhost:3001/post",
        JSON.stringify({ name: "关闭" })
      );
    }
  },
};
