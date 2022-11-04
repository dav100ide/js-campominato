'use strict';
/* ==========================
      functions
============================ */
/**
 * funzione che crea il campo da gioco
 * gridCells il numero delle celle
 * gridContainer il container HTML che contiene la griglia
 */
function printGrid(gridCells = 100, gridContainer = document) {
   board.innerHTML = '';

   for (let i = 1; i <= gridCells; i++) {
      const gridCell = document.createElement('div');
      gridCell.innerHTML = i;
      gridCell.classList.add('board__number');
      // al click aggiungo la classe che mette un altro background-color

      gridCell.addEventListener('click', function () {
         if (!bombs.includes(Number(this.innerHTML))) {
            this.classList.add('board__number-active');
         } else {
            this.classList.add('board__number-accent');
            alert('hai perso la pag verrà ricaricata');
            location.reload();
         }
      });
      gridContainer.append(gridCell);
   }
}

/**
 * funzione che genera un numero random intero nel range di min, max (inclusi)
 */
function getRndInteger(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ==========================
      main
============================ */
const board = document.querySelector('.board');
const playBtn = document.getElementById('play-btn');
const difficulty = document.getElementById('difficulty');
const message = document.getElementById('message');
let gridCells = 100;

playBtn.addEventListener('click', function () {
   // comportamento grafico in base alla difficoltà
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

   // creo un array di 16 bombe univoche
   const bombs = [];

   while (bombs.length < 16) {
      const newNumber = getRndInteger(1, gridCells);
      if (!bombs.includes(newNumber)) {
         bombs.push(newNumber);
      }
   }
   console.log(bombs);
   printGrid(gridCells, board);
});
