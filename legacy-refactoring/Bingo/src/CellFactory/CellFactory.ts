import { Cell } from "../Cell/Cell";

export type CellFactory<T> = (row: number, col: number) => Cell<T> | null;

export function createDefaultCell<T>(_row: number, _col: number): Cell<T> {
  return new Cell<T>();
}
