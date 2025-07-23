/**
 * Promise.myResolve：如果传入参数是一个 Promise 对象，则直接返回，否则返回一个 resolved 状态的 Promise 对象。
 * @param {any} value 
 * @returns {Promise}
 */
Promise.myResolve = (value) => {
  if (value instanceof Promise) {
    return value;
  }
  return new Promise((resolve) => resolve(value));
}


/**
 * Promise.myReject：返回一个 rejected 状态的 Promise 对象。
 * @param {any} reason 
 * @returns {Promise}
 */
Promise.myReject = (reason) => {
  return new Promise((_, reject) => reject(reason));
}

/**
 * Promise.myAll：返回一个 Promise 对象，该对象在所有传入的 Promise 对象都 fulfilled 时 fulfilled，否则 rejected。
 * @param {Promise[]} promises 
 * @returns {Promise}
 */
Promise.myAll = (promises) => {
  return new Promise((resolve, reject) => {
    const result = [];
    let count = 0;
    const total = promises.length;

    // 如果没有promise，则直接返回fulfilled的空数组
    if (total === 0) {
      return resolve(result);
    }

    // 遍历promises，注册回调
    promises.forEach((promise, index) => {
      // 防止传进来的不是promise，所以统一使用Promise.resolve包装
      Promise.myResolve(promise).then((value) => {
        result[index] = value;
        count += 1;
        if (count === total) {
          resolve(result);
        }
      }, reject)
    })
  })
}

/**
 * Promise.myRace：返回一个 Promise 对象，该对象在所有传入的 Promise 对象中有一个 fulfilled 或 rejected 时就改变状态。
 * @param {Promise[]} promises 
 * @returns {Promise}
 */
Promise.myRace = (promises) => {
  return new Promise((resolve, reject) => {
    const total = promises.length;
    if (total === 0) {
      return resolve();
    }
    promises.forEach((promise) => {
      Promise.myResolve(promise).then(resolve, reject);
    })
  })
}

/**
 * Promise.myAllSettled：返回一个 Promise 对象，该对象在所有传入的 Promise 对象都 settled 时 fulfilled，永远不会失败.
 * @param {Promise[]} promises 
 * @returns {Promise}
 */
Promise.myAllSettled = (promises) => {
  return new Promise((resolve) => {
    const results = [];
    let count = 0;
    const total = promises.length;
    if (total === 0) {
      return resolve(results);
    }
    promises.forEach((promise, index) => {
      Promise.myResolve(promise).then((val) => {
        results[index] = { status: 'fulfilled', value: val };
        count += 1;
        if (count === total) {
          resolve(results);
        }
      }, (reason) => {
        results[index] = { status: 'rejected', reason: reason };
        count += 1;
        if (count === total) {
          resolve(results);
        }
      })
    })
  })
}


/**
 * Promise.myAny：返回一个 Promise 对象，该对象在所有传入的 Promise 对象中有一个 fulfilled 时就 fulfilled，所有都 rejected 时返回 AggregateError.
 * @param {Promise[]} promises 
 * @returns {Promise}
 */
Promise.myAny = (promises) => {
  return new Promise((resolve, reject) => {
    const errors = [];
    let count = 0;
    const total = promises.length;
    if (total === 0) {
      return reject(new AggregateError(errors, 'All promises were rejected'));
    }

    promises.forEach((promise, index) => {
      Promise.myResolve(promise).then(resolve, (err) => {
        errors[index] = err;
        count += 1;
        if (count === total) {
          reject(new AggregateError(errors, 'All promises were rejected'));
        }
      })
    })
  })
}