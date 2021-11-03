//class for a matrix element 
export class Element {
    row: number;
    col: number;
    val: number;
    dist: any = {}; 
    
    constructor(row: number, col: number, val: number, dist: any) {
      this.row = row;
      this.col = col;
      this.val = val;
      this.dist = dist;
    }
}
  