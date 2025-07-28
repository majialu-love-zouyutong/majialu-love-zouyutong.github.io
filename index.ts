/**
 * 辅助函数，返回一个二进制字符串中0和1的数量组成的数组
 * @param s 二进制字符串
 * @returns [零的数量， 一的数量]
 */
const getZeroAndOneQuantity = (s: string): number[] => {
  let zero = 0;
  let one = 0;
  for(const c of s) {
    // 由于字符串只由1和0组成，所以可以直接三目判断
    c === '0' ? zero++ : one++;
  }
  return [zero, one];
}

function findMaxForm(strs: string[], m: number, n: number): number {
  // 定义dp数组并初始化
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

  // 开始遍历
  for (let i = 0; i < strs.length; i++) {
    // 获取字符串中0和1的数量
    const [zero, one] = getZeroAndOneQuantity(strs[i]);
    // 倒序遍历容量
    for (let j = m; j >= zero; j--) {
      for (let k = n; k >= one; k--) {
        dp[j][k] = Math.max(dp[j][k], dp[j - zero][k - one] + 1);
      }
    }
  }

  // 返回结果
  return dp[m][n];
};