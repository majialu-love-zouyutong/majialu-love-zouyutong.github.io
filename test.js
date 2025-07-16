function Parent() {}
function Child() {}

Child.prototype = Object.create(Parent.prototype); // 创建新原型，但 constructor 丢失
console.log(Child.prototype.constructor === Child); // false
console.log(Child.prototype.constructor === Parent); // true