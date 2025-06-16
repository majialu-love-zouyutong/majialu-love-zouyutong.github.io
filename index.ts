class MyPromise {
    public static resolve(value: any) {
        // 若为Promise实例则直接返回
        if (value instanceof Promise) return value;
        return new Promise(resolve => {
            // 处理thenable对象(如第三方Promise)
            if (value && typeof value.then === 'function') {
                value.then(resolve);
            } else {
                // 普通值直接解决
                resolve(value);
            }
        })
    }

    public static reject(reason: any) {
        return new Promise((resolve, reject) => {
            reject(reason);
        })
    }

    public static all(promises: Promise<any>[]) {
        return new Promise((resolve, reject) => {
            let count = 0;
            let result = [];
            for (let i = 0; i < promises.length; i++) {
                Promise.resolve(promises[i]).then(res => {
                    count++;
                    result[i] = res;    // 按顺序存储结果
                    if (count === promises.length) {
                        resolve(result);
                    }
                }).catch(reject);   // 任一失败立即拒绝
            }
        })
    }

    public static race(promises: Promise<any>[]) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                Promise.resolve(promises[i]).then(resolve).catch(reject);
            }
        })
    }

    public static 
}


