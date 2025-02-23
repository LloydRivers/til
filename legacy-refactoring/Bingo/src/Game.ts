export abstract class Game<T> {
  abstract defineCell(x: number, y: number, value: T): void;
  abstract isMarked(x: number, y: number): boolean;
  abstract markCell(x: number, y: number): void;

  abstract startGame(): void;
}
