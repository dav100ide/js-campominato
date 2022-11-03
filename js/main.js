'use strict';
/* ==========================
      functions
============================ */
function defeat() {
   alert('hai perso');
}

function printGrid(gridCells = 100, gridContainer = document) {
   board.innerHTML = '';

   for (let i = 1; i <= gridCells; i++) {
      const gridCell = document.createElement('div');
      gridCell.innerHTML = i;
      gridCell.classList.add('board__number');
      // al click aggiungo la classe che mette un altro background-color
      gridCell.addEventListener('click', function () {
         this.classList.add('board__number-active');
         if (bombs.includes(Number(this.innerHTML))) {
            defeat();
         }
      });

      gridContainer.append(gridCell);
   }
}

function getRndInteger(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ==========================
      main
============================ */
const board = document.querySelector('.board');
const playBtn = document.getElementById('play-btn');
const difficulty = document.getElementById('difficulty');

let gridCells = 100;
playBtn.addEventListener('click', function () {
   if (difficulty.value === 'hard') {
      gridCells = 49;
      document.documentElement.style.setProperty('--col-number', '7');
   } else if (difficulty.value === 'medium') {
      gridCells = 81;
      document.documentElement.style.setProperty('--col-number', '9');
   } else if (difficulty.value === 'easy') {
      gridCells = 100;
      document.documentElement.style.setProperty('--col-number', '10');
   }
   printGrid(gridCells, board);
});

printGrid(gridCells, board);

// creo le bombe
const bombs = [2, 5, 8];

// while (bombs.length < 16) {
//    const newNumber = getRndInteger(1, gridCells);
//    if (!bombs.includes(newNumber)) {
//       bombs.push(newNumber);
//    }
// }
console.log(bombs);
