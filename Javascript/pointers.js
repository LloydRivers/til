function pairToTarget(array, target) {
  const sortedArray = array.sort((a, b) => a - b);
  let left = 0;
  let right = sortedArray.length - 1;

  while (left < right) {
    const sum = sortedArray[left] + sortedArray[right];
    if (sum === target) {
      return [sortedArray[left], sortedArray[right]];
    }

    if (sum < target) {
      left++;
    } else if (sum > target) {
      right--;
    }
  }
  return false;
}
pairToTarget([13, 17, 12, 40, 25, 9, 48], 60);
