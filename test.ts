function search(nums: number[], target: number): number {
  // 定义左右指针
  let left: number = 0;
  let right: number = nums.length - 1;

  // 循环
  while (left <= right) {
    // 计算中间值
    let mid = left + ((right - left) >> 1);
    if (target < nums[mid]) {
      right = mid - 1;
    } else if (target > nums[mid]) {
      left = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
};