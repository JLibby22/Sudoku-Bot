const rows = 'ABCDEFGHI';
const cols = '123456789';
const gen = require('./fillBoard');
const resolve = require('./newBoard');
uncompleted = [];



function endConditions(squares, peers, values, megaString) { // checks if the solution is functional; else 
   if (gen.errorCheckG(squares, peers, values))
      return sudokuize();
   else {
      return megaString;

   }
}

function sudokuize() { //compliles other functions to create the board
   const squares = gen.cross(rows, cols);


   let unitlist = [];
   for (let row of rows) {
      unitlist.push(gen.cross(row, cols))
   }
   for (let col of cols) {
      unitlist.push(gen.cross(rows, col))
   }
   for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
         unitlist.push(gen.cross(['ABC', 'DEF', 'GHI'][i], ['123', '456', '789'][j]));
      }

   }

   const peers = gen.Peers(squares, unitlist);

   let values = gen.appraise(squares);

   
   for (let i = 0; i < squares.length; i++)
      uncompleted[i] = squares[i]

   gen.complete(squares, values, peers);

   let megaString = ""



   for (let square of squares) {


      megaString = megaString.concat(values[square]);
   }
   return endConditions(squares, peers, values, megaString)



}



console.log(sudokuize());