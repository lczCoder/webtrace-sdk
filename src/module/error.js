/* 错误处理 */
import { g_config } from "@m/config";
import { ErrorJsType } from "@u/declare";
import { _addEventQueue } from "@m/cache";
/**
 * @param {*} key 错误类型
 * @param {*} opt 错误信息
 */
const errorModel = (key, opt) => {
  const data = {
    eventType: "error",
    url: window.location.href,
    time: Date.now(),
    errorInfo: {
      errorType: key,
      ...opt,
    },
  };
  _addEventQueue(data); // 加入事件队列
};

export default {
  init() {
    // TODO: 需要考虑 一个错误事件，多次上报的问题。一个按钮点击错误事件，多次上报是没有必要的？？？
    rewriteError();
    // 判断是否自动开启错误上报
    if (g_config.error) {
      // 监控JavaScript错误
      window.addEventListener(
        "error",
        (event) => {
          const target = event.target || event.srcElement;
          if (
            target instanceof HTMLElement &&
            ["LINK", "SCRIPT", "IMG"].indexOf(target.nodeName) !== -1
          ) {
            errorModel(
              target.nodeName.toLowerCase(),
              Object.assign(
                {},
                {
                  target: target.outerHTML,
                }
              )
            );
          } else {
            const { message, filename, lineno, colno, error } = event;
            errorModel(
              "js",
              Object.assign(
                {},
                {
                  message,
                  filename,
                  lineno,
                  colno,
                  stack: g_config.debug ? error?.stack : null,
                }
              )
            );
          }
        },
        true
      );
      // 监控未处理的promise.reject事件
      window.addEventListener("unhandledrejection", ({ reason }) => {
        const source = {};
        if (reason instanceof Error) {
          // 语法错误
          const { message, stack } = reason;
          Object.assign(source, {
            message,
            stack: g_config.debug ? stack : null,
          });
        } else {
          Object.assign(source, {
            reason,
          });
        }
        errorModel("promise", source);
      });
    } else {
      return false; // 不启用错监控
    }
  },
};

function rewriteError() {
  // 重写console.error, 可以捕获更全面的报错信息
}
