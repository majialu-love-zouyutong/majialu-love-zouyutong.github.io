Promise.myResolve = (value) => {
  if (value instanceof Promise) {
    return value;
  }
  return new Promise((resolve) => resolve(value));
}

const thenable = { then: (resolve) => resolve(42) };
Promise.resolve(thenable).then(console.log);    // 输出 42
Promise.myResolve(thenable).then(console.log);  // 输出 42

const t1 = {
  then(resolve, reject) {
    setTimeout(() => {
      resolve({
        then(resolve, reject) {
          setTimeout(() => {
            resolve('final value');
          }, 1000);
        }
      });
    }, 1000);
  }
};

Promise.resolve(t1).then(console.log); // 约 2 秒后输出：final value
Promise.myResolve(t1).then(console.log); // 约 2 秒后输出：final value