/*
## SKELETON CODE ##

"use strict"

class Sudoku {
  constructor(board_string) {}

  solve() {}

  // Returns a string representing the current state of the board
  board() {}
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
const fs = require('fs')
let board_string = fs.readFileSync('set-01_sample.unsolved.txt', 'utf-8')
  // .toString()
board_string.split("\n")[0]
// console.log(typeof board_string);

let game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

// console.log(game.board())
*/


"use strict"

class Sudoku {
  constructor(board_string) {
    this.fixboard = this.board(board_string)
    this.zero  = this.findZero()
  }

  // Returns a string representing the current state of the board
  board() {
      let board = [];
      let k = 0;
      for (let i = 0 ; i < 9 ; i++){
          board.push([]);
          for (let j = k ; j < board_string.length ; j++){
            board[i].push(Number(board_string[j]))
            if (board[i].length === 9){
                break
            }
          }
          k += 9
      }
      return board
  }

  findZero() {
    let data = [];
    let obj;
    for (let i = 0; i < this.fixboard.length ; i++){
      obj = {}
      for (let j = 0 ; j < this.fixboard[i].length ; j++){
        if (this.fixboard[i][j] === 0){
          obj = { 
            col : i, row : j , value : 1
          }
          data.push(obj)
        }
      }
    }
    return data
  }

  gridCheck (value , col , row) {
    let firstX = 3 * (Math.floor(col / 3))
    let lastX = firstX+2
    let firstY = 3 * (Math.floor(row / 3))
    let lastY = firstY+2
    for (let col = firstX ; col <= lastX ; col++) {
      for (let row = firstY ; row <= lastY ; row++) {
          if (this.fixboard[col][row] === value) {
            return false
          }
      }
    }
    return true
  }

  verticalCheck (value , row) {
    for (let col = 0 ; col < 9 ; col++) {
      if(this.fixboard[col][row] === value) {
        return false
      }
    }
    return true
  }

  horizontalCheck (num , col) {
    for (let row = 0 ; row < this.fixboard[col].length ; row++){
      if (this.fixboard[col][row] === num){
        return true
      }
    }
    return false
  }

  solve() {
    this.clearScreen();
    let result = '' ;
    for (let i = 0 ; i < this.zero.length; i++) {
      let obj = this.zero[i]
      while(true) {
        let horizontal = this.horizontalCheck(obj.value , obj.col);
        let vertical = this.verticalCheck(obj.value , obj.row);
        let grid = this.gridCheck(obj.value , obj.col , obj.row);
        if(grid === true && horizontal === false && vertical === true) {
          this.fixboard[obj.col][obj.row] = obj.value;
          break;
        } else {
           obj.value++
        }
      }
      if(obj.value > 9) {
        obj.value = 0 ;
        this.fixboard[obj.col][obj.row] = obj.value ;
        i -= 2
      }

      // for display purpose only //
      for (let m = 0 ; m < this.fixboard.length ; m++){
        result = '|'
        for (let n = 0 ; n < this.fixboard[m].length ; n++){
          result += this.fixboard[m][n] + '|'
        }
        console.log(result);
      }      
      console.log(`${i+1} empty cells filled from ${this.zero.length}`);
      this.sleep(100);
      if (i !== this.zero.length - 1){
        this.clearScreen();
      } else {
        console.log('done');
      }
    }
  }

  sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
          break;
        }
    }
  } 

  clearScreen() {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
const fs = require('fs')
let board_string = fs.readFileSync('set-01_sample.unsolved.txt', 'utf-8')
    .toString()
    .split("\n")[Math.round(Math.random()*13)]

let game = new Sudoku(board_string)


// Remember: this will just fill out what it can and not "guess"
game.solve();

