/* 缓存处理 */

export const pageHashMap = new Map([]); // 页面路由缓存
export const eventMap = []; // 事件缓存
export const timeMap = new Map(); // 统计事件耗时


export default {
  init(){
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
  }
};
