import { resetInfo, level, countScore } from "./info.js";
import { drawWall } from "./wall.js";


export const canvas = document.querySelector(".container canvas");
export const ctx = canvas.getContext("2d");



let containFood = [];
let direction = "right";
let pauseGameVar = 0;
const color = ["#00FFFF", "#FFFF00", "#FF0000", "#00FF00"];

const pacman = {
  x: 37,
  y: 15,
  vx: 0.5,
  vy: 0,
  id: 0,
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "#FFFF33";
    ctx.fillRect(this.x, this.y, 10, 10);
    // ctx.closePath();
  },
};

const ghost = {
  x: Math.random()*canvas.width,
  y: Math.random()*canvas.height,
  vx: 0,
  vy: 0,
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "#FF0000";
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
  },
};

// /********************************************************************************/
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
        color: "#FFFF33",
        draw() {
          ctx.beginPath();
          ctx.fillStyle = this.color;
          ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, true);
          ctx.fill();
          ctx.closePath();
        },
      };
      containFood.push(food);
      console.log(`Food was added: ${containFood.length}`);
      return count;
    }
    console.log(containFood[0]);
  }
}

export function pacmanChar() {
  // PACMAN
  const headX = pacman.x;
  const headY = pacman.y;
  
  // Clear all canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  pacman.x += pacman.vx;
  pacman.y += pacman.vy;

  pacman.draw();
  drawWall();
  generateFood();
  containFood[0].draw();
  pacmanDirec();


  
  const foodX = containFood[0].x;
  const foodY = containFood[0].y;
  
  // ENEMY
  // The enemy's position
    ghost.x += ghost.vx;
    ghost.y += ghost.vy;
    
    const dx = pacman.x - ghost.x;
    const dy = pacman.y - ghost.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // the enemy's vector v
    ghost.vx = (dx / distance) * 0.3 * level;
    ghost.vy = (dy / distance) * 0.3 * level;
    // console.log(distance);
  
  ghost.draw();
  
  window.requestAnimationFrame(pacmanChar);
  if (
    (headX <= ghost.x + 5 &&
      headX + 15 >= ghost.x &&
      headY <= ghost.y + 5 &&
      headY + 15   >= ghost.y) ||
    headX <= 32 ||
    headX >= canvas.width - 44 ||
    headY >= canvas.height - 18 ||
    headY <= 6
  ) {
    pacman.vx = 0;
    pacman.vy = 0;
    ghost.vx = 0;
    ghost.vy = 0;
    gameOver();
    cancelAnimationFrame(pacmanChar);
    // restartGame();
  }
  // console.log(pauseGameVar);
  // setTimeout(() => {
  //   window.requestAnimationFrame(pacmanChar);
  // }, 10000 / 200); // Giảm tần suất cập nhật frame xuống 10 FPS
  //Event eating
  if (
    headX < foodX + 2 &&
    headX + 10 > foodX &&
    headY < foodY + 2 &&
    headY + 10 > foodY
  ) {
    // console.log(`Eating!`);
    containFood.pop();
    count = 0;
    countScore();
    console.log(containFood);
  }

  // Boundary
}

function pacmanDirec() {
  addEventListener("keydown", (a) => {
    if (a.key == "a") {
      console.log("a is pressed");
      pacman.vx = -0.5 * level;
      pacman.vy = 0;
      direction = "left";
    }
    if (a.key == "w") {
      pacman.vx = 0;
      pacman.vy = -0.5 * level;
      direction = "top";
    }
    if (a.key == "s") {
      pacman.vx = 0;
      pacman.vy = 0.5 * level;
      direction = "bot";
    }
    if (a.key == "d" || direction == "right") {
      pacman.vx = 0.5 * level;
      pacman.vy = 0;
    }
  });
}

// function gameOver(){
//   document.querySelector('.container .beforeOG').setAttribute('class', 'overGame');
// }


function gameOver() {
  document.querySelector('.container .beforeOG').setAttribute('class', 'overGame');
  setTimeout(location.reload(), 3000);
}


