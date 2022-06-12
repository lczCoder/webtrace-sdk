import _Error from '@m/error'; // 错误监控
import _Event from '@m/event'; // 事件处理
class WebTraceSdk {
  appId; // appid 项目标识
  requestUrl; // 后端接口地址
  constructor(options) {
    this.appId = options.appId;
    this.requestUrl = options.requestUrl;
    this.init()
  }
  init(){
    console.log(window);
    _Error.init() // 错误监控初始化
    _Event.init() // 事件处理初始化
  }

  send(path, query = {}) {
    query.appId = this.appId;
    let queryStr = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    // let img = new Image();
    // img.src = `${this.requestUrl}${path}?${queryStr}`;
    window.navigator.sendBeacon(`${this.requestUrl}${path}`,queryStr)
  }
}

export default WebTraceSdk;
