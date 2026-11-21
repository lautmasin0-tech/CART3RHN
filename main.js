
"use strict";

window.addEventListener("load", () => {
  try {
    const game = new Game();

    const button = document.getElementById("startButton");

    button.addEventListener("click", () => {
      game.start();
    });

    window.cart3rGame = game;

  } catch (error) {
    console.error("CART3RHN ERROR:", error);
    alert("GAME ERROR: " + error.message);
  }
});

