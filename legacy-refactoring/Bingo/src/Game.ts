import { Coordinate } from "./Coordinate";

export abstract class Game<T> {
  abstract defineCell(coordinate: Coordinate, value: T): void;
  abstract isMarked(coordinate: Coordinate): boolean;
  abstract markCell(coordinate: Coordinate): void;

  abstract startGame(): void;
}
