let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let introPage = document.getElementById('intro-page');
let overPage = document.querySelector('.over-page');
let winPage = document.querySelector('.win-page');

let startBut = document.querySelector('.start-button');
let restartBut = document.getElementById('restart');



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

let move = 8;
let interval = null;
let santaX = 10, santaY = 440;
let rockX = 900, rockY = 430;
let goodX = 820
let pikaX = 930
let pikaY = 230 

let backgroundMusic = new Audio('./audio/background-music.mp3');
let pointsMusic = new Audio();
let overMusic = new Audio();
let winMusic = new Audio(); 

let obstacles = [

    {el: rock, x: rockX, y: rockY}, 
    {el: goodPoke, x: goodX, y: rockY},
    {el: pika, x: pikaX, y: pikaY}  
        
]


const beginGame = () => { 
    console.log("Begin game executed")
    overPage.style.display = 'none';
    introPage.style.display = 'none'; 
    canvas.style.display = 'block';
    startBut.style.display = 'none';
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
                // ctx.drawImage(rock, rockX + 300, rockY)
                // ctx.drawImage(rock, rockX + 750, rockY)
                // ctx.drawImage(rock, rockX + 1020, rockY)
                rockX -= move
            }
            if (obstacles[i].el == goodPoke){
                ctx.drawImage(goodPoke, goodX, rockY)
                // ctx.drawImage(goodPoke, goodX + 150, rockY)
                // ctx.drawImage(goodPoke, goodX + 500, rockY)
                // ctx.drawImage(goodPoke, goodX + 780, rockY)
                goodX -= move +2
            }
            if (obstacles[i].el == pika){
                ctx.drawImage(pika, pikaX, pikaY)
                // ctx.drawImage(pika, pikaX + 200, pikaY)
                // ctx.drawImage(pika, pikaX + 200, pikaY)
                // ctx.drawImage(pika, pikaX + 200, pikaY)
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
            }
            if(santaX + santa.width >= pikaX + pika.height && santaX <= pikaX + pika.width) {  
                score += 10;
                pikaX = Math.floor(Math.random() * 1000) + canvas.width; 
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
        // backgroundMusic.pause() -----> take care of this
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        canvas.style.display = 'none'
        overPage.style.display = 'flex'
        
    }


}

const showWin = () => {
    canvas.style.display = 'none'
    winPage.style.display = 'flex'
}

//1st step
window.onload = () => {
    
    canvas.style.display = 'none';
    overPage.style.display = 'none';
    winPage.style.display = 'none';
    backgroundMusic.play();
    backgroundMusic.volume = 1;
    
    

    startBut.addEventListener('click', () => { //para gerar reação ao click to botão
        beginGame(); 
    });

    document.addEventListener('keydown', (event) => {
       
        if( event.key == 'ArrowUp' ) {
            isUp = true;
            isDown = false;
        }

        // console.log(event.key)
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
        santaY = 430  //cuz santa needs to return to basic position
    });

    restartBut.addEventListener('click', () => {
        console.log("clicked")
        // overPage.style.display = 'none';
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        santaX = 10;
        score = 0;
        obstacles = [
            {el: rock, x: rockX, y: rockY}, 
            {el: goodPoke, x: goodX, y: rockY},
            {el: pika, x: pikaX, y: pikaY}  
        ]
        isGameOver = false;
        
        
        beginGame();
        
    });
}


// let backgroundMusic = new Audio('./sounds/harrypotter-theme.mp3')
