
"use strict";

class Player {
  constructor() {
    this.x = CONFIG.WIDTH / 2;
    this.y = CONFIG.HEIGHT - 60;

    this.radius = CONFIG.PLAYER_RADIUS;
    this.speed = CONFIG.PLAYER_SPEED;
  }

  update(input, delta) {
    const movement = this.speed * delta / 16.67;

    if (input.isPressed("arrowleft") ||
        input.isPressed("a")) {
      this.x -= movement;
    }

    if (input.isPressed("arrowright") ||
        input.isPressed("d")) {
      this.x += movement;
    }

    if (input.isPressed("arrowup") ||
        input.isPressed("w")) {
      this.y -= movement;
    }

    if (input.isPressed("arrowdown") ||
        input.isPressed("s")) {
      this.y += movement;
    }

    this.x = Math.max(
      this.radius,
      Math.min(CONFIG.WIDTH - this.radius, this.x)
    );

    this.y = Math.max(
      this.radius,
      Math.min(CONFIG.HEIGHT - this.radius, this.y)
    );
  }

  draw(ctx) {
    ctx.save();

    ctx.fillStyle = CONFIG.COLORS.PLAYER;
    ctx.shadowColor = CONFIG.COLORS.PLAYER;
    ctx.shadowBlur = 20;

    ctx.beginPath();
    ctx.moveTo(this.x, this.y - 20);
    ctx.lineTo(this.x - 15, this.y + 15);
    ctx.lineTo(this.x + 15, this.y + 15);
    ctx.closePath();

    ctx.fill();
    ctx.restore();
  }
}
