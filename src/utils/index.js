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
    window.navigator.platform == "Win32" || window.navigator.platform == "Windows";
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
