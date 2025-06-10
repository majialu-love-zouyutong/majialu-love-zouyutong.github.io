const rl = require('readline').createInterface({
    input: process.stdin,
});

var iter = rl[Symbol.asyncIterator]();

const readline = async () => (await iter.next()).value;

void (async function () {
    // 前缀和数组
    const preSums = [];
    while (true) {
        const len = Number(await readline());
        // 和
        let sum = 0;
        // 读取元素并计算前缀和
        for (let i = 0; i < len; i++) {
            sum += (Number(await readline()));
            preSums.push(sum);
        }
        while (true) {
            const line = await readline();
            if (!line) return;
            const [start, end] = line.split(' ').map(Number);
            console.log(preSums[end] - (preSums[start - 1] ?? 0));
        }
    }
})()
