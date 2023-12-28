let count = 0;

// Info InGame
import { countScore, countTime } from "./functionInGame/info.js";

//Create Character, Movement
import { pacmanChar, pacmanDirec } from "./functionInGame/pacman.js";

//Wall
import { drawWall } from "./functionInGame/wall.js";

function clickToStart(){
    document.querySelector('.container .overlay').setAttribute('class', 'overlay_afterclick');
    document.querySelector('.container .overlayText').setAttribute('class', 'overlay_afterclick');
}

document.querySelector('body').addEventListener('click',()=>{
    count++;
    console.log(count);
    if(count == 1){
        //Info InGa,e
        countTime();

        //Create Character
        pacmanChar();

        //Movement
        pacmanDirec();
        clickToStart();
    }
})
drawWall();