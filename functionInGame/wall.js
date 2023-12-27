import { ctx, canvas } from "./pacman.js";

export function drawWall() {
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
