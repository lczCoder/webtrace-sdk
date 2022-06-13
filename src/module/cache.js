/* 缓存处理 */

export const pageHashMap = new Map([]); // 页面路由缓存

export const eventMap = []; // 事件缓存

export const timeMap = new Map(); // 统计事件耗时

export default {
  // 时间初始记录
  _recordTime(key) {
    console.log(timeMap.has(key), "ok");
    if (!timeMap.has(key)) {
      timeMap.set(key, new Date().getTime());
      return false;
    }
    console.error(`timeStart('${key}')事件时间统计已完成初始化,请勿重复调用`);
  },
  // 时间结果处理
  _dealTime(key) {
    console.log(timeMap);
    if (!timeMap.has(key)) {
      console.error(
        `不存在'${key}'事件的时间初始化方法,如需统计请先调用timeStart('${key}')方法`
      );
      return false;
    }
    const s_time = timeMap.get(key); // 开始时间
    const e_time = new Date().getTime(); // 当前时间
    const cost = ((e_time - s_time) / 1000).toFixed(5);
    console.log(`'${key}'事件，一共耗时${cost}秒`);
    /* 
      1、判断是否开启缓存上报
        true : 把事件存入事件缓存队列中
       false : 直接上报
    */ 
    
  },
};
