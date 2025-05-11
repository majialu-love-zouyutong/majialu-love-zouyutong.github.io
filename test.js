const romanToInt = (s) => {
  // 哈希表存储罗马数字和阿拉伯数字的映射关系
  const map = new Map(
    [
      ['I', 1],
      ['V', 5],
      ['X', 10],
      ['L', 50],
      ['C', 100],
      ['D', 500],
      ['M', 1000],
    ]
  );

  let sum = 0;

  // 只需要遍历一次，如果当前数字小于后一个数字，则减去当前数字，否则加上当前数字
  for (let i = 0; i < s.length; i++) {
    if (i < s.length - 1 && map.get(s[i]) < map.get(s[i + 1])) {
      sum -= map.get(s[i]);
    } else {
      sum += map.get(s[i]);
    }
  }
  return sum;
}

// 测试
console.log(romanToInt('III')); // 3
console.log(romanToInt('LVIII')); // 58
console.log(romanToInt('MCMXCIV')); // 1994