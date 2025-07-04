function twoSum(nums: number[], target: number): number[] {
    // 哈希表 数字：下标
    const map: Map<number,number> = new Map();

    // 遍历数组
    for(let i = 0; i < nums.length; i++) {
        // 获取当前数字
        const x = nums[i];

        // 如果目标值减去当前数字在哈希表中存在，则返回下标
        if(map.has(target - x)) {
            return [i, map.get(target - x)!];
        }
        
        // 否则将当前数字和下标存入哈希表
        map.set(x, i);
    }
};