
window.addEventListener("keydown", function (e) {
    keys= e.key
});

window.addEventListener("keyup", function (e) {
    keys = false
});

document.querySelector("#restart-div").addEventListener('click',function(e){
    console.log('yessss')
})


let carImage = document.getElementById('car')
let carWidth = carImage.width*0.225
let carHeight = carImage.height*0.1

let car1 = document.getElementById('car-1')
let car1Width = car1.width*0.225*0.7
let car1Height = car1.height*0.1*0.7

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext('2d')


let avatarX = canvas.width/2 - carWidth/2,
    avatarY = canvas.height-carHeight-10,
    keys

let rectHeight = (canvas.height-60)/3
let initY1 =0//upper
let initY2= rectHeight+30 //middle
let initY3= (2*rectHeight)+60 //lower

let car1Y=0,car1X=0

let gameOver = false,
    scoreCounter = 1,
    roadSpeed = 1,
    collisionState = false


function update(dt){
    //draw the road
    ctx.fillStyle = "#484848"
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white'
    if (initY1 >= 150){
        initY1 = -rectHeight
    }
    if (initY2 >= 150){
        initY2 = -rectHeight
    }
    if (initY3 >= 150){
        initY3 = -rectHeight
    }


    ctx.fillRect(canvas.width/3,initY1,10,rectHeight)
    ctx.fillRect((2*canvas.width)/3,initY1,10,rectHeight)
    initY1+=roadSpeed

    ctx.fillRect(canvas.width/3,initY2,10,rectHeight)
    ctx.fillRect((2*canvas.width)/3,initY2,10,rectHeight)
    initY2+=roadSpeed

    ctx.fillRect(canvas.width/3,initY3,10,rectHeight)
    ctx.fillRect((2*canvas.width)/3,initY3,10,rectHeight)
    initY3+=roadSpeed

    //draw the other cars
    if (car1Y >= 150) {
        car1Y = 0
        car1X = Math.floor(Math.random()*(canvas.width-carWidth))
    }

    ctx.drawImage(car1,car1X,car1Y,car1Width,car1Height)
    car1Y+=roadSpeed


   //DRAW THE PLAYER
    ctx.drawImage(carImage,avatarX,avatarY,carWidth,carHeight)

    //check for collision
    if (avatarX+carWidth < car1X+5 || avatarX > car1X+car1Width-5 || avatarY>car1Y+car1Height-5 || avatarY+carHeight<car1Y+5){
        collisionState = false
    }else{
        collisionState = true
    }
    whatKey(keys)
}


let lastTimeStep, animFrame

function callback(timeStep) {
    if (!gameOver){
        update()
        scoreCounter++
        animFrame = requestAnimationFrame(callback);
    }
    if (collisionState){
        console.log(car1X,car1Y,car1Width,car1Height)
        console.log(avatarX,avatarY,carWidth,carHeight)
        stopGame()
    }
}
callback()


function stopGame(){
    gameOver = true
    cancelAnimationFrame(animFrame)
}

function whatKey(checkKey) {
    if (checkKey === 'ArrowLeft') {
        if (avatarX>0) {
            avatarX-=2;
        }
    }
    if (checkKey === 'ArrowRight') {
        if (avatarX<=canvas.width-carWidth) {
            avatarX+=2
        }
    }
    if (checkKey === 'ArrowDown') {
        //velY = 10;
        if (avatarY<=canvas.height-carHeight) {
            avatarY += 2;
        }
    }
    if (checkKey === 'ArrowUp') {
        if (avatarY>0) {
            avatarY-=2;
        }
    }
    if (checkKey =="Enter"){
        stopGame()
    }
}



