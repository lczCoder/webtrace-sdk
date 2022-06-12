/* 设备信息 */
import { __$getBrowserType, __$browserOS } from "@u/";

const {
  screen: { width, height },
} = window;

export const deviceOpts = {
  screenWidth: width, // 设备屏幕宽度
  screenHeight: height, // 设备屏幕高度
  browser: __$getBrowserType() || "other", // 浏览器名称
  stylem: __$browserOS(), // 操作系统
};
