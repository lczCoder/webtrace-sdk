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

