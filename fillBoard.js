const rows = 'ABCDEFGHI';
const cols = '123456789';


module.exports = {

   cross: (A, B) => { // creates 2D locations based on two lists.
      mixed = [];
      for (let a of A) {

         for (let b of B) {
            mixed.push(a + b);
         }
      }

      return mixed;
   },

   errorCheck: (square, peers, values) => { //checks square and its peers for errors; not actually necessary to run the code
      for (let peer of peers[square]) {
         if (values[peer] == values[square]) {
            console.log("ERROR")

         }
      }
   },

   errorCheckG: (squares, peers, values) => { // checks the whole  for errors
      for (let square of squares) {
         for (let peer of peers[square]) {
            if (values[square] == values[peer])
               return true;
         }

      }
      return false;
   },

   appraise: (squares) => { // assigns values to each square
      let values = {};
      for (let square of squares) {
         values[square] = cols;
      }
      return values
   },

   Peers: (squares, unitlist) => { // combines the units and removes itself
      let units = {};
      for (let square of squares) {

         let coolList = []
         for (let unit of unitlist) {

            if (unit.includes(square)) {
               coolList = coolList.concat(unit);
            }

         }


         units[square] = coolList;
      }
      let peers = {};

      for (let square of squares) {
         let tes = new Set();
         for (let unit of units[square]) {
            tes.add(unit);
         }
         tes.delete(square);
         peers[square] = Array.from(tes);
      }
      return peers
   },

   eliminate: (rectangle, cValue, values) => { // remove single values from a square

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



   assign: (square, cValue, values, peers) => { // makes the sole value of a square the cValue and starts removing the other values from the 

      if (cValue.length == 1) {
         values[square] = cValue;

         uncompleted.splice(uncompleted.indexOf(square), 1)

         for (let peer of peers[square])
            values = module.exports.eliminate(peer, cValue, values);
         return values
      }

   },


   getRandomInt: (min, max) => { // gets a random number; I totally copypasted this.
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
   },

   complete: (squares, values, peers) => { //forcibly assigns single values to all squares; can return incorrect solutions

      for (let square of squares) {

         values = module.exports.assign(square, values[square][module.exports.getRandomInt(0, values[square].length)], values, peers);
      }
   }
}