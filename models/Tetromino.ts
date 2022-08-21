import { Coordinates } from "../types";

interface Slidable {
  left: boolean;
  right: boolean;
}

/**
 * TODO:
 * - Fix slide logic
 * - Add event emitter logic
 * - Add grid listeners
 */

export class Tetromino {
  public coordinates: Coordinates[];
  private canMove: boolean = true;
  private canSlide: Slidable = { left: true, right: true };

  constructor(coordinates: Coordinates[]) {
    this.coordinates = coordinates;
  }

  canSlideLeft() {
    return this.canSlide.left;
  }

  canSlideRight() {
    return this.canSlide.right;
  }

  setCanSlide(update: Omit<Slidable, "left" | "right">) {
    this.canSlide = { ...this.canSlide, ...update };
  }

  fall(limit: number) {
    const newCoordinates = this.coordinates?.map(([x, y]): Coordinates => {
      let newY = y;
      const tmpY = y + 1;

      if (tmpY < limit) {
        newY = tmpY;
      }

      return [x, newY];
    });
    this.coordinates = newCoordinates;
  }

  rotate() {
    const sortedByX = [...this.coordinates].sort((a, b) => b[0] - a[0]);
    const sortedByY = [...this.coordinates].sort((a, b) => b[1] - a[1]);
    const offsetX = sortedByX[0][0];
    const offsetY = sortedByY[0][1];

    const newCoordinates = this.coordinates?.map(([x, y]): Coordinates => {
      const newX = y - offsetY;
      const newY = (x - offsetX) * -1;
      return [newX + offsetX, newY + offsetY];
    });

    this.coordinates = newCoordinates;
  }

  slide(dir: number, limit: number) {
    let isOnGridSide = { ...this.canSlide };
    const newCoordinates = this.coordinates?.map(([x, y]): Coordinates => {
      if (x + dir >= 0 && x + dir < limit) {
        isOnGridSide = {
          left: x + dir !== 0,
          right: x + dir !== limit - 1,
        };
        return [x + dir, y];
      }
      return [x, y];
    });

    this.canSlide = isOnGridSide;

    this.coordinates = newCoordinates;
  }
}

export const bar = new Tetromino([
  [3, -1],
  [4, -1],
  [5, -1],
  [6, -1],
]);

export const Square = new Tetromino([
  [5, -2],
  [6, -2],
  [5, -1],
  [6, -1],
]);

export const LeftL = new Tetromino([
  [6, -3],
  [6, -2],
  [6, -1],
  [5, -1],
]);

export const RightL = new Tetromino([
  [5, -3],
  [5, -2],
  [5, -1],
  [6, -1],
]);

export const LeftZ = new Tetromino([
  [4, -1],
  [5, -1],
  [5, -2],
  [6, -2],
]);

export const RightZ = new Tetromino([
  [4, -2],
  [5, -2],
  [5, -1],
  [6, -1],
]);

export const TShape = new Tetromino([
  [4, -1],
  [5, -1],
  [5, -2],
  [6, -1],
]);
