import { resetInfo } from "./info.js";
import { drawWall } from "./wall.js";

export const canvas = document.querySelector(".container canvas");
export const ctx = canvas.getContext("2d");

let containFood = [];
let direction = "right";
const color = ["#00FFFF", "#FFFF00", "#FF0000", "#00FF00"];

const pacman = {
  x: 37,
  y: 15,
  vx: 0.5,
  vy: 0,
  id: 0,
  color: "#FFFF33",
  draw() {
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, 10, 10);
    ctx.fillStyle = this.color;
    ctx.closePath();
  },
};

/********************************************************************************/
let count = 0;
function generateFood() {
  count++;
  // console.log(count);
  if (count == 1) {
    const xr = Math.random() * canvas.width;
    const yr = Math.random() * canvas.height;
    let xo, yo;
    if (xr != undefined && yr != undefined) {
      if (xr < canvas.width - 42 && xr > 32) {
        xo = xr;
        console.log(xo);
      }
      if (yr < canvas.height - 16 && yr > 7) {
        yo = yr;
        console.log(yo);
      }
      if (containFood.length == 0) {
        const food = {
          x: xo,
          y: yo,
          draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, true);
            ctx.fillStyle = "#FFFF33";
            ctx.fill();
          },
        };
        containFood.push(food);
        console.log(`Food was added: ${containFood.length}`);
        return count;
      }
      console.log(containFood);
    }
  }
}

export function pacmanChar() {
  let headX = pacman.x;
  let headY = pacman.y;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pacman.x += pacman.vx;
  pacman.y += pacman.vy;
  
  pacman.draw();
  drawWall();
  generateFood();
  containFood[0].draw();
  console.log(containFood[0].x);
  let foodX = containFood[0].x;
  let foodY = containFood[0].y;
  
  if (
    containFood[0].x <= headY + 10 && containFood[0].x > headY && containFood[0].y == headX + 10||
    containFood[0].x <= headY + 10 && containFood[0].x >= headY && headX == containFood[0].y ||
    containFood[0].y <= headX + 10 && containFood[0].y >= headX && headY == containFood[0].x ||
    containFood[0].y <= headX + 10 && containFood[0].y > headX && containFood[0].x == headY + 10
  ) {
    console.log(`Eating!`);
    containFood.pop();
    count = 0;

  }

  window.requestAnimationFrame(pacmanChar);

  if (
    headX == 32 ||
    headX == canvas.width - 42 ||
    headY == canvas.height - 16 ||
    headY == 6
  ) {
    restartGame();
  }
}

export function pacmanDirec() {
  addEventListener("keydown", (a) => {
    if (a.key == "a") {
      console.log("a is pressed");
      pacman.vx = -0.5;
      pacman.vy = 0;
      direction = "left";
    }
    if (a.key == "w") {
      pacman.vx = 0;
      pacman.vy = -0.5;
      direction = "top";
    }
    if (a.key == "s") {
      pacman.vx = 0;
      pacman.vy = 0.5;
      direction = "bot";
    }
    if (a.key == "d" || direction == "right") {
      pacman.vx = 0.5;
      pacman.vy = 0;
    }
  });
}

function restartGame() {
  pacman.x = 37;
  pacman.y = 15;
  resetInfo();
  count = 0;
  containFood = [];
}
