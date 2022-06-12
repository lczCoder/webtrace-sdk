/* 上报事件处理 */
import { _httpSend } from "@m/http";

export default {
  init() {
    // 网页隐藏上报缓存中的数据
    window.document.addEventListener("visibilitychange", () => {
      console.log('document.visibilityState',document.visibilityState);
      if (document.visibilityState === "hidden") {
        _httpSend("/post", {city:'北京',age:1000});
      }
    });
    // 网页销毁,上报缓存中的数据
    window.onbeforeunload = function (e) {
      _httpSend("/post", {city:'上海',age:500});
    };
  },
};
