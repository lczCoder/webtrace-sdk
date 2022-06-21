/* 网络请求 */

import { g_config, http_config } from "@m/config";

const compatible = navigator.sendBeacon ? true : false; // sendBeacon兼容判断

export const _httpSend = (path, opt) => {
  // 浏览器兼容sendBeacon方法
  if (compatible) {
    navigator.sendBeacon(
      `${g_config.requestUrl+path}`,
      JSON.stringify({ ...http_config, ...opt })
    );
  } else {
    let mergeObj = Object.assign(http_config, opt);
    let queryStr = Object.entries(mergeObj)
      .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
      .join("&");
    let img = new Image();
    img.src = `${g_config.requestUrl+path}?${queryStr}`;
  }
};

export default {};


// 后台接收数据结构
// const data = [
//   {
//     appid: "",
//     uuid: "",
//     deviceInfo:{}, // 设备信息
//     eventInfos:[
//       {
//         eventType:'', // 上报事件类型： 性能监控、 资源加载、pv路由、js错误、自定义事件手动上报
//         time:'', // 上报时间
//         url:'', // 上报事件当前页面
//         data:{}, // 不同类型事件，传递参数
//       },
//     ]
//   }
// ]