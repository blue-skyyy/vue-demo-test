export const cloneDeep = (obj) => {
  if (obj === null) return null;
  let newObj = obj instanceof Array ? [] : {};
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      // 过滤继承属性
      newObj[i] = typeof obj[i] === "object" ? cloneDeep(obj[i]) : obj[i];
    }
  }
  return newObj;
}
