// ShuffleArray taken from here: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

// numbersPool taken from here: https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n

export class BingoNumberPool {
  private numbers: number[];

  constructor(private maxNumber: number = 99) {
    this.numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);
  }

  private shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  public getRandomNumbers(): number[] {
    return this.shuffleArray(this.numbers).slice(0, 15);
  }
}
