/* 自定义工具函数 */

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
function randomLetter(len = 1) {
  let noun = "";
  for (let i = 0; i < len; i++) {
    noun += String.fromCharCode(
      Math.floor(Math.random() * 26) + "a".charCodeAt(0)
    );
  }
  return noun;
}

// 设备标识符
export const __$uuid = () => {
  const date = new Date().getTime() + "";
  const random = Math.floor(Math.random() * 100);
  return randomLetter(3) + "_" + date.substring(8, 13) + "_" + random;
};

/* 
  @desc 校验sdk appid requestUrl
  @param {string} appid sdk appid
  @param {string} url  sdk requestUrl
  @return {check: boolean, msg: string} 是否校验通过, 错误类型
*/
export const __$checkInit = (appid, url) => {
  if (!appid || !url)
    return { check: false, msg: "appid or requestUrl is empty" };
  if (typeof appid !== "string")
    return { check: false, msg: "appid Incorrect type" };
  if (typeof url !== "string" || !/http/.test(url))
    return { check: false, msg: "requestUrl Incorrect type" };
  return { check: true };
};
