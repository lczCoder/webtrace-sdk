import _Config from "@m/config"; //配置中心
import _Error from "@m/error"; // 错误监控
import { _recordTime, _dealTime } from "@m/event"; // 事件处理
import _Cache from "@m/cache";
class WebTraceSdk {
  constructor(options = {}) {
    console.log("实例被创建" + new Date().getTime());
    this.init(options);
  }
  // 模块初始化
  init(opts) {
    _Config.init(opts); // sdk基础配置
    _Error.init(); // 错误监控初始化
    _Cache.init(); // 缓存处理初始化
  }
  // 统计自定义js事件耗时
  timeStart(key) {
    _recordTime(key);
  }
  timeEnd(key) {
    _dealTime(key);
  }
}

export default WebTraceSdk;
