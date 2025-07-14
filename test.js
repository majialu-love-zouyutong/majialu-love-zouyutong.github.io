const a = '     aaaabbbbccc';
console.log(a);
console.log(a.trim());

const A = a.replace(/a/g, 'A');

console.log(a);
console.log(A);