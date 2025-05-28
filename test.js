"use strict";
var Dog = /** @class */ (function () {
    function Dog(name) {
        this.name = name;
    }
    Dog.prototype.run = function () {
        console.log(this.name + "在跑");
    };
    Dog.eat = function () {
        console.log("dog在吃");
    };
    return Dog;
}());
Dog.eat();
var dog = new Dog("wangwang");
dog.run();
