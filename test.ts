function infixToPostfix(expression: string): string[] {
  const output: string[] = [];
  const stack: string[] = [];

  const precedence: Record<string, number> = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };

  const isOperator = (c: string) => ['+', '-', '*', '/'].includes(c);
  const isDigit = (c: string) => /\d/.test(c);

  const tokens = tokenize(expression);

  for (const token of tokens) {
    if (isDigit(token[0])) {
      output.push(token);
    } else if (isOperator(token)) {
      while (
        stack.length &&
        isOperator(stack[stack.length - 1]) &&
        precedence[stack[stack.length - 1]] >= precedence[token]
      ) {
        output.push(stack.pop()!);
      }
      stack.push(token);
    } else if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      while (stack.length && stack[stack.length - 1] !== '(') {
        output.push(stack.pop()!);
      }
      stack.pop(); // pop '('
    }
  }

  while (stack.length) {
    output.push(stack.pop()!);
  }

  return output;
}

// 将表达式拆分为 token：支持多位数
function tokenize(expr: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < expr.length) {
    const c = expr[i];
    if (c === ' ') {
      i++;
    } else if (/\d/.test(c)) {
      let num = '';
      while (i < expr.length && /\d/.test(expr[i])) {
        num += expr[i++];
      }
      tokens.push(num);
    } else {
      tokens.push(c);
      i++;
    }
  }
  return tokens;
}

// 示例用法：
const infix = "3 + 4 * (2 - 1)";
const postfix = infixToPostfix(infix);
console.log(postfix); // ["3", "4", "2", "1", "-", "*", "+"]
