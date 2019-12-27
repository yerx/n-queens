// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

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

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
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
    // time complexity is O(n)
    hasRowConflictAt: function (rowIndex) {

      let currentRow = this.get(rowIndex);
      let count = 0;

      for (let i = 0; i < currentRow.length; i++) {
        count += currentRow[i];
      }

      return count > 1;

    },

    // test if any rows on this board contain conflicts
    // time complexity is O(n)
    hasAnyRowConflicts: function () {
      let size = this.get('n');

      for (let i = 0; i < size; i++) {
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
    // time complexity is O(n)
    hasColConflictAt: function (colIndex) {

      let size = this.get('n');
      let count = 0;

      for (let i = 0; i < size; i++) {
        // define variable equal to i
        let row = this.get(i);
        // get a count of the 1's in the column
        count += row[colIndex];
      }

      return count > 1;

    },

    // test if any columns on this board contain conflicts
    // time complexity is O(n)
    hasAnyColConflicts: function () {
      let size = this.get('n');

      for (var i = 0; i < size; i++) {
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
    // time complexity is O(n)
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {

      let ci = majorDiagonalColumnIndexAtFirstRow;
      let size = this.get('n');
      let count = 0;
      let ri = 0;

      // iterate through the rows
      for ( ; ri < size && ci < size; ri++, ci++) {
        // if the value at index is not 0 then increase count
        if (ci >= 0) {
          // define row variable equal to this.get(ri)
          let row = this.get(ri);
          count += row[ci];
        }
      }
      return count > 1;
    },

    // time complexity is O(n)
    hasAnyMajorDiagonalConflicts: function () {
      let size = this.get('n');

      for (var ci = 1 - size; ci < size; ci++) {
        if ( this.hasMajorDiagonalConflictAt(ci) ) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    // time complexity is O(n)
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      let ci = minorDiagonalColumnIndexAtFirstRow;
      let ri = 0;
      let size = this.get('n');
      let count = 0;

      for ( ; ri < size && ci >= 0; ri++, ci--) {
        if ( ci < size ) {
          var row = this.get(ri);
          count += row[ci];
        }
      }

      return count > 1; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    // time complexity is O(n)
    hasAnyMinorDiagonalConflicts: function () {
      let size = this.get('n');

      for (var ci = (size * 2) - 1; ci >= 0; ci--) {
        // old value was
        if ( this.hasMinorDiagonalConflictAt(ci) ) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
