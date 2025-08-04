const completeBackPack = (weight: number[], value: number[], total: number): number => {
  // dp[j]表示从0-i任选，容量为j，可重复装，最大价值
  /**
   * if (j >= weight[i]) {
   *    dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]) 
   *   *}
   */

  const dp = new Array(total + 1).fill(0);

  const len = weight.length;

  for (let i = 0; i < len; i++) {
    for (let j = weight[i]; j <= total; j++) {
      dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
    }
  }
  return dp[total];
}