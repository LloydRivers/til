type Data = number[];

export class CalculateStats {
  data: Data;

  constructor(data: Data) {
    this.data = data;
  }

  getMin() {
    return Math.min(...this.data);
  }
  getMax() {
    return Math.max(...this.data);
  }
  getLength() {
    return this.data.length;
  }
  isEmpty() {
    return this.data.length === 0;
  }
  getAvg() {
    if (this.isEmpty()) throw new Error("You cannot reduce an empty array");
    const total = this.data.reduce((acc, curr) => {
      return acc + curr;
    }, 0);

    return Math.round(total / this.data.length);
  }
}
