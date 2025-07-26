function test() {
  console.log(this);
}

console.log(test.call(null));