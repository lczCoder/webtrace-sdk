
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.WebTraceSdk = factory());
})(this, (function () { 'use strict';

  // 错误类型状态码
  const ErrorStatus = {
    100: "未初始化",
    101: "参数类型错误",
    102: "参数缺失",
    103: "重复调用"
  }; // javascript 错误类型

  /* 自定义工具函数 */
  /*-----------utils内部函数列表-------------------------------------------*/

  /* 
    1、randomLetter  // 随机生成字母
    2、getLocalSessionKey  // 判断LocalSession 是否存在key 有取 无存
  */

  const __$getBrowserType = () => {
    const ua = window.window.navigator.userAgent.toLowerCase();
    const typeMap = {
      ie: /msie/.test(ua) && !/opera/.test(ua),
      //匹配IE浏览器
      opera: /opera/.test(ua),
      //匹配Opera浏览器
      safari: /version.*safari/.test(ua),
      //匹配Safari浏览器
      chrome: /chrome/.test(ua),
      //匹配Chrome浏览器
      firefox: /gecko/.test(ua) && !/webkit/.test(ua) //匹配Firefox浏览器

    };
    const browserType = Object.keys(typeMap).filter(key => {
      if (typeMap[key]) return key;
    });
    return browserType.join(",");
  };

  const __$browserOS = () => {
    const isWin = window.navigator.platform == "Win32" || window.navigator.platform == "Windows";
    const isMac = window.navigator.platform == "Mac68K" || window.navigator.platform == "MacPPC" || window.navigator.platform == "Macintosh" || window.navigator.platform == "MacIntel";
    const isLinux = String(window.navigator.platform).indexOf("Linux") > -1;
    const isUnix = window.navigator.platform == "X11" && !isWin && !isMac;
    if (isWin) return "window";
    if (isMac) return "Mac";
    if (isUnix) return "Unix";
    if (isLinux) return "Linux";
    return "other";
  };
  /* 
    @param {number} len 生成字母位数
    @return {string} 随机字母
  */


  const randomLetter = (len = 1) => {
    let noun = "";

    for (let i = 0; i < len; i++) {
      noun += String.fromCharCode(Math.floor(Math.random() * 26) + "a".charCodeAt(0));
    }

    return noun;
  }; // 获取设备标识符


  const __$uuid = () => {
    const result = getLocalSessionKey("Webtrace_UUID");
    if (result && result !== "none") return result;
    const date = new Date().getTime() + "";
    const random = Math.floor(Math.random() * 100);
    const data = randomLetter(3) + "_" + date.substring(8, 13) + "_" + random;
    if (result == "none") localStorage.setItem("Webtrace_UUID", data);
    return data;
  };
  /* 
    @param {string} appid sdk appid
    @param {string} url  sdk requestUrl
    @return {check: boolean, msg: string} 是否校验通过, 错误类型
  */


  const __$checkInit = (appid, url, opts) => {
    let _status = true; // 校验状态

    if (!appid || !url) {
      _status = false;

      __$errorLog({
        msg: "102",
        desc: "init()参数appId和requestUrl不能为空"
      });

      return _status;
    }

    if (typeof appid !== "string") {
      _status = false;

      __$errorLog({
        msg: "101",
        desc: "init()参数appId类型必须为string类型"
      });

      return _status;
    }

    if (typeof url !== "string" || !/http/.test(url)) {
      _status = false;

      __$errorLog({
        msg: "101",
        desc: "init()参数requestUrl必须是http地址"
      });

      return _status;
    }

    if (opts && Object.prototype.toString.call(opts) !== "[object Object]") {
      _status = false;

      __$errorLog({
        msg: "101",
        desc: "init()如果配置了options参数,类型必须为object"
      });

      return _status;
    }

    return _status;
  };
  /* 
    @param {string} key LocalSession key
  */


  const getLocalSessionKey = key => {
    //检测可支持性
    if (!window.localStorage) {
      return false;
    }

    return localStorage.getItem(key) || "none";
  };
  /* 
    @param {msg:string,desc:''} msg 错误信息
  */


  const __$errorLog = ({
    msg,
    desc
  } = {}) => {
    console.error(`
     ErrorType: <${ErrorStatus[msg]}>,
     ErrorDesc: ${desc}
  `);
  };
  /* 
    @param {number} num 数值
    @param {number} len 截取小数位数
    @return 处理完成的小数
  */


  const __$cutDecimal = (num, len) => {
    num = num.toString();
    let index = num.indexOf(".");

    if (index !== -1) {
      num = num.substring(0, len + index + 1);
    } else {
      num = num.substring(0);
    }

    return parseFloat(num).toFixed(len);
  };

  /* 设备信息 */
  const {
    screen: {
      width,
      height
    }
  } = window;
  const deviceOpts = {
    screenWidth: width,
    // 设备屏幕宽度
    screenHeight: height,
    // 设备屏幕高度
    browser: __$getBrowserType() || "other",
    // 浏览器名称
    os: __$browserOS() // 操作系统

  };

  var name = "webtrace-sdk";
  var version = "1.0.3";
  var description = "浏览器环境监控SDK";
  var main$1 = "lib/bundel.cjs.js";
  var module = "lib/bundel.esm.js";
  var browser = "lib/bundel.umd.js";
  var dependencies = {
  	"@rollup/plugin-json": "^4.1.0",
  	rollup: "^2.75.6"
  };
  var devDependencies = {
  	"@babel/core": "^7.18.2",
  	"@babel/preset-env": "^7.18.2",
  	"@rollup/plugin-alias": "^3.1.9",
  	"@rollup/plugin-commonjs": "^22.0.0",
  	"@rollup/plugin-node-resolve": "^13.3.0",
  	"rollup-plugin-babel": "^4.4.0",
  	"rollup-plugin-livereload": "^2.0.5",
  	"rollup-plugin-serve": "^1.1.0",
  	"rollup-plugin-terser": "^7.0.2"
  };
  var scripts = {
  	build: "rollup --config rollup.config.build.js",
  	dev: "rollup --config rollup.config.dev.js -w"
  };
  var keywords = [
  ];
  var author = "linchengzhe";
  var license = "ISC";
  var pkg = {
  	name: name,
  	version: version,
  	description: description,
  	main: main$1,
  	"jsnext:main": "lib/bundel.esm.js",
  	module: module,
  	browser: browser,
  	dependencies: dependencies,
  	devDependencies: devDependencies,
  	scripts: scripts,
  	keywords: keywords,
  	author: author,
  	license: license
  };

  // 配置信息

  const g_config = {
    requestUrl: "",
    // 后端接口
    deviceInfo: deviceOpts,
    // 设备信息
    pv: false,
    // 是否开启pv上报
    performance: true,
    // 是否开启性能上报
    error: true,
    // 是否开启错误上报
    debug: false,
    // 是否开启debug模式
    cache: true,
    // 是否采用缓存上报策略
    cacheMax: 100 // 默认最大缓存上报数量

  }; // 网络请求接口默认传参

  ({
    appid: "",
    deviceInfo: deviceOpts,
    // 设备信息
    uuid: __$uuid(),
    // 设备标识符  3位随机字母_当前时间戳后5位_0-3位随机数字
    version // sdk版本号

  });
  var _Config = {
    init(config) {
      const {
        options = {},
        appId,
        requestUrl
      } = config;
      g_config.requestUrl = requestUrl;
      Object.assign(g_config, options);
    }

  };

  /* 缓存处理 */

  const sessionDB = sessionStorage.getItem("EVENT_QUEUE");

  const eventQueue = sessionDB ? JSON.parse(sessionDB) : []; // 上报事件队列

  const timeMap = new Map(); // 统计事件耗时

  var _Cache = {
    init() {
      // 网页隐藏上报缓存中的数据
      window.document.addEventListener("visibilitychange", () => {
      }); // 网页销毁,上报缓存中的数据

      window.onbeforeunload = function (e) {};
    }

  };
  /**
   * @description 加入事件队列
   */

  const _addEventQueue = event => {
    eventQueue.push(event);

    if (eventQueue.length > g_config.cacheMax) {
      // 事件上报
      // 清除队列
      eventQueue.length = 0;
    } // 同步sessionStorage缓存数据


    sessionStorage.setItem("EVENT_QUEUE", JSON.stringify(eventQueue));
  };

  /* 错误处理 */
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
        ...opt
      }
    };

    _addEventQueue(data); // 加入事件队列

  };

  var _Error = {
    init() {

      _errorAjaxInit();

      _errorFetchInit(); // 用户交互行为上报
      // window.addEventListener('click', function(e){
      //   console.log('点击事件',e);
      // })
      // 判断是否自动开启错误上报


      if (g_config.error) {
        // 监控js运行错误
        window.onerror = function (message, filename, lineno, colno, error) {
          errorModel("js", Object.assign({}, {
            message,
            filename,
            lineno,
            colno,
            stack: g_config.debug ? error?.stack : null
          }));
        }; // 监控资源加载错误错误


        window.addEventListener("error", event => {
          const target = event.target || event.srcElement;

          if (target instanceof HTMLElement && ["LINK", "SCRIPT", "IMG"].indexOf(target.nodeName) !== -1) {
            errorModel(target.nodeName.toLowerCase(), Object.assign({}, {
              target: target.outerHTML
            }));
          }
        }, true); // 监控未处理的promise.reject事件

        window.addEventListener("unhandledrejection", e => {
          console.log("e", e);
          const source = {};

          if (e.reason instanceof Error) {
            // 语法错误
            const {
              message,
              stack
            } = e.reason;
            Object.assign(source, {
              message,
              stack: g_config.debug ? stack : null
            });
          } else {
            Object.assign(source, {
              reason: e.reason
            });
          }

          errorModel("promise", source);
        });
      } else {
        return false; // 不进行自动错误上报
      }
    }

  };


  function _errorFetchInit() {
    if (!window.fetch) return;
    let _oldFetch = window.fetch;

    window.fetch = function () {
      // console.log('arguments',arguments);
      // arguments[0] 获取请求接口地址
      return _oldFetch.apply(this, arguments).then(res => {
        if (!res.ok) {
          // 当status不为2XX的时候，上报错误
          console.log("错误了11", res, arguments[0]);
        }

        return res;
      }) // 当fetch方法错误时上报
      .catch(error => {
        // error.message,
        // error.stack
        // 抛出错误而且上报
        console.log("错误了22", error);
      });
    };
  }

  function _errorAjaxInit() {
    let ajaxUrl = "12";
    let protocol = window.location.protocol;
    if (protocol === "file:") return; // 处理XMLHttpRequest

    if (!window.XMLHttpRequest) {
      return;
    }

    let xmlhttp = window.XMLHttpRequest;
    let _oldSend = xmlhttp.prototype.send;
    let _oldOpen = xmlhttp.prototype.open;

    let _handleEvent = function (event, url) {
      try {
        if (event && event.currentTarget && event.currentTarget.status !== 200) {
          console.log("xhr错误", event, url); // 在此上报错误
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
      this.addEventListener("error", e => _handleEvent(e, ajaxUrl)); // 失败

      return _oldSend.apply(this, arguments);
    };
  }

  /* 页面统计 */

  var _Pv = {
    init() {
      if (g_config.pv) ; else {
        return false;
      }
    }

  };

  /**
   * @desc 性能上报数据结构模型
   * @param {*} type 数据类型 首屏加载 | 资源加载
   * @param {*} opt 监控数据
   */

  const performanceModel = (type, opt) => {
    const data = {
      eventType: "performance",
      url: window.location.href,
      time: Date.now(),
      info: {
        type,
        ...opt
      }
    };

    _addEventQueue(data); // 加入事件队列

  };
  /* 网页性能上报 */


  var _Performance = {
    init() {
      if (g_config.performance) {
        const result = compatibleDeal();

        if (!result) {
          console.warn("当前平台不支持<performance>相关的api");
        }
      }
    }

  };
  /**
   * @desc 方法兼容判断
   * @return bool 是否兼容
   */

  const compatibleDeal = () => {
    const per = window.PerformanceObserver || null; // 判断window.PerformanceObserver api是否可用

    if (per) {
      createPerformance();
      return true;
    } // 判断performance api是否可用


    if (window.performance) {
      firstLoadTiming();
      return true;
    }

    return false;
  }; // 创建PerformanceObserver观察者 监听资源加载


  const createPerformance = () => {
    // 观察者，监听Performance变化
    const observer = new PerformanceObserver(list => {
      list.getEntries().forEach(info => {
        // 首次加载
        if (info.entryType == "navigation" && !sessionStorage.getItem("FIRST_LOAD")) {
          dealFirstTiming(info);
          sessionStorage.setItem("FIRST_LOAD", 1);
        }

        if (info.entryType == "resource") {
          const status = info.responseEnd && info.requestStart ? true : false; // 接口是否请求成功

          const type = status ? info.initiatorType : "url_err";
          performanceModel("resource", {
            type,
            // 加载资源类型
            file: info.name,
            // 资源
            time_cost: status ? __$cutDecimal(info.responseEnd - info.requestStart, 2) : 0 // 请求耗时

          });
        }
      });
    }); // 观察的类型

    observer.observe({
      /**
        frame：event-loop 时的每一帧
        navigation：导航加载（首屏）
        resource：资源类型
        mark: 打点
        measure：计算打点间隔时间
        paint：绘制
        longtask 长任务 
      */
      entryTypes: ["navigation", "resource"]
    });
  }; // 初始获取一次首屏加载数据, 必须在window.load后计算


  const firstLoadTiming = () => {
    window.addEventListener("load", function () {
      if (!sessionStorage.getItem("FIRST_LOAD")) {
        dealFirstTiming(window.performance.timing);
        sessionStorage.setItem("FIRST_LOAD", 1);
      }
    });
  }; // 处理首屏加载数据


  const dealFirstTiming = info => {
    performanceModel("navigation", {
      frt: __$cutDecimal(info.responseEnd - info.fetchStart, 2),
      // 首次渲染耗时
      rrt: __$cutDecimal(info.responseStart - info.requestStart, 2),
      // 请求响应耗时
      dpt: __$cutDecimal(info.domInteractive - info.responseEnd, 2),
      // DOM 解析耗时
      rlt: __$cutDecimal(info.loadEventStart - info.domContentLoadedEventEnd, 2),
      // 资源加载耗时
      fit: __$cutDecimal(info.domInteractive - info.fetchStart, 2) // 首次可交互耗时

    });
  };

  /* 上报事件处理 */

  const _recordTime = key => {
    if (!timeMap.has(key)) {
      timeMap.set(key, new Date().getTime());
      return false;
    }

    timeMap.set(`${key}__again__`, true);

    __$errorLog({
      msg: "103",
      desc: `timeStart('${key}')已完成初始化,在timeEnd('${key}')触发前,请勿重复调用`
    });
  }; // 时间结果处理

  const _dealTime = key => {
    const e_time = new Date().getTime(); // 当前时间
    // 未定义

    if (!timeMap.has(key)) {
      __$errorLog({
        msg: "100",
        desc: `不存在'${key}'事件的时间初始化方法,如需统计请先调用timeStart('${key}')方法`
      });

      return false;
    } // 有重复初始化情况


    if (timeMap.has(`${key}__again__`)) {
      timeMap.delete(`${key}__again__`);
      const s_time = timeMap.get(key); // 开始时间

      const cost = __$cutDecimal((e_time - s_time) / 1000, 5);

      timeMap.delete(key);
      console.log(`'${key}'事件，一共耗时${cost}秒`);
    }
    /* 
      1、判断是否开启缓存上报
        true : 把事件存入事件缓存队列中
       false : 直接上报
    */

  };

  class WebTraceSdk {
    constructor(options = {}) {
      console.log("实例被创建" + new Date().getTime());
      this.init(options);
    } // 模块初始化


    init(opts) {
      _Config.init(opts); // sdk基础配置


      _Error.init(); // 错误监控初始化


      _Performance.init(); // 性能监控


      _Pv.init(); // 页面统计初始化


      _Cache.init(); // 缓存处理初始化

    } // 统计自定义js事件耗时


    timeStart(key) {
      _recordTime(key);
    }

    timeEnd(key) {
      _dealTime(key);
    }

  }

  /* 入口文件 */

  function init(config = {}) {
    // 校验参数类型
    if (Object.prototype.toString.call(config) === "[object Object]") {
      // 校验参数属性 appId requestUrl options
      const {
        appId,
        requestUrl,
        options
      } = config;

      const result = __$checkInit(appId, requestUrl, options); // 校验结果


      if (result) {
        const webTrace = new WebTraceSdk(config);
        window.sdk = webTrace;
      }
    } else {
      __$errorLog({
        msg: "101",
        desc: "init()方法需要传入一个配置参数,类型为object"
      });

      return false;
    }
  }

  var main = {
    name: pkg.name,
    version: pkg.version,
    init
  };

  return main;

}));
