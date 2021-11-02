let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '5px solid purple';
let introPage = document.getElementById('intro-page');
let overPage = document.getElementsByClassName('over-page');
let startBut = document.querySelector('.start-button') // transição p jogo: 1º definir o q fazer com start button, de seguida crio event listener e função


//images - can i create another page just for these img variables?
let badPoke = new Image();
badPoke.src = './images/bad-pokemon.png'

let gameOverBack = new Image();
gameOverBack.src = './images/game-over-background.png'

let winBack = new Image();
winBack.src = './images/win-over-background.png'

let gameScrBack = new Image();
gameScrBack.src = './images/game-screen-background.png'

let goodPoke = new Image();
goodPoke.src = './images/good-pokemon.png'

let keys = new Image();
keys.src = './images/keys.png'

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

let introScr = new Image();
introScr.src = './images/splash-screen.jpg'

let scoree = new Image();
scoree.src = './images/score.jpg'


let santaX = 10, santaY = 430;
let rockX = 900, rockY = 430;
let goodX = rockX - 80;
let badX = rockX + 350;
let pikaX = rockX + 30;
let pikaY = rockY - 200;

let scoreeX = 750, scoreeY = 40;
let score = 0;
let gameOver = false;

let intervalId = 0;
let isUp = false;
let isDown = true;
let maxUp = false;
let maxDown = true;

let isGameOver = false;


let interval = null;
// let randomElement = [rock, goodPoke, badPoke, pika];




// function introScreen()   - take care of player name input & audio button

function beginGame() { //o q acontece quando clicamos no botão start
    introPage.style.display = 'none'; //check how to hide this
    canvas.style.display = 'block';
    startBut.style.display = 'none';
    gameScreen();
}



let obstacles = [

    {el: rock, x: rockX, y: rockY}, 
    {el: goodPoke, x: goodX, y: rockY},
    {el: badPoke, x: badX , y: rockY},
    {el: pika, x: pikaX, y: pikaY}  
        
]



function gameScreen() {

    let move = 2;
    let counter = 1;
    let i = 0;

    interval = setInterval(() => {

        // ++counter;

        ctx.drawImage(gameScrBack, 0, 0); //this makes Santa jump and max jump
            if(isUp) {
                ctx.drawImage(santa, santaX, santaY - 100); 
            } 
            else if(maxUp) {
                ctx.drawImage(santa, santaX, santaY - 200);
            }
            else {
                ctx.drawImage(santa, santaX, santaY);
            }
               

        ctx.drawImage(pokeSanta, 30, 10)
        ctx.drawImage(scoree, scoreeX, scoreeY);
        ctx.font = '28px Verdana'
        ctx.fillText(`Score: ${score}`, 795, 120)

        // if (counter % 50 === 0) {

        //     let randEl = Math.floor(Math.random() * 4);
        //     let randXinterval = Math.floor(Math.random() * 200);
        //     let randX = rockX + 300 + randXinterval;
        //     let randY = rockY;
        //     if (randomElement[randEl] === pika) {
        //         randY -= 200;
        //         obstacles.push({el: fire, x: randX, y: randY});
        //     }

        //     obstacles.push({el: randomElement[randEl], x: randX, y: randY});

        // }

       

        for ( let i = 0; i < obstacles.length; i++) {

            
            ctx.drawImage(rock, obstacles[i].x, obstacles[i].y);
            ctx.drawImage(goodPoke, obstacles[i].x - 80, obstacles[i].y);
            // ctx.drawImage(badPoke, obstacles[i].x + 350, obstacles[i].y);
            ctx.drawImage(pika, pikaX, pikaY);
            
            obstacles[i].x = obstacles[i].x - move;

            pikaX = pikaX - move;


            if(obstacles[i].x + rock.width < 0) {  //keep them showing
                obstacles[i].x = 1000;
            }
             

            if(santaX + santa.width > goodX) { //if santa crosses good poke 
                score++;
            }
            // if (santaY == obstacles[i].x + 30, obstacles[i].y - 200) {
            //     score += 5;
            // }

            // let pikaCoord = (obstacles[i].x + 30, obstacles[i].y - 200)
            // if(santaY == pikaCoord) { //if santa crosses pika
            //     score * 10
            // }

            if(santaY + santa.height >= rockX && rockY) {
             isGameOver = true;
             cancelAnimationFrame(intervalId);
            //  gameOverScreen();
            }


                

        }


    }, 10);
    


    // if(gameOver) {
    //     cancelAnimationFrame(intervalId);
    //     showGameOver(); //to do
    // }
    // else {
    //     intervalId = requestAnimationFrame(gameScreen);
    // }

}





//1st step
window.onload = () => {
    
    canvas.style.display = 'none';
    // overPage.style.display = 'none'; //---- how to game over page when loading page?
    

    startBut.addEventListener('click', () => { //para gerar reação ao click to botão
        beginGame(); 
    })

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
        // if( event.key == 'keyQ') {} //don't really know if this is the right way
        
    });

    document.addEventListener('keyup', (event) => {
        isUp = false;
        isDown = false;
        maxUp = false;
        maxDown = false;
    })

}







