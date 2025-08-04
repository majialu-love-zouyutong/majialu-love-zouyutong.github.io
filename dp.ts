const zeroOneBagWithOneDimensionalArray = (w: number[], v: number[], totalWeight: number) => {
  // 剪枝
  if (w.length === 0 || v.length === 0 || totalWeight === 0) {
    return 0;
  }

  // dp[j]表示背包容量为j时的最大价值
  const dp = new Array(totalWeight + 1).fill(0);

  // 遍历物品
  for (let i = 0; i < w.length; i++) {
    // 遍历背包容量，一定要从后向前遍历，因为dp[j]依赖于dp[j - w[i]]
    for (let j = totalWeight; j >= w[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - w[i]] + v[i]);
    }
  }

  return dp[totalWeight];
};

// 写几组测试用例

console.log(zeroOneBagWithOneDimensionalArray([1, 2, 3], [6, 10, 12], 5));      // 22
console.log(zeroOneBagWithOneDimensionalArray([2, 3, 4], [3, 4, 5], 5));        // 7
console.log(zeroOneBagWithOneDimensionalArray([1, 3, 4], [15, 20, 30], 4));     // 35