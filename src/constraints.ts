//create a module for the constraints 

export abstract class Constraints {
    static readonly TCcount_min: number = 1;
    static readonly TCcount_max: number = 1000;
    static readonly rows_min: number = 1;
    static readonly rows_max: number = 182;
    static readonly cols_min: number = 1;
    static readonly cols_max: number = 182;
    static readonly default_distance: number = Constraints.rows_max + Constraints.cols_max; //the distance will always be smaller than this

    static withinRowRange = (val: number, min: number, max: number) => {
        if((val >= min) && (val <= max)){
            return true;
        }
        return false;
    }

    static caseCountInRange = (caseCount: number) => {
        if((caseCount >= Constraints.TCcount_min) && (caseCount <= Constraints.TCcount_max)){
            return true;
        }
        return false;
    }

    static rowsInRange(rows: number): boolean {
        if((rows >= Constraints.rows_min) && (rows <= Constraints.rows_max)){
            return true;
        }
        return false;
    }

    public static colsInRange(cols: number): boolean {
        if((cols >= Constraints.cols_min) && (cols <= Constraints.cols_max)){
            return true;
        }
        return false;
  }

}
