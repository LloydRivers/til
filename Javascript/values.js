function sumArray(arr, i) {
  if (i === 0) return arr[0];
  return arr[i] + sumArray(arr, i - 1);
}
