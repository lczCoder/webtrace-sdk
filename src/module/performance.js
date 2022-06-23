import { g_config } from "@m/config";

/* 网页性能 */
export default {
  init() {
    if (g_config.performance) {
      const result = compatibleDeal();
      if (!result) {
        console.warn("当前平台不支持<performance>相关的api");
      }
      // window.addEventListener("load", function () {
      //   if (sessionStorage.getItem("FIRST_LOAD")!=='1') {
      //     console.log("window加载完成");
      //     const t = window.performance.timing;
      //     console.log(`
      //     请求响应耗时:${t.responseStart - t.requestStart}
      //     DOM 解析耗时：${t.domInteractive - t.responseEnd}
      //     资源加载耗时:${t.loadEventStart - t.domContentLoadedEventEnd}
      //     首次渲染耗时:${t.responseEnd - t.fetchStart}
      //     首次可交互耗时:${t.domInteractive - t.fetchStart}
      //   `);
      //     sessionStorage.setItem("FIRST_LOAD", "1");
      //   }
      // });
    }
  },
};

/**
 * @desc 方法兼容判断
 * @return bool 是否兼容
 */
const compatibleDeal = () => {
  const per = window.PerformanceObserver || null;
  // 判断window.PerformanceObserver api是否可用
  if (per) {
    createPerformance();
    return true;
  }
  // 判断performance api是否可用
  if (window.performance) {
    firstLoad();
    return true;
  }
  return false;
};

// 创建PerformanceObserver观察者 监听资源加载
const createPerformance = () => {
  // 观察者，监听Performance变化
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((info) => {
      console.table(info);
      // 首次加载
      if (info.entryType == "navigation") {
      }
      if (info.entryType == "") {
      }
    });
  });
  // 观察的类型
  observer.observe({
    entryTypes: ["navigation", "resource"],
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
};

// 初始获取一次首屏加载数据
const firstLoad = () => {
  const t = window.performance.timing;
  console.log("首次加载", t);
  
};
