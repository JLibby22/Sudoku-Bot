const rows = 'ABCDEFGHI';
const cols = '123456789';
const gen = require('./extra');



function endConditions(squares, peers, values, megaString) { // checks if the solution is functional; else 
   if (gen.errorCheckG(squares, peers, values) == true)
      return sudokuize();
   else {
      return megaString;

   }
}

function sudokuize() { //compliles other functions to create the board
   const squares = gen.cross(rows, cols);
   

   let unitlist = [];
   for (let i = 0; i < rows.length; i++) {
      unitlist.push(gen.cross(rows[i], cols))
   }
   for (let i = 0; i < cols.length; i++) {
      unitlist.push(gen.cross(rows, cols[i]))
   }
   for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
         unitlist.push(gen.cross(['ABC', 'DEF', 'GHI'][i], ['123', '456', '789'][j]));
      }

   }

   const peers = gen.Peers(squares, unitlist);

   let values = gen.appraise(squares);

   uncompleted = [];
   for (let i = 0; i < squares.length; i++)
      uncompleted[i] = squares[i]

   gen.complete(squares, values, peers);

   let megaString = ""



   for (let i = 0; i < squares.length; i++) {


      megaString = megaString.concat(values[squares[i]]);
   }
   return endConditions(squares, peers, values, megaString)



}



console.log(sudokuize());