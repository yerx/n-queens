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
  var solutionCount = n;
  var factorial = function (n) {
    return n ? n * factorial(n - 1) : 1;
  };
  solutionCount = factorial(n);

  //We started off thinking that findNRoodsSolution would need to find all available
  // and then wrote this to brute force it before implementing a faster factorial function.
  // var board = new Board({ 'n': n });
  // var matrix = board.rows();
  // var count = 0;
  // matrix = findNRooksSolution(n);
  // var incrementor = 1;
  // var newSolution = function (n, matrix) {
  //   incrementor = ((matrix[0][n - 1] === 1 && matrix[n - 1][n - 2] === 1)) ? -1 : 1;
  //   for (var ri = 0; ri < n; ri++) {
  //     for (var ci = 0; ci < n && ci >= 0; ci + incrementor) {
  //       if (matrix[ri][ci] = 1) {
  //         matrix[ri][ci] = 0;
  //         if (ci !== n - 1) {
  //           matrix[ri][ci + 1] = 1;
  //         } else {
  //           matrix[ri][0] = 1;
  //         }
  //         continue;
  //       }
  //     }
  //   }
  //   count++;
  //   console.log(matrix);
  //   console.log(count);

  // };
  // if ((matrix[0][0] === 0 && matrix[n - 1][1] !== 1) || matrix[0].length <= 4) {
  //   newSolution(n, matrix);
  // }
  // solutionCount = count;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n, board) {

  var solution = undefined; //fixme

  // start a new board
  board = board || new Board({ 'n': n });
  // matrix = board
  matrix = board.rows();
  // board.togglePiece(ri, ci);// = 1 or 0;

  // var to store column index of piece that is toggled
  var storeColumnIndex = new Array(n);
  var conflict = false;
  // iterate through the matrix
  //while ()
  var recursiveCheck = function (ri) {

    if (ri >= n) {
      throw "ERROR - row index was more than board size (n)";
    }
    // if row[0]
    for (var ci = 0; ci < n && !conflict; ci++) {
      if (!matrix[ri].includes(1)) {
        board.togglePiece(ri, ci);
        storeColumnIndex.push(ci);
      } else {
        // get location of the toggled piece
        // current ri and location in that row of one
        // toggle that location
        // iterate through remainder of the row
        // toggle the next location
        // if there is no confict break out of the iteration
        // break out of parent iteration
      }
    }
    // iterate through row[0]
    // toggle a piece at ci[i]
    // store i in the columnObj
    // if row[1] does not include 1
    // iterate through row[1]
    // access the columnObj to see if any columns are off limits  - if the ci value is NOT found in column obj
    // then, toggle the piece
    // if there are diagonal conflics
    // untoggle piece
    // check next ci[i] that's not in the column obj
  };




  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
