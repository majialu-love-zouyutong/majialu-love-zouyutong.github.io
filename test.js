function TreeNode(left, right, val) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// 生成一棵树
const root = new TreeNode(
  new TreeNode(
    new TreeNode(
      new TreeNode(null, null, 4),
      new TreeNode(null, null, 5),
      2,
    ),
    new TreeNode(null, null, 6),
    3,
  ),
  new TreeNode(null, null, 7),
  1,
);

const inorderTraversal = (root) => {
  // 结果数组
  const res = [];

  // 模拟栈
  const stack = [];

  // 当前指针
  let cur = root;

  // 当栈非空或者当前指针非空时
  while (stack.length || cur) {
    // 如果当前指针非空，则将当前指针入栈，并将当前指针指向左子节点
    if (cur) {
      stack.push(cur);
      cur = cur.left;
    } else {
      // 如果当前指针为空，则取出栈顶元素，将当前指针指向栈顶元素的右子节点
      cur = stack.pop();
      res.push(cur.val);
      cur = cur.right;
    }
  }
  return res;
}

console.log(inorderTraversal(root));
