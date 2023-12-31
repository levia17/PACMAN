export let score = 0;
export let level = 1;
export let time = 0;
let pauseVar = 2;

document.querySelector(".score .info").innerHTML = score;
document.querySelector(".level .info").innerHTML = level;
document.querySelector(".time .info").innerHTML = time;

export function countScore() {
    score += 1;
    // console.log(score);
    document.querySelector(".score .info").innerHTML = score;
    countLevel();
  return score;
}

function countLevel() {
  if (score !== 0 && score % 5 === 0) {
    level += 1;
    document.querySelector(".level .info").innerHTML = level;
  }
  return level;
}

export function countTime(){
  setInterval(() => {
      time += 0.1;
      if (time != 0 && time.toFixed(1) % 1 == 0) {
        document.querySelector(".time .info").innerHTML = time.toFixed(0);
      }
  }, 100);
}

export function resetInfo(){
  score = 0;
  level = 1;
  time = 0;
  document.querySelector(".score .info").innerHTML = 0;
document.querySelector(".level .info").innerHTML = 1;
document.querySelector(".time .info").innerHTML = 0;

}


export function pause(){
  document.querySelector('.container canvas').setAttribute('class', 'hidden');
}

document.querySelector('.btnRestart').addEventListener('click', ()=>{
  location.reload();
})