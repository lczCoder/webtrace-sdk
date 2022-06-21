/* 上报事件处理 */
import { _httpSend } from "@m/http";
import { __$errorLog, __$cutDecimal } from "@u/";
import { timeMap } from "@m/cache";

export default {
  init() {},
};

// 时间初始记录
export const _recordTime = (key) => {
  if (!timeMap.has(key)) {
    timeMap.set(key, new Date().getTime());
    return false;
  }
  timeMap.set(`${key}__again__`, true);
  __$errorLog({
    msg: "103",
    desc: `timeStart('${key}')已完成初始化,在timeEnd('${key}')触发前,请勿重复调用`,
  });
};
// 时间结果处理
export const _dealTime = (key) => {
  const e_time = new Date().getTime(); // 当前时间
  // 未定义
  if (!timeMap.has(key)) {
    __$errorLog({
      msg: "100",
      desc: `不存在'${key}'事件的时间初始化方法,如需统计请先调用timeStart('${key}')方法`,
    });
    return false;
  }
  // 有重复初始化情况
  if (timeMap.has(`${key}__again__`)) {
    timeMap.delete(`${key}__again__`);
    const s_time = timeMap.get(key); // 开始时间
    const cost = __$cutDecimal((e_time - s_time) / 1000, 5);
    timeMap.delete(key);
    console.log(`'${key}'事件，一共耗时${cost}秒`);
  }
  /* 
    1、判断是否开启缓存上报
      true : 把事件存入事件缓存队列中
     false : 直接上报
  */
};
