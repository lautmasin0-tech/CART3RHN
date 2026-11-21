
"use strict";

class Input {
  constructor(canvas) {
    this.keys = {};
    this.canvas = canvas;
    this.touching = false;

    // Keyboard controls
    window.addEventListener("keydown", (e) => {
      const key = e.key.toLowerCase();

      this.keys[key] = true;

      if (key.startsWith("arrow")) {
        e.preventDefault();
      }
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });

    // Mobile touch controls
    this.canvas.addEventListener("pointerdown", () => {
      this.touching = true;
    });

    this.canvas.addEventListener("pointerup", () => {
      this.touching = false;
    });

    this.canvas.addEventListener("pointercancel", () => {
      this.touching = false;
    });
  }

  isPressed(key) {
    return Boolean(this.keys[key.toLowerCase()]);
  }
}
