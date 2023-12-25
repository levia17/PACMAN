let count = 0;

// Info InGame
import { countScore, countTime } from "./functionInGame/info.js";

//Create Character, Movement
import { pacmanChar, pacmanDirec } from "./functionInGame/pacman.js";

//Wall
import { drawWall } from "./functionInGame/wall.js";



document.querySelector('body').addEventListener('click',()=>{
    count++;
    if(count == 1){
        //Info InGa,e
        countScore();
        countTime();

        //Create Character
        pacmanChar();

        //Movement
        pacmanDirec();

    }
})
drawWall();