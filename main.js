

let count = 0;

//Enemy

// Info InGame
import { countTime } from "./functionInGame/info.js";

//Create Character, Movement
import { pacmanChar } from "./functionInGame/pacman.js";

//Wall
import { drawWall } from "./functionInGame/wall.js";

function clickToStart(){
    document.querySelector('.container .overlay').setAttribute('class', 'overlay_afterclick');
    document.querySelector('.container .overlayText').setAttribute('class', 'overlay_afterclick');
}

// document.querySelector('body').addEventListener('click',()=>{
    count = 1;
    console.log(count);
    if(count == 1){
        //Info InGame
        countTime();

        //Create Character
        pacmanChar();

        //Movement
        // pacmanDirec();
        clickToStart();
    }
// })
drawWall();