
"use strict";

class Enemy {
  constructor(level = 1) {
    this.x = Math.random() *
      (CONFIG.WIDTH - 30) + 15;

    this.y = -20;
    this.radius = CONFIG.ENEMY_RADIUS;

    this.speed = CONFIG.ENEMY_SPEED +
      Math.random() * 2 + level * 0.3;
  }

  update(delta) {
    this.y += this.speed * delta / 16.67;
  }

  draw(ctx) {
    ctx.save();

    ctx.fillStyle = CONFIG.COLORS.ENEMY;
    ctx.shadowColor = "red";
    ctx.shadowBlur = 15;

    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2
    );

    ctx.fill();
    ctx.restore();
  }
}
