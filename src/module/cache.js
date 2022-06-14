/* 缓存处理 */

export const pageHashMap = new Map([]); // 页面路由缓存
export const eventMap = []; // 事件缓存
export const timeMap = new Map(); // 统计事件耗时
import { __$errorLog } from "@u/";

export default {
  // 时间初始记录
  _recordTime(key) {
    if (!timeMap.has(key)) {
      timeMap.set(key, new Date().getTime());
      return false;
    }
    timeMap.set(`${key}__again__`, true);
    __$errorLog({
      msg: "103",
      desc: `timeStart('${key}')已完成初始化,在timeEnd('${key}')触发前,请勿重复调用`,
    });
  },
  // 时间结果处理
  _dealTime(key) {
    if (timeMap.has(`${key}__again__`)) {
      timeMap.delete(`${key}__again__`);
      return false;
    }
    if (!timeMap.has(key)) {
      __$errorLog({
        msg: "100",
        desc: `不存在'${key}'事件的时间初始化方法,如需统计请先调用timeStart('${key}')方法`,
      });
      return false;
    }
    const s_time = timeMap.get(key); // 开始时间
    const e_time = new Date().getTime(); // 当前时间
    const cost = ((e_time - s_time) / 1000).toFixed(5);
    timeMap.delete(key);
    console.log(`'${key}'事件，一共耗时${cost}秒`);
    /* 
      1、判断是否开启缓存上报
        true : 把事件存入事件缓存队列中
       false : 直接上报
    */
  },
};
