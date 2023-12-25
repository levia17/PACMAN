export const canvas = document.querySelector(".container canvas");
export const ctx = canvas.getContext("2d");
import { drawWall } from "./wall.js";


const pacman = {
  x: 10,
  y: 10,
  vx: 0.5,
  vy: 0,
  id: 0,
  color: '#FFFF33',
  draw(){
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, 10, 10);
    ctx.fillStyle = this.color;
    ctx.closePath();
  }
};

/********************************************************************************/

export function pacmanChar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pacman.x += pacman.vx;
  pacman.y += pacman.vy;
  pacman.draw();
  drawWall()
  window.requestAnimationFrame(pacmanChar);
}


export function pacmanDirec() {
  addEventListener("keydown", (a) => {
    if (a.key == "a") {
      console.log("a is pressed");
      pacman.vx = -0.5;
      pacman.vy = 0;
    }
    if (a.key == "w") {
      pacman.vx = 0;
      pacman.vy = -0.5;
    }
    if (a.key == "s") {
      pacman.vx = 0;
      pacman.vy = 0.5;
    }
    if (a.key == "d") {
      pacman.vx = 0.5;
      pacman.vy = 0;
    }
  });
}
