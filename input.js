
"use strict";

class Input {
  constructor(canvas) {
    this.keys = {};
    this.canvas = canvas;

    this.touchDirection = {
      left: false,
      right: false,
      up: false,
      down: false
    };

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

    // Touch controls
    this.setupTouchButtons();
  }

  setupTouchButtons() {
    const directions = ["left", "right", "up", "down"];

    directions.forEach((direction) => {
      const button = document.getElementById("btn-" + direction);

      if (!button) return;

      button.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        this.touchDirection[direction] = true;
        button.setPointerCapture(e.pointerId);
      });

      const release = () => {
        this.touchDirection[direction] = false;
      };

      button.addEventListener("pointerup", release);
      button.addEventListener("pointercancel", release);
      button.addEventListener("lostpointercapture", release);
    });
  }

  isPressed(key) {
    key = key.toLowerCase();

    if (key === "a" || key === "arrowleft") {
      return Boolean(this.keys[key] || this.touchDirection.left);
    }

    if (key === "d" || key === "arrowright") {
      return Boolean(this.keys[key] || this.touchDirection.right);
    }

    if (key === "w" || key === "arrowup") {
      return Boolean(this.keys[key] || this.touchDirection.up);
    }

    if (key === "s" || key === "arrowdown") {
      return Boolean(this.keys[key] || this.touchDirection.down);
    }

    return Boolean(this.keys[key]);
  }
}
