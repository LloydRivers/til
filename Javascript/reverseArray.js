function reverseArray(arr, i) {
  if (i === 0) return [arr[0]];
  return [arr[i]].concat(reverseArray(arr, i - 1));
}

console.log(reverseArray([1, 2, 3, 4], 3));
