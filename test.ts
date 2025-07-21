class TreeNode {
    constructor(
        public val: number,
        public left: TreeNode | null,
        public right: TreeNode | null
    ) {} // 关键修复：添加空构造函数体 {}

    // 路径数字求和方法（推荐数学解法）
    static sumNumbers(root: TreeNode | null): number {
        return this.dfs(root, 0);
    }

    private static dfs(node: TreeNode | null, currentSum: number): number {
        if (!node) return 0;
        
        // 计算当前路径值：1->2->3 变成 1 * 100 + 2 * 10 + 3
        const pathValue = currentSum * 10 + node.val;
        
        // 叶子节点：返回当前路径数字
        if (!node.left && !node.right) {
            return pathValue;
        }
        
        // 递归左右子树
        return this.dfs(node.left, pathValue) + this.dfs(node.right, pathValue);
    }
}

// 测试用例
const root = new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4, null, null), new TreeNode(5, null, null)),
    new TreeNode(3, null, null)
);

console.log(TreeNode.sumNumbers(root)); // 输出: 137 (124 + 125 + 13)