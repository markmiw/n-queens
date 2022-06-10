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

//adding 3 rooks

//incrementally add rooks
//starting with 0,0 check if we can add rook
//add rook diagonally
//

window.findNRooksSolution = function(n) {
  let board = new Board({n: n});
  var solution = []; //fixme


  //initialize rook locations to be diagonal
  for (let i = 0; i < n; i++) {
    board.togglePiece(i, i);
  }

  solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  //Working Solution
  //===========================================================
  let solutionCount = 0;
  let board = new Board({n: n});
  var helper = function(rooksPlaced, col) {
    debugger;
    if (rooksPlaced === n) {
      solutionCount++;
      return;
    }

    for (let row = 0; row < n; row++) {
      board.togglePiece(row, col);
      if (!board.hasAnyRooksConflicts()) { //if no conflicts, add another piece at row 0, column + 1
        helper (rooksPlaced + 1, col + 1); // row = 0, col++
      }
      board.togglePiece(row, col); //remove last piece and row + 1
    }
  };
  helper(0, 0);
  //===========================================================


  // //Brute Force
  //===========================================================
  // let solutionCount = 0;
  // let board = new Board({n: n});

  // var helper = function(col, count) {
  //   if (col === n) {
  //     return;
  //   }

  //   for (let row = 0; row < n; row++) {
  //     board.togglePiece(row, col);
  //     helper(col + 1, count + 1);
  //     if (!board.hasAnyRooksConflicts() && count === n) {
  //       solutionCount++;
  //     }
  //     board.togglePiece(row, col);
  //   }
  // };
  // helper(0, 1);
  // helper(0, 0);
  //===========================================================


  // Other attempts
  //===========================================================
  // helper = function (curRookRow, curRookCol, index, numOfRooks) {
  //   for (let i = 0; i < n; i++) {
  //     for (let j = index; j < n; j++) {
  //       if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()) {
  //         //     solution = board.rows();
  //         //     solutionFound = true;
  //         //     return solution;
  //         //   }

  //     }
  //   }
  // }

  // helper = function (curRookRow, curRookCol, index) {
  //   //if solution found get out of recursion
  //   if (solutionFound) {
  //     return;
  //   }
  //   //if solution found return and exit
  //   if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()) {
  //     solution = board.rows();
  //     solutionFound = true;
  //     return solution;
  //   }

  //   //position reached end of row jump to next row
  //   if (curRookCol === lastIndex) {
  //     board.togglePiece(curRookRow, curRookCol);
  //     curRookRow++; curRookCol = 0;
  //     board.togglePiece(curRookRow, curRookCol);
  //   } else { // if not move to the right
  //     board.togglePiece(curRookRow, curRookCol);
  //     curRookCol++;
  //     board.togglePiece(curRookRow, curRookCol);
  //   }

  //   //if rook overlaps return
  //   if (curR === lastIndex && curC === index) {
  //     return;
  //   }
  // };

  // helper(curRookCol, curRookRow, index);

  // return solution;


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = []; //fixme
  let board = new Board({n: n});
  let solutionFound = false;
  helper = function(queensPlaced, col) {
    if (solutionFound) {
      return;
    }
    if (queensPlaced === n) {
      solution = JSON.parse(JSON.stringify(board.rows()));
      solutionFound = true;
      return;
    }

    for (let row = 0; row < n; row++) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        helper (queensPlaced + 1, col + 1);
      }
      board.togglePiece(row, col);
    }
  };
  helper(0, 0);
  if (solution.length === 0) { //If solution is not found, return empty nxn board
    solution = board.rows();
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  let board = new Board({n: n});

  helper = function(queensPlaced, col) {
    if (queensPlaced === n) {
      solutionCount++;
      return;
    }

    for (let row = 0; row < n; row++) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        helper (queensPlaced + 1, col + 1);
      }
      board.togglePiece(row, col);
    }
  };
  helper(0, 0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
