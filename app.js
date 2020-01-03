let colorDisplay = document.querySelector("#colorDisplay");
let resetBtn = document.querySelector("#reset");
let modeBtns = document.querySelectorAll(".mode");
let squares = document.querySelectorAll(".square");
let message = document.querySelector("#message");
let h1 = document.querySelector("h1");

let targetColor;
let numSquares = 6;

function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function GenerateRandomColor() {
  let r = RandomInt(0, 256);
  let g = RandomInt(0, 256);
  let b = RandomInt(0, 256);
  let color = "rgb(" + r + ", " + g + ", " + b + ")";
  return color;
}

function Winning() {
  for (let i = 0; i < numSquares; ++i) {
    squares[i].style.backgroundColor = targetColor;
    squares[i].style.visibility = "visible";
    h1.style.backgroundColor = targetColor;
    message.innerHTML = "CORRECT";
  }
}

function Reset() {
  targetColor = GenerateRandomColor();
  SetupSquares();
  SetupUi();
}

function SetupButtons() {
  for (let i = 0; i < modeBtns.length; ++i) {
    modeBtns[i].addEventListener("click", function() {
      modeBtns[0].classList.remove("selected");
      modeBtns[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? (numSquares = 3) : (numSquares = 6);
      Reset();
    });
  }
}

function SetupSquares() {
  for (let i = 0; i < squares.length; ++i) {
    squares[i].style.visibility = "hidden";
  }
  let targetIndex = RandomInt(0, numSquares);
  for (let i = 0; i < numSquares; ++i) {
    squares[i].style.visibility = "visible";
    i != targetIndex
      ? (squares[i].style.backgroundColor = GenerateRandomColor())
      : (squares[i].style.backgroundColor = targetColor);

    squares[i].addEventListener("click", function() {
      this.style.visibility = "hidden";
      if (this.style.backgroundColor == targetColor) {
        Winning();
      } else {
        message.innerHTML = "Try Again";
      }
    });
  }
}

function SetupUi() {
  h1.style.backgroundColor = "#ef913f";
  message.innerHTML = "";
  colorDisplay.innerHTML = targetColor;
}

function Init() {
  SetupButtons();
  Reset();
}

resetBtn.addEventListener("click", event => {
  Reset();
});

document.addEventListener("DOMContentLoaded", function(event) {
  Init();
});
