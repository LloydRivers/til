function findMax(arr, i) {
  if (i === 0) return arr[0];
  return Math.max(arr[i], findMax(arr, i - 1));
}

console.log(findMax([3, 1, 7, 9, 2], 4));
