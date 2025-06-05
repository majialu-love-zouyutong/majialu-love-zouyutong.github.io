"use strict";
var arr = [1, 2, 3, 4, 5];
var target = 3;
var deleteItem = function (arr, target) {
    return arr.filter(function (item) { return item !== target; });
};
console.log(deleteItem(arr, target));
console.log(arr);