// Q-learning parameters
const learningRate = 0.1;
const discountFactor = 0.9;
const explorationRate = 0.1;

// Q-values for each state-action pair
let QValues = {};

// Function to choose an action based on Q-values
function chooseAction(state) {
  if (Math.random() < explorationRate || !QValues[state]) {
    return Math.floor(Math.random() * 4); // Explore (random action)
  } else {
    const values = QValues[state];
    return values.indexOf(Math.max(...values)); // Exploit (greedy action)
  }
}

// Function to update Q-values based on the Q-learning update rule
function updateQValues(state, action, reward, nextState) {
  QValues[state] = QValues[state] || [0, 0, 0, 0];
  QValues[nextState] = QValues[nextState] || [0, 0, 0, 0];

  const currentQ = QValues[state][action];
  const maxNextQ = Math.max(...QValues[nextState]);

  QValues[state][action] =
    currentQ + learningRate * (reward + discountFactor * maxNextQ - currentQ);
}

// Function to take an action in the RL environment
function takeRLAction(action) {
  switch (action) {
    case 0: // Move left
      pacman.vx = -0.5;
      pacman.vy = 0;
      break;
    case 1: // Move up
      pacman.vx = 0;
      pacman.vy = -0.5;
      break;
    case 2: // Move right
      pacman.vx = 0.5;
      pacman.vy = 0;
      break;
    case 3: // Move down
      pacman.vx = 0;
      pacman.vy = 0.5;
      break;
  }
}

// Function to get the current state of the RL environment
function getRLState() {
  if (containFood.length > 0) {
    return `${pacman.x.toFixed(1)}_${pacman.y.toFixed(1)}_${ghost.x.toFixed(1)}_${ghost.y.toFixed(1)}_${containFood[0].x.toFixed(1)}_${containFood[0].y.toFixed(1)}`;
  } else {
    return `${pacman.x.toFixed(1)}_${pacman.y.toFixed(1)}_${ghost.x.toFixed(1)}_${ghost.y.toFixed(1)}_0_0`;
  }
}

// Function to load Q-values from LocalStorage
function loadQValues() {
  const storedQValues = localStorage.getItem("pacmanQValues");
  if (storedQValues) {
    QValues = JSON.parse(storedQValues);
  }
}

// Function to save Q-values to LocalStorage
function saveQValues() {
  localStorage.setItem("pacmanQValues", JSON.stringify(QValues));
}
// Function to load Q-values from the server
// async function loadQValues() {
//   try {
//     const response = await fetch("http://localhost:3000/loadQValues");
//     const data = await response.json();

//     if (data.success) {
//       QValues = data.values;
//     }
//   } catch (error) {
//     console.error("Error loading Q-values:", error);
//   }
// }

// // Function to save Q-values to the server
// async function saveQValues() {
//   try {
//     const response = await fetch("http://localhost:3000/saveQValues", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ values: QValues }),
//     });

//     const data = await response.json();

//     if (!data.success) {
//       console.error("Error saving Q-values:", data.error);
//     }
//   } catch (error) {
//     console.error("Error saving Q-values:", error);
//   }
// }


// Load Q-values when the script starts
loadQValues();

// Function to execute the RL game loop
function gameLoopRL() {
  const currentState = getRLState();
  const action = chooseAction(currentState);
  takeRLAction(action);

  // Reward function (customize based on game logic)
  const reward = 0;

  // Update Q-values
  const nextState = getRLState();
  updateQValues(currentState, action, reward, nextState);

  // Save Q-values to LocalStorage
  saveQValues();

  // Continue with the rest of your game loop code
  pacmanChar();

  // Giới hạn vận tốc của Pacman trong môi trường RL
  pacman.vx = Math.min(0.5, Math.max(-0.5, pacman.vx));
  pacman.vy = Math.min(0.5, Math.max(-0.5, pacman.vy));

  // Use setTimeout to control the frame rate
  setTimeout(() => {
    window.requestAnimationFrame(gameLoopRL);
  }, 1000 / 10); // Giảm tần suất cập nhật frame xuống 10 FPS
}

// Start the RL game loop
gameLoopRL(); 

