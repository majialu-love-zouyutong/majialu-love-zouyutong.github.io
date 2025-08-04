Promise.myRace = (promises) => {
  return new Promise((resolve, reject) => {
    // 获取数组长度
    const len = promises.length;

    // 如果为空数组，则永远保持pending
    if (len === 0) return;

    // 遍历promises
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(resolve, reject);
    }
  })
}
const a = Promise.race([1, 2, 3]);
const b = Promise.race([1, 2, 3]);
console.log(a);
console.log(b);
setTimeout(() => {
  console.log(a);
}, 1000);
setTimeout(() => {
  console.log(b);
}, 1000);