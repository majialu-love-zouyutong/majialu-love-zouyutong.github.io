const p1 = new Promise((resolve, reject) => {
  console.log(1);
  resolve();
})
  .then((res) => {
    console.log(2);
    return Promise.resolve();
  })
  .then(() => {
    console.log(3);
  })

const p2 = new Promise((resolve, reject) => {
  console.log(4);
  resolve();
})
  .then((res) => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  })
  .then(() => {
    console.log(7);
  })
  .then(() => {
    console.log(8);
  });


// 执行栈 () => p1

// 宏任务队列

// 微任务队列 , 4,


// p1 fulfilled 1

// p2 pending