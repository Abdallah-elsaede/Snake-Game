const canvas=document.getElementById("canvas")
const ctx=canvas.getContext("2d")
const canvasSize=500;
canvas.width=canvasSize;
canvas.height=canvasSize;

const snakeBox=20;
//total moves possible
const totalMoves=canvasSize/snakeBox;

const apple=new Image()
apple.src='images/apple.png'

const dead=new Audio()
dead.src="audio/dead.mp3"
const eat=new Audio()
eat.src="audio/eat.mp3"
const down=new Audio()
down.src="audio/down.mp3"
const left=new Audio()
left.src="audio/left.mp3"
const right=new Audio()
right.src="audio/right.mp3"
const up=new Audio()
up.src="audio/up.mp3"

//define snake
let snake=[]
snake[0]={
    x:9*snakeBox,
    y:10*snakeBox
}

//create food
let food={}
getFood()

//score
let score=0;

//direct
let dir="";

document.addEventListener("keydown",direction)

function direction(event){
    let key= event.keyCode
    //there is no change if try opposit direction of snake
    if(key==37&&dir!="RIGHT"){
        dir="LEFT"
        left.play()
    }
    else if(key==38&&dir!="DOWN"){
        dir="UP"
        up.play()
    }
    else if(key==39&&dir!="LEFT"){
        dir="RIGHT"
        right.play()
    }
    else if(key==40&&dir!="UP"){
        dir="DOWN"
        down.play()
    }
}

//to display food at random location ,Math.random()*(max-min)+min =>to get a random value with in the range(max,min)her(300,3)
function getFood(){

    food={
        x:Math.abs( Math.floor(Math.random()*(totalMoves-2-3)-3))*snakeBox,
        y:Math.abs( Math.floor(Math.random()*(totalMoves-2-3)-3))*snakeBox
    };
   // console.log(food.x,food.y)
}
//to detect collition of snake body head 
function isCollide(head,ar){
    
    for(i=0;i<ar.length;++i){
        
        if(ar[i].x==head.x && ar[i].y==head.y){
            return true
        }
    }
    return false

}

//to display the game
function render(){
    //draw canvas style
    ctx.fillStyle="#31bbb4"//backgrund
    ctx.fillRect(0,0,canvasSize,canvasSize)
    
    //display snake
    for(let i=0; i<snake.length; ++i){
        //special colour for head if i==0
        ctx.fillStyle= i==0?"#830303":"green";
        ctx.fillRect(snake[i].x,snake[i].y,snakeBox,snakeBox)

        ctx.strokeStyle="#1a0383"
        ctx.strokeRect(snake[i].x,snake[i].y,snakeBox,snakeBox)
    }
    ctx.drawImage(apple,food.x,food.y,snakeBox,snakeBox)

    //to move
    let snakeX=snake[0].x;
    let snakeY=snake[0].y;
    if(dir=="LEFT") snakeX-=snakeBox
    if(dir=="RIGHT") snakeX+=snakeBox
    if(dir=="UP") snakeY-=snakeBox
    if(dir=="DOWN") snakeY+=snakeBox

    //if snake eat food
    if(snakeX==food.x&& snakeY==food.y){
        score++
        eat.play()
        getFood()
    }
    else{
        snake.pop()

    }
    let newHead={
        x: snakeX,
        y: snakeY
    }
    //to quit when snake move out of the canvas
    if(snakeX<0 || snakeX>=canvasSize || snakeY<0 || snakeY>=canvasSize || isCollide(newHead,snake)){
        gameOver()
        return
    }
    snake.unshift(newHead)
    //to show the score
    ctx.fillStyle="white";
    ctx.font="40px cursive";
    ctx.fillText(score,10,40)

}
//render()
var gm=setInterval(render,200)

function gameOver(){
    console.log(`Game over<br>Your score:${score}`)
    clearInterval(gm)
    dead.play();
    ctx.fillStyle="black";
    ctx.font="40px tahoma"
    ctx.fillText(`Game over`,canvasSize/2-100,canvasSize/2)
    ctx.font="20px tahoma"
    ctx.fillText(`  Your score:${score}`,canvasSize/2-80,canvasSize/2+20)
}
