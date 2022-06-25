/* 错误处理 */
import { g_config } from "@m/config";
import { ErrorJsType } from "@u/declare";
import { _addEventQueue } from "@m/cache";
/**
 * @desc 错误上报数据结构模型
 * @param {*} type 错误类型
 * @param {*} opt 错误信息
 */
const errorModel = (type, opt) => {
  const data = {
    eventType: "error",
    url: window.location.href,
    time: Date.now(),
    errorInfo: {
      type,
      ...opt,
    },
  };
  _addEventQueue(data); // 加入事件队列
};

export default {
  init() {
    // TODO: 需要考虑 一个错误事件，多次上报的问题。一个按钮点击错误事件，多次上报是没有必要的？？？
    rewriteError();
    _errorAjaxInit();
    _errorFetchInit();

    // 用户交互行为上报
    // window.addEventListener('click', function(e){
    //   console.log('点击事件',e);
    // })
    // 判断是否自动开启错误上报
    if (g_config.error) {
      // 监控js运行错误
      window.onerror = function (message, filename, lineno, colno, error) {
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
      };
      // 监控资源加载错误错误
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
          }
        },
        true
      );
      // 监控未处理的promise.reject事件
      window.addEventListener("unhandledrejection", (e) => {
        console.log("e", e);
        const source = {};
        if (e.reason instanceof Error) {
          // 语法错误
          const { message, stack } = e.reason;
          Object.assign(source, {
            message,
            stack: g_config.debug ? stack : null,
          });
        } else {
          Object.assign(source, {
            reason: e.reason,
          });
        }
        errorModel("promise", source);
      });
    } else {
      return false; // 不进行自动错误上报
    }
  },
};

function rewriteError() {
  // 重写console.error, 可以捕获更全面的报错信息
}

// fetch的处理
function _errorFetchInit() {
  if (!window.fetch) return;
  let _oldFetch = window.fetch;
  window.fetch = function () {
    // console.log('arguments',arguments);
    // arguments[0] 获取请求接口地址
    return (
      _oldFetch
        .apply(this, arguments)
        .then((res) => {
          if (!res.ok) {
            // 当status不为2XX的时候，上报错误
            console.log("错误了11", res,arguments[0]);
          }
          return res;
        })
        // 当fetch方法错误时上报
        .catch((error) => {
          // error.message,
          // error.stack
          // 抛出错误而且上报
          console.log("错误了22", error);
        })
    );
  };
}

function _errorAjaxInit() {
  let ajaxUrl = "12";
  let protocol = window.location.protocol;
  if (protocol === "file:") return;
  // 处理XMLHttpRequest
  if (!window.XMLHttpRequest) {
    return;
  }
  let xmlhttp = window.XMLHttpRequest;
  let _oldSend = xmlhttp.prototype.send;
  let _oldOpen = xmlhttp.prototype.open;
  let _handleEvent = function (event,url) {
    try {
      if (event && event.currentTarget && event.currentTarget.status !== 200) {
        console.log("xhr错误", event,url);
        // 在此上报错误
      }
    } catch (e) {
      console.log("Tool's error: " + e);
    }
  };
  xmlhttp.prototype.open = function () {
    ajaxUrl = arguments[1];
    return _oldOpen.apply(this, arguments);
  };
  xmlhttp.prototype.send = function () {
    this.addEventListener("error", (e)=>_handleEvent(e,ajaxUrl)); // 失败
    return _oldSend.apply(this, arguments);
  };
}
