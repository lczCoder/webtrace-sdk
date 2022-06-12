/* 错误处理 */
import { g_config } from "@m/config";

export default {
  init() {
    if(g_config.error){
      console.log("错误初始化");
      window.addEventListener("error", (event) => {
        console.log("error1", event);
      });
      // 监控未处理的promise.reject事件
      window.addEventListener("unhandledrejection", (event) => {
        console.log(event.reason);
      });
    }else{
      console.log('不进行错误监控');
    }
  },
};
