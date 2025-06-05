const arr = [1, 2, 3, 4, 5];

const target = 3;

const deleteItem = (arr: number[], target: number): number[] => {
  return arr.filter(item => item !== target);
}

console.log(deleteItem(arr, target));
console.log(arr);

