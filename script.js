import { Player } from "./repositoryObject.js";
import { selectSymbol, chooseAlea, checkWin, checkDraw, resetGame } from "./repositoryFunction.js";

const gameZone = document.querySelector("#game-zone");

const modal = document.querySelector("#modal");

const symboleX = document.querySelector("#btn-X");

const symboleO = document.querySelector("#btn-O");

const start = document.querySelector("#btn-start");

const error = document.querySelector("#msg-error");

const win = document.querySelector("#msg-win");

const resetBtn = document.querySelector("#btn-reset");

let player1;
let player2;

let gameOver = false;

//Tableau de jeu = 3 lignes/ 3 colonnes
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;

//Boucles sur une indexation de 0 à 8
for (let i = 0; i <= 8; i++) {
  const caseGame = document.createElement("div"); //Création d'un élément
  caseGame.classList.add("caseGameZone"); // Ajout d'une classe
  caseGame.dataset.index = i; // Création d'un inddex. Attribut "dataset.index" = expose une carte de chaînes de caractères avec une entrée pour chaque attribut data-*.
  gameZone.appendChild(caseGame); // Insersion & rattachement dans l'élément sélectionner
}

//Activation du modale
modal.classList.add("active");

let selectedSymbol = null;
//Ecouteurs des boutons X & O
symboleX.addEventListener("click", () => {
  selectedSymbol = "X";
});

symboleO.addEventListener("click", () => {
  selectedSymbol = "O";
});
start.addEventListener("click", () => {
  const namePlayer1 = document.querySelector("#player1").value;
  const namePlayer2 = document.querySelector("#player2").value;

  //Rappel de la fonction du répertoire + vérification préalable
  if (!selectedSymbol) {
    error.textContent = "Veuillez choisir un symbole avant de commencer !";
    return;
  }
  ({ player1, player2 } = selectSymbol(selectedSymbol, namePlayer1, namePlayer2));
  //Choix aléatoire du joueur débutant la partie
  currentPlayer = chooseAlea(player1, player2);
  // Cacher la modale
  modal.classList.remove("active");
});

document.querySelectorAll(".caseGameZone").forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (gameOver) return;

    // case libre → marquer
    if (board[index] === "") {
      board[index] = currentPlayer.symbole;
      e.target.textContent = currentPlayer.symbole;
      e.target.classList.add("jouee");
      error.textContent = "";

      if (checkWin(board, currentPlayer)) {
        win.textContent = `${currentPlayer.name} a gagné !`;
        gameOver = true;
        return;
      }
      // Match nul
      if (checkDraw(board)) {
        win.textContent = "Match nul, on recommence ?";
        gameOver = true;
        return;
      }

      //Changement de joueur
      if (currentPlayer === player1) {
        currentPlayer = player2;
      } else {
        currentPlayer = player1;
      }
    } else {
      // case prise → message

      error.textContent = "Cette case est déjà prise par un symbole, rejoue sur une autre case !";
    }
  });
});

resetBtn.addEventListener("click", () => {
  //Réinitialiser le tableau via la fonction pure
  board = resetGame();

  //Vider les cases
  document.querySelectorAll(".caseGameZone").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("jouee");
  });

  //Remise à 0 des messages
  win.textContent = "";
  error.textContent = "";

  //Relancer la partie = nouveau joueur aléatoire
  gameOver = false;
  currentPlayer = chooseAlea(player1, player2);
});
