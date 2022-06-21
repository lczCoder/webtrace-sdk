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
    errorInfo: { errorType: key, ...opt },
  };
  console.log("data", data);
  // emit(data);
  _addEventQueue(data);
};

export default {
  init() {
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
            console.log("资源加载错误", "资源类型", event);
            errorModel(
              target.nodeName.toLowerCase(),
              Object.assign({}, { target: target.outerHTML })
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
      window.addEventListener("unhandledrejection", (event) => {
        console.log("promise", event);
      });
    } else {
      return false;
    }
  },
};

function rewriteError() {
  // 重写console.error, 可以捕获更全面的报错信息
}
