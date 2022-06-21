/* 缓存处理 */
const sessionDB = sessionStorage.getItem("EVENT_QUEUE");
export const pageHashMap = new Map([]); // 页面路由缓存
export const eventQueue = sessionDB ? JSON.parse(sessionDB) : []; // 事件队列
export const timeMap = new Map(); // 统计事件耗时
const cacheLen = 10; // 事件队列缓存数量

export default {
  init() {
    // 网页隐藏上报缓存中的数据
    window.document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        // _httpSend("/post", { city: "北京", age: 1000 });
      }
    });
    // 网页销毁,上报缓存中的数据
    window.onbeforeunload = function (e) {
      // _httpSend("/post", {city:'上海',age:500});
    };
  },
};

/**
 * @description 加入事件队列
 */

export const _addEventQueue = (event) => {
  eventQueue.push(event);
  if (eventQueue.length > cacheLen) {
    // 事件上报
    // 清除队列
    eventQueue.length = 0;
  }
  // 同步sessionStorage缓存数据
  sessionStorage.setItem("EVENT_QUEUE", JSON.stringify(eventQueue));
};
