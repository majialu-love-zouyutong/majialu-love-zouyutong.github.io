function combile(a: number, b: number): number;
function combile(a: string, b: string): string;

function combile(a: any, b: any) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a + b;
  }
  throw new Error('Invalid arguments');
}

const num = combile()