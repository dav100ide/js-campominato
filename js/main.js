'use strict';
/* ==========================
      functions
============================ */
/**
 * funzione che crea il campo da gioco
 * cellsNumber il numero delle celle
 * gridContainer il container HTML che contiene la griglia
 */
function printGrid(cellsNumber = 100, gridContainer = document) {
   board.innerHTML = '';

   for (let i = 1; i <= cellsNumber; i++) {
      const gridCell = document.createElement('div');
      gridCell.innerHTML = i;
      gridCell.classList.add('board__number');
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
let cellsNumber;

playBtn.addEventListener('click', function () {
   // comportamento griglia in base alla difficoltà
   if (difficulty.value === 'hard') {
      cellsNumber = 49;
      document.documentElement.style.setProperty('--col-number', '7');
   } else if (difficulty.value === 'medium') {
      cellsNumber = 81;
      document.documentElement.style.setProperty('--col-number', '9');
   } else if (difficulty.value === 'easy') {
      cellsNumber = 100;
      document.documentElement.style.setProperty('--col-number', '10');
   }

   // creo un array di 16 numeri casuali senza i doppioni
   const bombs = [];
   while (bombs.length < 16) {
      const newNumber = getRndInteger(1, cellsNumber);
      if (!bombs.includes(newNumber)) {
         bombs.push(newNumber);
      }
   }
   console.log(bombs);

   // stampo la griglia gioco
   printGrid(cellsNumber, board);
   // seleziono tutte le celle
   const cells = document.querySelectorAll('.board__number');
   // aggiungo tutte le celle hanno un evento click
   for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', function () {
         console.log(this.innerHTML);
      });
   }
});
