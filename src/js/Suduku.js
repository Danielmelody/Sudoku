var sudokuLogic;
(function (sudokuLogic) {
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
    var Sudoku = (function () {
        /**
        * @author yiminghu
        *
        * the no-param constructor will construct an objecjt representing a feasible solution of suduku
        */
        function Sudoku() {
            this.board = [];
            this.completeFlag = false;
            this.filledNum = 0;
            for (var i = 0; i < 9; ++i) {
                var line = [];
                for (var j = 0; j < 9; ++j) {
                    line[j] = 0;
                }
                this.board.push(line);
            }
        }
        /**
        * @author yiminghu
        * @language en_US
        * @return a 9-length random list of numbers from 1-9
        */
        Sudoku.prototype.getRandomList = function () {
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
        };
        Sudoku.prototype.checkComplete = function () {
            console.log(this.filledNum);
            return 81 == this.filledNum;
        };
        /**
        * @author yiminghu
        * @language en_US
        *
        * check if the provided param 'value' is feasible at board[param 'row'][param 'column']
        */
        Sudoku.prototype.check = function (column, row, value) {
            // check if 'value' is feasible in provided row
            for (var i = 0; i < 9; ++i) {
                if (value == this.board[row][i]) {
                    if (column != i) {
                        return false;
                    }
                }
            }
            // check if 'value' is feasible in provided column
            for (var i = 0; i < 9; ++i) {
                if (value == this.board[i][column]) {
                    if (row != i) {
                        return false;
                    }
                }
            }
            // check if 'value' is feasible in specified 3*3 rect
            // get a 3*3 coordinate of the board consisting of 9 3*3 rects;
            var oriCol = column;
            var oriRow = row;
            column /= 3;
            row /= 3;
            column = parseInt(column.toString());
            row = parseInt(row.toString());
            //iterate from specified 3*3 rect to check
            for (var i = 0; i < 3; ++i) {
                for (var j = 0; j < 3; ++j) {
                    if (this.board[3 * row + i][3 * column + j] == value) {
                        if (3 * row + i != oriRow && 3 * column + j != oriCol) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
        Sudoku.prototype.solve = function () {
            this.preFill(0, 0, parseInt((81 * Math.random()).toFixed(0)) % 9 + 1);
        };
        Sudoku.prototype.emitSuduku = function (level) {
            for (var i = 0; i < level; ++i) {
                var rows = this.getRandomList();
                var columns = this.getRandomList();
                for (var j = 0; j < 9; ++j) {
                    this.board[rows[j] - 1][columns[j] - 1] = 0;
                }
            }
            for (var i = 0; i < 9; ++i) {
                for (var j = 0; j < 9; ++j) {
                    if (this.board[i][j] != 0) {
                        this.filledNum++;
                    }
                }
            }
        };
        Sudoku.prototype.getValidList = function (column, row) {
            var list = [];
            for (var i = 1; i < 10; ++i) {
                if (this.check(column, row, i)) {
                    list.push(i);
                }
            }
            return list;
        };
        Sudoku.prototype.fill = function (column, row, value) {
            console.log(value + ',' + this.board[row][column]);
            if (this.board[row][column] == 0 && value != 0) {
                this.filledNum++;
            }
            if (this.board[row][column] != 0 && value == 0) {
                this.filledNum--;
            }
            this.board[row][column] = value;
        };
        /**
        * @author yiminghu
        *
        * try to fill a grid of board, if ok, try to fill next, if not, return back, until reach the end of the board
        * NOTICE: this method will step from current grid to next along the direction from low column to high column,
        * low row to high row(column first)
        * @example
            this.preFill(0, 0, 1);//this will fill all the board;
        */
        Sudoku.prototype.preFill = function (column, row, value) {
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
                }
                else {
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
            this.board[row][column] = 0;
            return;
        };
        return Sudoku;
    })();
    sudokuLogic.Sudoku = Sudoku;
})(sudokuLogic || (sudokuLogic = {}));
