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
