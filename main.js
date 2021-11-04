let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let introPage = document.getElementById('intro-page');
let overPage = document.querySelector('.over-page');
let winPage = document.querySelector('.win-page');

let startBut = document.querySelector('.start-button');
let restartBut = document.getElementById('restart');
let finalScore = document.getElementById('final-score');
let stopAudio = document.querySelector('.audio');

let playerId;
let playerName = document.getElementById('player-name');



let gameScrBack = new Image();
gameScrBack.src = './images/game-screen-background.png'

let goodPoke = new Image();
goodPoke.src = './images/good-pokemon.png'

let music = new Image();
music.src = './images/music.png'

let pika = new Image();
pika.src = './images/pikachu.png'

let pokeSanta = new Image();
pokeSanta.src = './images/poke-santa.png'

let rock = new Image();
rock.src = './images/rock.png'

let santa = new Image();
santa.src = './images/santa-sledge.png'

let scoree = new Image();
scoree.src = './images/score.png'


let scoreeX = 750, scoreeY = 40;
let score = 0;

let intervalId = 0;
let isUp = false;
let isDown = true;
let maxUp = false;
let maxDown = true;

let isGameOver = false;

let move = 2;
let interval = null;
let santaX = 10, santaY = 440;
let rockX = 900, rockY = 430;
let goodX = 820, goodY = 330;
let pikaX = 930;
let pikaY = 230;


let backgroundMusic = new Audio('./audio/background-music.mp3');
let pointsMusic = new Audio('./audio/points-audio.mp3');
let overMusic = new Audio('./audio/over-sound.mp3');
let winMusic = new Audio('./audio/win-sound.mp3'); 
let gameMusic = new Audio('./audio/game-sound.mp3');


let obstacles = [

    {el: rock, x: rockX, y: rockY}, 
    {el: rock, x:  + 300, y: rockY}, 
    {el: rock, x: rockX + 750, y: rockY},
    {el: rock, x: rockX + 1020, y: rockY}, 
    {el: goodPoke, x: goodX, y: goodY},
    {el: goodPoke, x: goodX + 150, y: rockY},
    {el: goodPoke, x: goodX + 500, y: rockY},
    {el: goodPoke, x: goodX + 780, y: rockY},
    {el: pika, x: pikaX, y: pikaY},
    {el: pika, x: pikaX + 200, y: pikaY},
    {el: pika, x: pikaX + 400, y: pikaY},
    {el: pika, x: pikaX + 850, y: pikaY}  
        
]


const beginGame = () => { 
    console.log("Begin game executed")
    overPage.style.display = 'none';
    introPage.style.display = 'none'; 
    canvas.style.display = 'block';
    startBut.style.display = 'none';
    backgroundMusic.pause();
    gameMusic.play();

    gameScreen();
    
}


const gameScreen = () => {

    
        ctx.drawImage(gameScrBack, 0, 0); //this makes Santa jump and max jump
            if(isUp) {
                santaY = 330
            } 
            else if(maxUp) {
                santaY = 230
              
            }
            ctx.drawImage(santa, santaX, santaY);
            
            
        ctx.drawImage(pokeSanta, 30, 10)
        ctx.drawImage(scoree, scoreeX, scoreeY);
        ctx.font = '28px Verdana'
        ctx.fillText(`Score: ${score}`, 795, 120)
        
        
   

        for ( let i = 0; i < obstacles.length; i++) {
            if (obstacles[i].el == rock){
                ctx.drawImage(rock, rockX, rockY)
                rockX -= move -1
            }
            if (obstacles[i].el == goodPoke){
                ctx.drawImage(goodPoke, goodX, rockY)
                goodX -= move +2
            }
            if (obstacles[i].el == pika){
                ctx.drawImage(pika, pikaX, pikaY) 
                pikaX -= move +4
            }
                  
            
            if(rockX + rock.width < 0) {  //keep them showing
                rockX = Math.floor(Math.random() * 50) + canvas.width;
                   
            }

            if(goodX + goodPoke.width < 0) {  //keep them showing
                goodX = Math.floor(Math.random() * 50) + canvas.width;
            }

            if(pikaX + pika.width < 0) {  //keep them showing
                pikaX = Math.floor(Math.random() * 50) + canvas.width;    
            }


            //collision                 
            if(santaX + (santa.width -5) > (rockX + 20) && santaX <= rockX + rock.width && (santaY >= rockY && santaY + santa.height <= rockY + rock.height)) {
                isGameOver = true;
            }
             
            
            // increase score
            if(santaX + santa.width >= goodX && santaX <= goodX + goodPoke.width) { //if santa crosses good poke 
                score++;
                goodX = Math.floor(Math.random() * 1000) + canvas.width;  // poke disappears
                pointsMusic.play();
            }
            if(santaX + santa.width >= pikaX + pika.height && santaX <= pikaX + pika.width) {  
                score += 10;
                pikaX = Math.floor(Math.random() * 1000) + canvas.width; 
                pointsMusic.play();
            }           

        }


        if(isGameOver == false) {
            intervalId = requestAnimationFrame(gameScreen)
        }

        if(isGameOver) {
            cancelAnimationFrame(intervalId);
            showGameOver(); //to do 
        }
        
        if(score >= 100) {
            cancelAnimationFrame(intervalId);
            showWin(); //to do 
        }

}

const showGameOver = () => { 

    if(isGameOver) {
        backgroundMusic.pause();
        gameMusic.pause();
        overMusic.play()
        overMusic.volume = 0.2;
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        canvas.style.display = 'none'
        overPage.style.display = 'flex'
        
    }


}


const showWin = () => {
    canvas.style.display = 'none';
    winPage.style.display = 'flex';
    backgroundMusic.pause();
    gameMusic.pause();
    winMusic.play()
    winMusic.volune = 0.5;
    playerName.innerHTML = playerId;
    finalScore.innerHTML = score;

}

//1st step
window.onload = () => {
    
    canvas.style.display = 'none';
    overPage.style.display = 'none';
    winPage.style.display = 'none';
    
    
    

    startBut.addEventListener('click', () => { 
        playerId = document.getElementById('player-name').value;
        beginGame(); 
    });

    stopAudio.addEventListener('click', () => {
       backgroundMusic.play();
       backgroundMusic.volume = 0.2;
       
    })

    document.addEventListener('keydown', (event) => {
       
        if( event.key == 'ArrowUp' ) {
            isUp = true;
            isDown = false;
        }

        
        if( event.key == ' ') {
            maxUp = true;
            maxDown = false;
        }
                
    });

    document.addEventListener('keyup', (event) => {
        isUp = false;
        isDown = false;
        maxUp = false;
        maxDown = false;
        santaY = 430 //santa needs to go back to its initial position
    });

    restartBut.addEventListener('click', () => {
        santaX = 10;
        score = 0;
        rockX = 900;
        isGameOver = false;        
        beginGame();
        
    });
}


