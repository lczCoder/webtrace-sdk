import { g_config } from "@m/config";
import { _addEventQueue } from "@m/cache";
import { __$cutDecimal } from "@u/";

/**
 * @desc 性能上报数据结构模型
 * @param {*} type 数据类型 首屏加载 | 资源加载
 * @param {*} opt 监控数据
 */
const performanceModel = (type, opt) => {
  const data = {
    eventType: "performance",
    url: window.location.href,
    time: Date.now(),
    info: { type, ...opt },
  };
  _addEventQueue(data); // 加入事件队列
};

/* 网页性能上报 */
export default {
  init() {
    if (g_config.performance) {
      const result = compatibleDeal();
      if (!result) {
        console.warn("当前平台不支持<performance>相关的api");
      }
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
    firstLoadTiming();
    return true;
  }
  return false;
};

// 创建PerformanceObserver观察者 监听资源加载
const createPerformance = () => {
  // 观察者，监听Performance变化
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((info) => {
      // 首次加载
      if (
        info.entryType == "navigation" &&
        !sessionStorage.getItem("FIRST_LOAD")
      ) {
        dealFirstTiming(info);
        sessionStorage.setItem("FIRST_LOAD", 1);
      }
      if (info.entryType == "resource") {
        performanceModel("resource", {
          type: info.initiatorType, // 加载资源类型
          file: info.name, // 资源
          time_cost: __$cutDecimal(info.duration, 2), // 请求耗时
        });
      }
    });
  });
  // 观察的类型
  observer.observe({
    /**
      frame：event-loop 时的每一帧
      navigation：导航加载（首屏）
      resource：资源类型
      mark: 打点
      measure：计算打点间隔时间
      paint：绘制
      longtask 长任务 
   */
    entryTypes: ["navigation", "resource"],
  });
};

// 初始获取一次首屏加载数据, 必须在window.load后计算
const firstLoadTiming = () => {
  window.addEventListener("load", function () {
    if (!sessionStorage.getItem("FIRST_LOAD")) {
      dealFirstTiming(window.performance.timing);
      sessionStorage.setItem("FIRST_LOAD", 1);
    }
  });
};

// 处理首屏加载数据
const dealFirstTiming = (info) => {
  performanceModel("navigation", {
    frt: __$cutDecimal(info.responseEnd - info.fetchStart, 2), // 首次渲染耗时
    rrt: __$cutDecimal(info.responseStart - info.requestStart, 2), // 请求响应耗时
    dpt: __$cutDecimal(info.domInteractive - info.responseEnd, 2), // DOM 解析耗时
    rlt: __$cutDecimal(info.loadEventStart - info.domContentLoadedEventEnd, 2), // 资源加载耗时
    fit: __$cutDecimal(info.domInteractive - info.fetchStart, 2), // 首次可交互耗时
  });
};
