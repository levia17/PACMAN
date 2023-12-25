import { ctx, canvas } from "./pacman.js";

export function drawWall() {
  // //wall in top
  // ctx.beginPath();
  // ctx.rect(5,5, canvas.width - 10, 5);
  // ctx.stroke();
  // ctx.strokeStyle = '#2916F5';
  // ctx.closePath();

  // //wall in bot
  // ctx.beginPath();
  // ctx.rect(5,canvas.height - 10, canvas.width - 10, 5);
  // ctx.stroke();
  // ctx.strokeStyle = '#2916F5';
  // ctx.closePath();

  // //wall in left
  // ctx.beginPath();
  // ctx.rect(5,5,5, canvas.height - 10);
  // ctx.stroke();
  // ctx.strokeStyle = '#2916F5';
  // ctx.closePath();

  // //wall in right
  // ctx.beginPath();
  // ctx.rect(5,canvas.height - 10,5, canvas.height - 10);
  // ctx.stroke();
  // ctx.strokeStyle = '#2916F5';
  // ctx.closePath();

//   ctx.beginPath();
//   ctx.lineWidth = 1;
//   ctx.moveTo(28, 2);
//   ctx.lineTo(canvas.width - 28, 2);
//   ctx.lineTo(canvas.width - 28, canvas.height - 2);
//   ctx.lineTo(28, canvas.height - 2);
//   ctx.lineTo(28, 2);
//   ctx.stroke();
//   ctx.strokeStyle = "#2916F5";

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo(32, 6);
  ctx.lineTo(canvas.width - 32, 6);
  ctx.lineTo(canvas.width - 32, canvas.height - 6);
  ctx.lineTo(32, canvas.height - 6);
  ctx.lineTo(32, 6);
  ctx.stroke();
  ctx.strokeStyle = "#2916F5";
}
