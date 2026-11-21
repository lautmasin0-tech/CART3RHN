
"use strict";

class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");

    if (!this.ctx) {
      throw new Error("Canvas initialization failed.");
    }

    this.input = new Input(this.canvas);
    this.player = new Player();

    this.enemies = [];
    this.score = 0;
    this.level = 1;
    this.running = false;
    this.lastTime = 0;
    this.spawnTimer = 0;
  }

  start() {
    if (this.running) return;

    this.player = new Player();
    this.enemies = [];
    this.score = 0;
    this.level = 1;
    this.spawnTimer = 0;
    this.lastTime = 0;
    this.running = true;

    document.getElementById("message").textContent = "SURVIVE!";

    requestAnimationFrame((t) => this.loop(t));
  }

  update(delta) {
    this.player.update(this.input, delta);
    this.spawnTimer += delta;

    const interval = Math.max(
      300,
      CONFIG.SPAWN_INTERVAL - this.level * 50
    );

    if (this.spawnTimer >= interval) {
      this.enemies.push(new Enemy(this.level));
      this.spawnTimer = 0;
    }

    for (const enemy of this.enemies) {
      enemy.update(delta);

      const distance = Math.hypot(
        enemy.x - this.player.x,
        enemy.y - this.player.y
      );

      if (distance < enemy.radius + this.player.radius) {
        this.end();
        return;
      }
    }

    this.enemies = this.enemies.filter((enemy) => {
      if (enemy.y > CONFIG.HEIGHT + 20) {
        this.score += 10;
        return false;
      }
      return true;
    });

    this.level = Math.floor(this.score / 100) + 1;

    document.getElementById("score").textContent = this.score;
    document.getElementById("level").textContent = this.level;
  }

  draw() {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);

    ctx.fillStyle = "#555";

    for (let i = 0; i < 50; i++) {
      ctx.fillRect(
        (i * 137) % CONFIG.WIDTH,
        (i * 79) % CONFIG.HEIGHT,
        2,
        2
      );
    }

    this.player.draw(ctx);

    for (const enemy of this.enemies) {
      enemy.draw(ctx);
    }
  }

  loop(time) {
    if (!this.running) return;

    try {
      const delta = this.lastTime
        ? Math.min(time - this.lastTime, CONFIG.MAX_DELTA)
        : 16.67;

      this.lastTime = time;

      this.update(delta);
      this.draw();

      if (this.running) {
        requestAnimationFrame((t) => this.loop(t));
      }
    } catch (error) {
      console.error("Game error:", error);
      this.end("SYSTEM ERROR");
    }
  }

  end(message = "GAME OVER") {
    this.running = false;

    document.getElementById("message").textContent =
      message + " | SCORE: " + this.score;
  }
}
