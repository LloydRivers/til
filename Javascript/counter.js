function count(num) {
  if (num === 0) return 0;

  return (num % 10) + count(Math.floor(num / 10));
}
