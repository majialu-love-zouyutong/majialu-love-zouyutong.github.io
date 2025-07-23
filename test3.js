async function async1() {
  console.log(1);
  await async2();
  console.log('AAA');
}

async function async2() {
  return Promise.resolve(2);
}

async1();

Promise.resolve()
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);
  })
  .then(() => {
    console.log(5);
  });

// p1: 
// 状态: pending
// 成功回调
// 失败回调

// p2: 
// 状态:  fulfilled 2
// 成功回调 
// 失败回调


// p3: 
// 状态 fulfilled undefined
// 成功回调 
// 失败回调
// 宏队列 
// 微队列  4 AAA

// 1
// 3
// 4
// AAA
// 5