function pairToTarget(array, target) {
  let hash = {};

  for (let index = 0; index < array.length; index++) {
    const value = array[index];

    let complement = target - value;

    if (hash[complement]) {
      return `Match found: ${value} + ${complement}`;
    }

    hash[value] = true;
  }

  return "No pair found";
}

console.log(pairToTarget([13, 17, 12, 40, 25, 9, 48], 60));
