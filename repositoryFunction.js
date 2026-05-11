import { Player } from "./repositoryObject.js";

export function selectSymbol(symbol, namePlayer1, namePlayer2) {
  let player1, player2;
  if (symbol === "X") {
    player1 = new Player("X", namePlayer1, 0);
    player2 = new Player("O", namePlayer2, 0);
  } else {
    player1 = new Player("O", namePlayer1, 0);
    player2 = new Player("X", namePlayer2, 0);
  }

  return { player1, player2 };
}

export function chooseAlea(player1, player2) {
  if (Math.random() < 0.5) {
    return player1;
  } else {
    return player2;
  }
}

//.some = vérifie si au moins une combinaison est gagnante
//.every = vérifie si tous les index d'une combinaison ont le même symbole
export function checkWin(board, currentPlayer) {
  const comboWin = [
    [0, 1, 2], //lignes
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], //colonnes
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], //diagonales
    [2, 4, 6],
  ];
  return comboWin.some((combo) => combo.every((index) => board[index] === currentPlayer.symbole));
}

export function checkDraw(board) {
  return board.every((cell) => cell !== "");
}

export function resetGame() {
  return ["", "", "", "", "", "", "", "", ""];
}
