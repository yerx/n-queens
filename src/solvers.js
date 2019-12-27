/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function (n, matrix) {
  var solution = undefined;
  board = new Board({ 'n': n });
  matrix = board.rows();

  if (!matrix[0].includes(1)) {
    var ci = 0;
    for (var ri = 0; ri < n; ri++) {
      board.togglePiece(ri, ci);// = 1;
      ci++;
    }
  }
  solution = matrix;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return matrix;



  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0;

  var board = new Board({n: n});

  var findRookSolution = function(rowIndex) {
    // if row count is equal to n count
    if (rowIndex === n) {
      // increment the counter
      solutionCount++;
      return;
    }

    // iterate through the row
    for (var ci = 0; ci < n; ci++) {
      // toggle piece
      board.togglePiece(rowIndex, ci);
      // check for column conflict
      if ( !board.hasAnyRooksConflicts() ) {
        // findRookSolution(row + 1)
        findRookSolution(rowIndex + 1);
      }
      // untoggle piece
      board.togglePiece(rowIndex, ci);
    }

  };
  findRookSolution(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {

  // start a new board
  var board = new Board({ 'n': n });

  var findQueenSolution = function(rowIndex) {
    // if row count is equal to n count
    if (rowIndex === n) {
      return _.map(board.rows(), function(row) {
        return row.slice();
      });
    }

    // iterate through the row
    for (var ci = 0; ci < n; ci++) {
      // toggle piece
      board.togglePiece(rowIndex, ci);
      // check for column conflict
      if ( !board.hasAnyQueensConflicts() ) {
        // findRookSolution(row + 1)
        findQueenSolution(rowIndex);
      }
      // untoggle piece
      board.togglePiece(rowIndex, ci);
    }

  };
  var solution = findQueenSolution(0);

  solution = solution || board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // if there is no solution, return board.rows();
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = 0;

  var board = new Board({n: n});

  var findQueenSolution = function(rowIndex) {
    // if row count is equal to n count
    if (rowIndex === n) {
      // increment the counter
      solutionCount++;
      return;
    }

    // iterate through the row
    for (var ci = 0; ci < n; ci++) {
      // toggle piece
      board.togglePiece(rowIndex, ci);
      // check for column conflict
      if ( !board.hasAnyQueensConflicts() ) {
        // findQueenSolution(row + 1)
        findQueenSolution(rowIndex + 1);
      }
      // untoggle piece
      board.togglePiece(rowIndex, ci);
    }
  };
  findQueenSolution(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
