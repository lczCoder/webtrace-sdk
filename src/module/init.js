import _Config from "@m/config"; //配置中心
import _Error from "@m/error"; // 错误监控
import _Event from "@m/event"; // 事件处理
import _Http from "@m/http"; // 网络请求
class WebTraceSdk {
  constructor(options) {
    this.init(options);
  }
  init(opts) {
    _Config.init(opts); // sdk基础配置
    _Error.init(); // 错误监控初始化
    _Event.init(); // 事件处理初始化
  }

  send(path, query = {}) {
    query.appId = this.appId;
    let queryStr = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    // let img = new Image();
    // img.src = `${this.requestUrl}${path}?${queryStr}`;
    window.navigator.sendBeacon(`${this.requestUrl}${path}`, queryStr);
  }
}

export default WebTraceSdk;
