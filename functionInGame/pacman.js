  import { resetInfo, level, countScore } from "./info.js";
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
          if (xr < canvas.width - 42 && xr > 32) {
            xo = xr;
            console.log(xo);
          } else xo = 36;
          if (yr < canvas.height - 16 && yr > 7) {
            yo = yr;
            console.log(yo);
          } else yo = 60;
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

    let foodX = containFood[0].x;
    let foodY = containFood[0].y;



    // if (
    //   foodX <= headX + 10 && foodX > headX && foodY == headY + 10||
    //   foodX <= headX + 10 && foodX >= headX && headY == foodY||
    //   foodY <= headY + 10 && foodY >= headY && headX == foodX ||
    //   foodY <= headY + 10 && foodY > headY && foodX == headX + 10
    // ) {
    //   console.log(`Eating!`);
    //   containFood.pop();
    //   count = 0;

    // }

    if (
      headX < foodX + 2 &&
      headX + 10 > foodX &&
      headY < foodY + 2 &&
      headY + 10 > foodY
  ) {
      console.log(`Eating!`);
      containFood.pop();
      count = 0;
      countScore();
      console.log(containFood);
  }

    window.requestAnimationFrame(pacmanChar);

    if (
      headX <= 32 ||
      headX >= canvas.width - 44 ||
      headY >= canvas.height - 18 ||
      headY <= 6
    ) {
      console.log('death');
      restartGame();
    }
  }

  export function pacmanDirec() {
    addEventListener("keydown", (a) => {
      if (a.key == "a") {
        console.log("a is pressed");
        pacman.vx = -0.5*level;
        pacman.vy = 0;
        direction = "left";
      }
      if (a.key == "w") {
        pacman.vx = 0;
        pacman.vy = -0.5*level;
        direction = "top";
      }
      if (a.key == "s") {
        pacman.vx = 0;
        pacman.vy = 0.5*level;
        direction = "bot";
      }
      if (a.key == "d" || direction == "right") {
        pacman.vx = 0.5*level;
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
