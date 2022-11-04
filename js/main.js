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

playBtn.addEventListener('click', function () {
   let cellsNumber;
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

   // stampo la griglia gioco
   printGrid(cellsNumber, board);
   // seleziono tutte le celle
   const cells = document.querySelectorAll('.board__number');
   // aggiungo a TUTTE le celle un evento click
   const numbersClicked = [];
   for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', function () {
         const clickedNumber = Number(this.innerHTML);
         // calpesto la bomba
         if (bombs.includes(clickedNumber)) {
            this.classList.add('board__number-accent');
            alert('bombaaa hai perso (defeat)');
         } else if (!bombs.includes(clickedNumber)) {
            this.classList.add('board__number-active');
            numbersClicked.push(clickedNumber);
         }
         // verifico se l'utente ha vinto
         if (cellsNumber === numbersClicked.length - bombs.length) {
            alert('hai terminato il gioco bravo');
         }
      });
   }
   console.log(bombs);
   console.log('cliccati:', numbersClicked); // pk non pusha i clickedNumber
});
