const gameField = document.querySelector(".game-field");
const cross = "game-field__item_cross";
const circle = "game-field__item_circle";
const winCondition = {
  1: [
    ["2", "3"],
    ["4", "7"],
    ["5", "9"],
  ],
  2: [
    ["1", "3"],
    ["5", "8"],
  ],
  3: [
    ["1", "2"],
    ["5", "7"],
    ["6", "9"],
  ],
  4: [
    ["1", "7"],
    ["5", "6"],
  ],
  5: [
    ["1", "9"],
    ["4", "6"],
    ["2", "8"],
    ["3", "7"],
  ],
  6: [
    ["4", "5"],
    ["3", "9"],
  ],
  7: [
    ["1", "4"],
    ["3", "5"],
    ["8", "9"],
  ],
  8: [
    ["7", "9"],
    ["2", "5"],
  ],
  9: [
    ["7", "8"],
    ["1", "5"],
    ["3", "6"],
  ],
};
let player = "cross";
let checked = {};

function startGame() {
  gameField.addEventListener("click", (event) => {
    const cell = event.target;
    const cellIndex = event.target.dataset.index;
    if (checked[cellIndex] || cell === gameField) {
      return;
    }
    if (player === "cross") {
      cell.classList.add(cross);
      checked[cellIndex] = "cross";
      player = "circle";
    } else {
      cell.classList.add(circle);
      checked[cellIndex] = "circle";
      player = "cross";
    }
    winCheck(cellIndex);
    console.log("1");
  });
}

function winCheck(cellIndex) {
  const win = winCondition[cellIndex].find((line) =>
    line.every((block) => checked[block] === checked[cellIndex])
  );
  if (win || Object.keys(checked).length === 9) {
    winMessage(win);
  }
}

function winMessage(win) {
  const winMessage = document.createElement("div");
  if (player === "cross") {
    winMessage.innerHTML = "Win player 2, click to start again";
  }
  if (player === "circle") {
    winMessage.innerHTML = "Win player 1, click to start again";
  }
  if (Object.keys(checked).length === 9 && !win) {
    winMessage.innerHTML = "Draw, click to start again";
  }
  document.body.append(winMessage);
  gameField.addEventListener("click", clearField, true);
}

function clearField(event) {
  event.stopPropagation();
  const cells = document.querySelectorAll(".game-field__item");
  cells.forEach((cell) => {
    if (checked[cell.dataset.index] === "cross") {
      cell.classList.remove(cross);
    } else {
      cell.classList.remove(circle);
    }
  });
  checked = {};
  document.body.lastChild.remove();
  gameField.removeEventListener("click", clearField, true);
}

startGame();
