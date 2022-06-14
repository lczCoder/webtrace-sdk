/* 自定义工具函数 */
// 吧export 提出来到顶部，可以直接查看有哪些工具函数
import { ErrorStatus } from "@u/declare";

// 获取浏览器版本
export const __$getBrowserType = () => {
  const ua = window.window.navigator.userAgent.toLowerCase();
  const typeMap = {
    ie: /msie/.test(ua) && !/opera/.test(ua), //匹配IE浏览器
    opera: /opera/.test(ua), //匹配Opera浏览器
    safari: /version.*safari/.test(ua), //匹配Safari浏览器
    chrome: /chrome/.test(ua), //匹配Chrome浏览器
    firefox: /gecko/.test(ua) && !/webkit/.test(ua), //匹配Firefox浏览器
  };
  const browserType = Object.keys(typeMap).filter((key) => {
    if (typeMap[key]) return key;
  });
  return browserType.join(",");
};

// 获取当前操作系统
export const __$browserOS = () => {
  const isWin =
    window.navigator.platform == "Win32" ||
    window.navigator.platform == "Windows";
  const isMac =
    window.navigator.platform == "Mac68K" ||
    window.navigator.platform == "MacPPC" ||
    window.navigator.platform == "Macintosh" ||
    window.navigator.platform == "MacIntel";
  const isLinux = String(window.navigator.platform).indexOf("Linux") > -1;
  const isUnix = window.navigator.platform == "X11" && !isWin && !isMac;
  if (isWin) return "window";
  if (isMac) return "Mac";
  if (isUnix) return "Unix";
  if (isLinux) return "Linux";
  return "other";
};

/* 
  @desc 随机生成字母
  @param {number} len 生成字母位数
  @return {string} 随机字母
*/
const randomLetter = (len = 1) => {
  let noun = "";
  for (let i = 0; i < len; i++) {
    noun += String.fromCharCode(
      Math.floor(Math.random() * 26) + "a".charCodeAt(0)
    );
  }
  return noun;
};

// 获取设备标识符
export const __$uuid = () => {
  const result = getLocalSessionKey("Webtrace_UUID");
  if (result && result !== "none") return result;
  const date = new Date().getTime() + "";
  const random = Math.floor(Math.random() * 100);
  const data = randomLetter(3) + "_" + date.substring(8, 13) + "_" + random;
  if (result == "none") localStorage.setItem("Webtrace_UUID", data);
  return data;
};

/* 
  @desc 校验sdk appid requestUrl
  @param {string} appid sdk appid
  @param {string} url  sdk requestUrl
  @return {check: boolean, msg: string} 是否校验通过, 错误类型
*/
export const __$checkInit = (appid, url, opts) => {
  let _status = true; // 校验状态
  if (!appid || !url) {
    _status = false;
    __$errorLog({ msg: "102", desc: "init()参数appId和requestUrl不能为空" });
    return _status
  }
  if (typeof appid !== "string") {
    _status = false;
    __$errorLog({ msg: "101", desc: "init()参数appId类型必须为string类型" });
    return _status
  }
  if (typeof url !== "string" || !/http/.test(url)) {
    _status = false;
    __$errorLog({ msg: "101", desc: "init()参数requestUrl必须是http地址" });
    return _status
  }
  if (opts && Object.prototype.toString.call(opts) !== "[object Object]") {
    _status = false;
    __$errorLog({
      msg: "101",
      desc: "init()如果配置了options参数,类型必须为object",
    });
    return _status
  }
  return _status;
};

/* 
  @desc 判断LocalSession 是否存在key 有取 无存
  @param {string} key LocalSession key
*/
const getLocalSessionKey = (key) => {
  //检测可支持性
  if (!window.localStorage) {
    return false;
  }
  return localStorage.getItem(key) || "none";
};

/* 
  @desc 控制台error提示
  @param {msg:string,desc:''} msg 错误信息
*/

export const __$errorLog = ({ msg, desc } = {}) => {
  console.error(`
     ErrorType: <${ErrorStatus[msg]}>,
     ErrorDesc: ${desc}
  `);
};
