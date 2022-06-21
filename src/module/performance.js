import { g_config } from "@m/config";

/* 网页性能 */
export default {
  init() {
    if (g_config.performance) {
      console.log("性能监控功能已启用");

      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.table(entry);
          // if (entry.entryType == "navigation") {
          // }
        });
      });
      // 观察的类型
      observer.observe({
        entryTypes: ["navigation","resource"],
        /**
          frame：event-loop 时的每一帧
          navigation：导航
          resource：资源
          mark: 打点，得到一个时间戳
          measure：在两个点之间测量
          paint：绘制
          longtask(好像只有 chrome支持)：任何在浏览器中执行超过 50 ms 的任务，都是 long task
         */
      });
      // console.log(window.performance)
    }
  },
};
