/* 入口文件 */
import WebTraceSdk from "@m/init";
import { __$checkInit, __$errorLog } from "@u/";
import "./module/device";
import pkg from "../package.json";


function init(config = {}) {
  // 校验参数类型
  if (Object.prototype.toString.call(config) === "[object Object]") {
    // 校验参数属性 appId requestUrl options
    const { appId, requestUrl, options } = config;
    const result = __$checkInit(appId, requestUrl, options); // 校验结果
    if (result) {
      const webTrace = new WebTraceSdk(config);
      window.sdk = webTrace;
    }
  } else {
    __$errorLog({
      msg: "101",
      desc: "init()方法需要传入一个配置参数,类型为object",
    });
    return false;
  }
}

export default {
  name: pkg.name,
  version: pkg.version,
  init,
};
