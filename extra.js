const rows = 'ABCDEFGHI';
const cols = '123456789';


module.exports = {

   cross: function(A, B) { // creates 2D locations based on two lists.
      mixed = [];
      for (let i of A) {

         for (let j of B) {
            mixed.push(i + j);
         }
      }

      return mixed;
   },

   errorCheck: function(square, peers, values) { //checks square and its peers for errors; not actually necessary to run the code
      for (let i of peers[square]) {
         if (values[i] == values[square]) {
            console.log("ERROR")

         }
      }
   },

   errorCheckG: function(squares, peers, values) { // checks the whole function for errors
      console.log(squares)
      for (let i of squares) {
         for (let j of peers[i]) {
            if (values[i] == values[j])
               return true;
         }
      }
      return false;
   },

   appraise: function(squares) { // assigns values to each square
      let values = {};
      for (let i of squares) {
         values[i] = cols;
      }
      return values
   },

   Peers: function(squares, unitlist) { // combines the units and removes itself
      let units = {};
      for (let i of squares) {

         coolList = []
         for (let j of unitlist) {

            if (j.includes(i)) {
               coolList = coolList.concat(j);
            }

         }


         units[i] = coolList;
      }
      let peers = {};

      for (let i of squares) {
         tes = new Set();
         for (let j of units[i]) {
            tes.add(j);
         }
         tes.delete(i);
         peers[i] = Array.from(tes);
      }
      return peers
   },

   eliminate: function(rectangle, cValue, values) { // remove single values from a square
      
      if (values[rectangle].length > 1) {

         if (values[rectangle].includes(cValue)) {

            values[rectangle] = values[rectangle].replace(cValue, '');
            return values;
         }
         if (values[rectangle].length == 1) {

            module.exports.assign(rectangle, values[rectangle])
         }
         if (values[rectangle].length == 0) {
            console.log("BEEG ERROR NO VALUES")
         }
      }
      return values;
   },



   assign: function(square, cValue, values, peers) { // makes the sole value of a square the cValue and starts removing the other values from the 

      if(cValue.length == 1) {
      values[square] = cValue;

      uncompleted.splice(uncompleted.indexOf(square), 1)

      for (let i of peers[square])
         values = module.exports.eliminate(i, cValue, values);
      return values
   }

   },


   getRandomInt: function(min, max) { // gets a random number; I totally copypasted this.
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
   },

   complete: function(squares, values, peers) { //forcibly assigns single values to all squares; can return incorrect solutions
      console.log(squares)
      for (let i of squares) {

         values = module.exports.assign(i, values[i][module.exports.getRandomInt(0, values[i].length)], values, peers);
      }
   }
}