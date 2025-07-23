const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  #state = PENDING;
  #result = undefined;
  #handlers = [];

  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    }

    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    }

    try {
      executor(resolve, reject);
    } catch(err) {
      reject(err);
    }
  }

  #run() {
    if (this.#state === PENDING) return;
    while (this.#handlers.length) {
      // 解构出队
      const {onFulfilled, onRejected, resolve, reject} = this.handlers.shift();
      if (this.#state === FULFILLED) {
        if (typeof onFulfilled === 'function') {
          onFulfilled(this.#result);
        }
      } else {
        if (typeof onRejected === 'function') {
          onRejected(this.#result);
        }
      }
    }
  }

  #changeState(newState, result) {
    if (this.#state !== PENDING) return;
    this.#state = newState;
    this.#result = result;
    this.#run();
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      // 注册回调
      handlers.push({onFulfilled, onRejected, resolve, reject});
      this.#run();
    })
  }
}