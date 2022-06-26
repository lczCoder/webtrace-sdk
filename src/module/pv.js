import { g_config } from "@m/config";
import { _addEventQueue } from "@m/cache";
import { __$whetherToday, __$timestampUser } from "@u/";
let oldUrl = ""; // 跳转前url
const cache = localStorage.getItem("PAGE_CACHE");
const pageCache = cache ? new Set(JSON.parse(cache)) : new Set([]);

/**
 * @desc pv上报数据结构模型
 * @param {*} type pv | uv
 * @param {*} opt url数据
 */
const pvModel = (opt) => {
  let type = "uv";
  if (pageCache.has(opt.url)) {
    console.log("在列表中了");
    // 判断是否在当天范围内
    type = __$timestampUser(new Date().getTime()) ? "uv" : "pv";
  }
  pageCache.add(oldUrl);
  storageLocal("PAGE_CACHE", pageCache);
  // true uv false pv
  // 如果是uv 就看是否在页面缓存中， yes 返回 no 添加缓存

  // const curTime = new Date().getTime();
  // const whether = __$whetherToday(markTime, curTime); // 判断是否同一天
  const data = {
    eventType: "page",
    url: window.location.href,
    time: Date.now(),
    info: { type, ...opt },
  };
  _addEventQueue(data); // 加入事件队列
};

/* 页面统计 */
export default {
  init() {
    if (g_config.pv) {
      routeChange();
      history.pushState = interceptHistory("pushState");
      history.replaceState = interceptHistory("replaceState");
      // 监听浏览器前进后退操作
      window.addEventListener("popstate", () => routeChange());
      // 监听哈希路由变化
      window.addEventListener("hashchange", () => routeChange());
      // 监听history跳转（replace模式）
      window.addEventListener("replaceState", () => routeChange());
      // 监听history跳转（push模式）
      window.addEventListener("pushState", () => routeChange());
    } else {
      return false;
    }
  },
};

// 重写history 自定义监听pushState | replaceState 事件
// 暂时不做IE兼容
const interceptHistory = (type) => {
  var orig = history[type];
  return function () {
    let rv = orig.apply(this, arguments);
    let event = new Event(type);
    event.arguments = arguments;
    window.dispatchEvent(event);
    return rv;
  };
};

// 存储LocalSession
const storageLocal = (key, data) => {
  const ary = Array.from(data);
  localStorage.setItem(key, JSON.stringify(ary));
};

// 路由切换 事件处理
const routeChange = () => {
  oldUrl = window.location.href;
  pvModel({ url: window.location.href });
};
