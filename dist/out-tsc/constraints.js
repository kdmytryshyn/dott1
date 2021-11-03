//create a module for the constraints
//why create abstract??? ok if not? or because no methods?
//initially was export abstract static class 
export class Constraints {
    static rowsInRange(rows) {
        if ((rows >= Constraints.rows_min) && (rows <= Constraints.rows_max)) {
            return true;
        }
        return false;
    }
    static colsInRange(cols) {
        if ((cols >= Constraints.cols_min) && (cols <= Constraints.cols_max)) {
            return true;
        }
        return false;
    }
}
//should i define these as consts instead?
Constraints.TCcount_min = 1;
Constraints.TCcount_max = 1000;
Constraints.rows_min = 1;
Constraints.rows_max = 182;
Constraints.cols_min = 1;
Constraints.cols_max = 182;
Constraints.default_distance = Constraints.rows_max + Constraints.cols_max; //the distance will always be smaller than this
Constraints.withinRowRange = (val, min, max) => {
    if ((val >= min) && (val <= max)) {
        return true;
    }
    return false;
};
//should i include public? 
//why do i still need to include the Constraints.
Constraints.caseCountInRange = (caseCount) => {
    if ((caseCount >= Constraints.TCcount_min) && (caseCount <= Constraints.TCcount_max)) {
        return true;
    }
    return false;
};
//# sourceMappingURL=constraints.js.map