let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '5px solid purple';
let introPage = document.getElementById('intro-page');
let overPage = document.getElementsByClassName('over-page');
let startBut = document.querySelector('start-button') // transição p jogo: 1º definir o q fazer com start button, de seguida crio event listener e função


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

let fire = new Image();
fire.src = './images/fire-ring.png'

let santaX = 10, santaY = 430;
let scoreeX = 750, scoreeY = 40;
let score = 0;
let gameOver = false;
let intervalId = 0;


function beginGame() { //o q acontece quando clicamos no botão start
    introPage.style.display = 'none'; //check how to hide this
    canvas.style.display = 'block';
    startBut.style.display = 'none';
    gameScreen();
}

let rockX = 300, rockY = 430

let obstacles = [
    {x: rockX, y: rockY}, 
    {x: rockX + 600, y: 430}
]// move on with this logic




function gameScreen() {

    ctx.drawImage(gameScrBack, 0, 0);
    ctx.drawImage(santa, santaX, santaY);
    // ctx.drawImage(rock, 300, 430)

    ctx.drawImage(pokeSanta, 30, 10)
    ctx.drawImage(scoree, scoreeX, scoreeY);
    ctx.font = '28px Verdana'
    ctx.fillText(`Score: ${score}`, 795, 120)

    
    for ( let i = 0; i < obstacles.length; i++) {
        let move = 2;

        ctx.drawImage(rock, obstacles[i].x, obstacles[i].y);
        ctx.drawImage(rock, obstacles[i].x, obstacles[i].y);
        ctx.drawImage(goodPoke, obstacles[i].x - 80, obstacles[i].y)
        ctx.drawImage(badPoke, obstacles[i].x + 350, obstacles[i].y)
        ctx.drawImage(pika, obstacles[i].x + 30, obstacles[i].y - 200 )
        ctx.drawImage(fire, obstacles[i].x + 10, obstacles[i].y - 228)

        obstacles[i].x = obstacles[i].x - move

        if(obstacles[i].x + rock.width < 0) {
            obstacles[i].x = 1000;
        }



    }

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
    overPage.style.display = 'none'; //---- how to game over page when loading page?
    

    startBut.addEventListener('click', () => { //para gerar reação ao click to botão
        beginGame(); // not producing effects, why?
    })

    document.addEventListener('keydown', (event) => {
        if( event.key == 'ArrowUp' ) {
            isUp = true;
            isDown = false;
        }
        if( event.key == 'spaceBar') {
            // max jump
        }
        if( event.key == 'keyQ') //don't really know if this is the right way

    })

}



// CSS COMMENT 

//.intro-page > div ---- need to make 3 main divs align 
//in 3 inline blocks. CSS is treating it like it's 1 major column

//start button: how to change esthetics