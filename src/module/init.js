import _Config from "@m/config"; //配置中心
import _Error from "@m/error"; // 错误监控
import _Pv from "@m/pv"; // 页面统计
import _Cache from "@m/cache";
import _Performance from '@m/performance'; // 性能监控
import { _recordTime, _dealTime } from "@m/event"; // 事件处理
class WebTraceSdk {
  constructor(options = {}) {
    console.log("实例被创建" + new Date().getTime());
    this.init(options);
  }
  // 模块初始化
  init(opts) {
    _Config.init(opts); // sdk基础配置
    _Error.init(); // 错误监控初始化
    _Performance.init() // 性能监控
    _Pv.init(); // 页面统计初始化
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
