import { Element } from './element';
//class for matrix 

export class TCMatrix {
  rows: number;
  cols: number;
  elements: Element[];

  constructor(rows: number, cols: number, elements: Element[]) {
    this.rows = rows;
    this.cols = cols;
    this.elements = elements;
  }

}
