// 错误类型状态码
export const ErrorStatus = {
  100: "未初始化",
  101: "参数类型错误",
  102: "参数缺失",
  103: "重复调用",
};

// javascript 错误类型
export const ErrorJsType = new Map([
  ["EvalError", "Eval函数的错误"],
  ["RangeError", "范围错误"],
  ["ReferenceError", "引用错误"],
  ["SyntaxError", "语法错误"],
  ["TypeError", "类型错误"],
  ["URIError", "URI错误"],
  ["Error", "错误"],
  ["InternalError", "js引擎内部错误"],
]);

class BaseReportData {
  time = new Date().getTime()
  targetUrl = window.location.href
  constructor(source){

  }
}

/* 
    后台接收数据结构
    const data = [
      {
        appid: "", // 项目id
        uuid: "", // 设备标识
        deviceInfo:{}, // 设备信息
        eventInfo:{  // 上报内容
            eventType:'', // 上报事件类型： 性能监控、 资源加载、pv路由、js错误、自定义事件手动上报
            time:'', // 上报时间
            url:'', // 上报事件当前页面
            data:{}, // 不同类型事件，传递参数
          },
      }
    ]
*/

/* 
  eventType: error performance page custom 
    - error
      - js // js报错
      - resource // 资源加载错误
    - performance
      - resource // 资源加载错误
      - navigation // 首屏
    - pv
      - 
    - custom
*/