// 配置信息
import { deviceOpts } from "@m/device";
import { __$uuid, __$checkInit } from "@u/";
import { version } from "../../package.json";

// sdk功能启用配置
export const g_config = {
  requestUrl: "", // 后端接口
  deviceInfo: deviceOpts, // 设备信息
  pv: true, // 是否开启pv上报
  performance: true, // 是否开启性能上报
  error: true, // 是否开启错误上报
  debug: true, // 是否开启debug模式
  cache: true, // 是否采用缓存上报策略
  cacheMax:100 // 默认最大缓存上报数量
};

// 网络请求接口默认传参
export const http_config = {
  appid: "",
  deviceInfo: deviceOpts, // 设备信息
  uuid: __$uuid(), // 设备标识符  3位随机字母_当前时间戳后5位_0-3位随机数字
  version, // sdk版本号
};

export default {
  init(config) {
    const { options = {}, appId, requestUrl } = config;
      g_config.requestUrl = requestUrl;
      http_config.appid = appId;
      Object.assign(g_config, options);
  },
};
