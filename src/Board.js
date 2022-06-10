// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      let specificRow = this.get(rowIndex);
      let count = 0;
      for (let i = 0; i < specificRow.length; i++) {
        if (specificRow[i] === 1) {
          count++;
        }
        if (count > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      let row = this.get(0);
      if (row === undefined) {
        return false;
      }
      let len = row.length;
      if (len === 0) {
        return false;
      }
      for (let i = 0; i < len; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //let board = this.rows();
      let len = this.get(0).length;
      let count = 0;
      for (let i = 0; i < len; i++) {
        if (this.get(i)[colIndex] === 1) {
          count++;
        }
        if (count > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //let cols = this.rows();
      let col = this.get(0);
      if (col === undefined) {
        return false;
      }
      let len = col.length;
      if (len === 0) {
        return false;
      }
      for (let i = 0; i < len; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //let board = this.rows();
      let size = this.get(0);
      if (size === undefined) {
        return false;
      }
      let n = size.length;
      if (n === 0) {
        return false;
      }
      let pieceLocations = [];
      //get piece locations
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (this.get(i)[j] === 1) {
            pieceLocations.push([i, j]);
          }
        }
      }

      for (let i = 0; i < pieceLocations.length; i++) {
        for (let j = i + 1; j < pieceLocations.length; j++) {
          let hasDiagonalConflict = (pieceLocations[i][0] - pieceLocations[i][1]) === (pieceLocations[j][0] - pieceLocations[j][1]);
          if (hasDiagonalConflict) {
            return true;
          }
        }
      }
      // for (let i = 0; i < pieceLocations.length; i++) {
      //   let [curPieceRow, curPieceCol] = pieceLocations[i];
      //   let R = curPieceRow;
      //   let C = curPieceCol;
      //   //check up left
      //   while (R >= 0 && R < n && C >= 0 && C < n) {
      //     R--; C--; // move up left
      //     if (board[R][C] === 1) {
      //       return true;
      //     }
      //   }
      //   R = curPieceRow;
      //   C = curPieceCol;
      //   //check down right
      //   while (R >= 0 && R < n && C >= 0 && C < n) {
      //     R--; C--; // move down right
      //     if (board[R][C] === 1) {
      //       return true;
      //     }
      //   }
      // }

      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      return this.hasMajorDiagonalConflictAt();
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let size = this.get(0);
      if (size === undefined) {
        return false;
      }
      let n = size.length;
      if (n === 0) {
        return false;
      }
      let pieceLocations = [];
      //get piece locations
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (this.get(i)[j] === 1) {
            pieceLocations.push([i, j]);
          }
        }
      }

      for (let i = 0; i < pieceLocations.length; i++) {
        for (let j = i + 1; j < pieceLocations.length; j++) {
          let hasDiagonalConflict = (pieceLocations[i][0] + pieceLocations[i][1]) === (pieceLocations[j][0] + pieceLocations[j][1]);
          if (hasDiagonalConflict) {
            return true;
          }
        }
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return this.hasMinorDiagonalConflictAt();
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
