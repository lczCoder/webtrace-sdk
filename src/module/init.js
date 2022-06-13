import _Config from "@m/config"; //配置中心
import _Error from "@m/error"; // 错误监控
import _Event from "@m/event"; // 事件处理
import _Cache from "@m/cache";
class WebTraceSdk {
  constructor(options) {
    this.init(options);
  }
  init(opts) {
    _Config.init(opts); // sdk基础配置
    _Error.init(); // 错误监控初始化
    _Event.init(); // 事件处理初始化
  }

  // 统计自定义js事件耗时
  timeStart(key) {
    _Cache._recordTime(key)
  }
  timeEnd(key) {
    _Cache._dealTime(key)
  }

  // send(path, query = {}) {
  //   query.appId = this.appId;
  //   let queryStr = Object.entries(query)
  //     .map(([key, value]) => `${key}=${value}`)
  //     .join("&");
  //   // let img = new Image();
  //   // img.src = `${this.requestUrl}${path}?${queryStr}`;
  //   window.navigator.sendBeacon(`${this.requestUrl}${path}`, queryStr);
  // }
}

export default WebTraceSdk;
