"use strict";
var Permission;
(function (Permission) {
    Permission[Permission["Read"] = 1] = "Read";
    Permission[Permission["Write"] = 2] = "Write";
    Permission[Permission["Execute"] = 4] = "Execute";
})(Permission || (Permission = {}));
var p = Permission.Read | Permission.Write;
console.log(p);
var hasPermission = function (p, permission) { return (p & permission) === permission; };
console.log(hasPermission(p, Permission.Read));
