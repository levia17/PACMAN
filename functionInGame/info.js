let score = 0;
let level = 0;
let time = 0;

document.querySelector(".score .info").innerHTML = score;
document.querySelector(".level .info").innerHTML = level;
document.querySelector(".time .info").innerHTML = time;

export function countScore() {
  document.querySelector(".score").addEventListener("click", () => {
    score += 1;
    // console.log(score);
    document.querySelector(".score .info").innerHTML = score;
    countLevel();
  });
  return score;
}

function countLevel() {
  if (score !== 0 && score % 5 === 0) {
    level += 1;
    document.querySelector(".level .info").innerHTML = level;
  }
}

export function countTime(){
  setInterval(() => {
    time += 0.1;
    if (time != 0 && time.toFixed(1) % 1 == 0) {
      document.querySelector(".time .info").innerHTML = time.toFixed(0);
    }
  }, 100);
}
