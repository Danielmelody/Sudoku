module sudukuLogic {
    /** class Sudoku
    * @author yiminghu
    * @language en_US
    *
    * Once constructed, an objecjt of class "Sudoku" represents a feasible solution of suduku
    * @example
    * <pre>
    *    var suduku = new Sudoku();
    *    console.log(suduku.board);//you can see a new full-filled suduku in console
    * </pre>
    */
    export class Sudoku {
        public board = [];

        completeFlag = false;

        /**
        * @author yiminghu
        * @language en_US
        * @return a 9-length random list of numbers from 1-9
        */
        public getRandomList(): Array<number> {
            var result = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            for (var i = 0; i < 9; ++i) {
                var start = parseInt((81 * Math.random()).toFixed(0)) % 9;
                //setTimeout(null, start);
                var end = parseInt((81 * Math.random()).toFixed(0)) % 9;
                var temp = result[start];
                result[start] = result[end];
                result[end] = temp;
            }
            return result;
        }

        /**
        * @author yiminghu
        * @language en_US
        *
        * check if the provided param 'value' is feasible at board[param 'row'][param 'column']
        */
        public check(column: number, row: number, value): boolean {
            // check if 'value' is feasible in provided row
            for (var i = 0; i < 9; ++i) {
                if (value == this.board[row][i]) {
                    return false;
                }
            }
            // check if 'value' is feasible in provided column
            for (var i = 0; i < 9; ++i) {
                if (value == this.board[i][column]) {
                    return false;
                }
            }

            // check if 'value' is feasible in specified 3*3 rect

            // get a 3*3 coordinate of the board consisting of 9 3*3 rects;
            column /= 3;
            row /= 3;

            column = parseInt(column.toString());
            row = parseInt(row.toString());
            //iterate from specified 3*3 rect to check
            for (var i = 0; i < 3; ++i) {
                for (var j = 0; j < 3; ++j) {
                    if (this.board[3 * row + i][3 * column + j] == value) {
                        return false;
                    }
                }
            }

            return true;
        }

        /**
        * @author yiminghu
        *
        * try to fill a grid of board, if ok, try to fill next, if not, return back, until reach the end of the board
        * NOTICE: this method will step from current grid to next along the direction from low column to high column,
        * low row to high row(column first)
        * @example
            this.preFill(0, 0, 1);//this will fill all the board;
        */
        private preFill(column: number, row: number, value: number) {

            if (!this.check(column, row, value)) {
                return;
            }

            this.board[row][column] = value;

            //NOTE: the key step of genarating different and good-looking suduku, that is,
            //get a random-ordered list of 1-9 for candidates and try to fill the next grid
            //with the giving order
            var preList = this.getRandomList();

            //now let's try each one of preList
            for (var i in preList) {
                var next = preList[i];
                var nextColumn;
                var nextRow;
                //check if reaches the column border of board
                if (column + 1 == 9) {
                    nextRow = row + 1;
                    nextColumn = 0;
                } else {
                    nextRow = row;
                    nextColumn = column + 1;
                }
                //the endinig condition
                if (nextRow == 9) {
                    this.completeFlag = true;
                    return;
                }
                //if reaches this step, reset filled grid with 0 and return back
                this.preFill(nextColumn, nextRow, next);
            }
            if (this.completeFlag) {
                return;
            }
            this.board[nextRow][nextColumn] = 0;
            return;
        }
        /**
        * @author yiminghu
        *
        * the no-param constructor will construct an objecjt representing a feasible solution of suduku
        */
        constructor() {
            for (var i = 0; i < 9; ++i) {
                var line: number[] = [];
                for (var j = 0; j < 9; ++j) {
                    line[j] = 0;
                }
                this.board.push(line);
            }
            // we fill the first grid of board with a random value from 1-9
            this.preFill(0, 0, parseInt((81 * Math.random()).toFixed(0)) % 9 + 1);
        }
    }
}
