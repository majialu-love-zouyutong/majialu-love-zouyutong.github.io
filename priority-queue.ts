class PriorityQueue<T> {
  /**
   * 存储堆元素的数组，使用数组实现二叉堆结构
   * 第 0 个元素为堆顶
   */
  private heap: T[] = [];

  /**
   * 构造函数，传入一个比较函数 compare
   * 用于定义优先级规则
   * - 小顶堆：传入 (a, b) => a < b
   * - 大顶堆：传入 (a, b) => a > b
   */
  constructor(private compare: (a: T, b: T) => boolean) { };

  /**
   * 交换堆中两个元素的位置
   * @param i 元素1的索引
   * @param j 元素2的索引
   */
  private swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  /**
   * 上浮操作（堆化上滤）：在插入新元素后，从底部往上调整堆
   * 直到满足堆的性质为止（即 compare 父节点优于当前节点）
   * @param i 当前要上浮的元素索引
   */
  private up(i: number) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2); // 计算父节点索引
      // 如果父节点优于当前节点，停止上浮
      if (this.compare(this.heap[p], this.heap[i])) {
        break;
      }
      // 否则交换当前节点和父节点
      this.swap(i, p);
      i = p; // 继续向上比较
    }
  }

  /**
   * 下沉操作（堆化下滤）：在删除堆顶元素后，从堆顶向下调整
   * 保证堆的性质不被破坏
   * @param i 当前要下沉的元素索引（通常是堆顶 0）
   */
  private down(i: number) {
    const n = this.heap.length;
    while (true) {
      const left = 2 * i + 1;  // 左子节点索引
      const right = 2 * i + 2; // 右子节点索引
      let min = i;

      // 与左子节点比较
      if (left < n && !this.compare(this.heap[min], this.heap[left])) {
        min = left;
      }

      // 与右子节点比较
      if (right < n && !this.compare(this.heap[min], this.heap[right])) {
        min = right;
      }

      // 当前节点已经是最小（或最大），不再下沉
      if (min === i) {
        break;
      }

      // 否则与较优子节点交换，继续下沉
      this.swap(i, min);
      i = min;
    }
  }

  /**
   * 插入一个新元素到堆中
   * 时间复杂度：O(log n)
   * @param val 要插入的值
   */
  public push(val: T) {
    this.heap.push(val);              // 添加到堆尾
    this.up(this.heap.length - 1);    // 向上堆化
  }

  /**
   * 弹出并返回堆顶元素（优先级最高）
   * 时间复杂度：O(log n)
   * @returns 堆顶元素或 undefined（如果堆为空）
   */
  public pop(): T | undefined {
    const n = this.heap.length;
    if (n === 0) return void 0;

    // 交换堆顶和最后一个元素
    this.swap(0, n - 1);
    const val = this.heap.pop();  // 弹出原堆顶（即优先级最高的值）
    this.down(0);                 // 从堆顶向下调整
    return val;
  }

  /**
   * 获取堆顶元素（但不删除）
   * 时间复杂度：O(1)
   * @returns 堆顶元素或 undefined
   */
  public top(): T | undefined {
    return this.heap.length === 0 ? void 0 : this.heap[0];
  }

  /**
   * 获取当前队列的大小
   * @returns 元素数量
   */
  public size(): number {
    return this.heap.length;
  }

  /**
   * 判断队列是否为空
   * @returns 是否为空
   */
  public isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /**
   * 获取堆数组
   * @returns 返回堆数组
   */
  public getHeap(): T[] {
    return this.heap;
  }
}

