
//ensures the document loads before the jquery code is run
$(document).ready(function(){
    "use strict"
    let anim, animId;

    //saving the DOM objects to variables
    let container = $('.container'),
        line = $('.line'),
        line_1 = $('#line-1'),
        line_2 = $('#line-2'),
        line_3 = $('#line-3'),
        carPlayer = $('#car-player'),
        car_1 = $('#car-1'),
        car_2 = $('#car-2'),
        car_3 = $('#car-3'),
        car_4 = $('#car-4'),
        restart_Div =$("#restart-div"),
        restart_Btn =$("#restart"),
        score =$("#score");

    //saving initial settings

    //css method sets or returns one or more css style properties
    let container_Left = parseInt(container.css('left')),
        container_Width = parseInt(container.css('width')),
        container_Height = parseInt(container.css('height')),
        car_Width = parseInt(carPlayer.css('width')),
        car_Height = parseInt(carPlayer.css('height')),
        line_height = parseInt(line_1.css('height'));

    console.log(container_Height)

    let game_Over = false,
        score_Counter = 1,
        car_Speed = 1,
        line_Speed = 5,
        counter=0;

    // Game starts here
    restart_Div.click(function(){
        window.location.reload(true)
    })
    $(window).on('keydown',function(e){
        let key = e.key
        if (game_Over===false){
            if(key==="ArrowLeft"){ //WRONGGG
             //if left arrow is pressed, we check if car has 20px of space to move to the left
             //if theres space car moves left by 20 px, if not, nth changes
             if(parseInt(carPlayer.css('left') ) >10 ){
                 //custom animation of a set of css properties. gradually changed

                 carPlayer.animate({
                    left:'-=20px'
                },20)
             }
             //right arrow press
            }else if(key ==="ArrowRight"){
                if(parseInt(carPlayer.css('left')) < (container_Width-car_Width-20) ){
                    carPlayer.animate({
                        left:'+=20px'
                    },20)
                }
                //up arrow press WRONNGGG!!
            }else if(key === "ArrowUp" ){
                // console.log('up')
                if(parseInt(carPlayer.css('top')) >20 ){
                    carPlayer.animate({
                        top:'-=20px'
                    },20)
                }
                //down arrow press
            }else if(key ==="ArrowDown"){
                // console.log('down')
                if(parseInt(carPlayer.css('top')) < (container_Height-car_Height-20) ){
                    carPlayer.animate({
                        top:'+=20px'
                    },20)
                }
            }else{ //gameOver is true
                if (key == "Enter"){
                    //pull the document from the web-server again as the document contents
                    // // change dynamically
                    window.location.reload(true)
                }
            }
        }
    });

    //initialise the car player position

    let anim_Id = requestAnimationFrame(repeat)
    function repeat(){
        if(game_Over == false){
            score_Counter++
            if(score_Counter%20 ==0){
                // console.log(score_Counter)
                score.text(parseInt(score.text())+1)
            }
            if(score_Counter%300 == 0){
                car_Speed++
                line_Speed++
            }
            if(collision(carPlayer,car_1) ||(collision(carPlayer,car_2)) || (collision(carPlayer,car_3))){
                stopGame()
            }

            let randomXArray = randomXPos()
            // console.log(randomXArray)
            let randomYArray = randomYPos()

            carDown(car_1,randomXArray[0], randomYArray[0])
            carDown(car_2,randomXArray[1], randomYArray[1])
            carDown(car_3,randomXArray[2], randomYArray[2])
            carDown(car_4,randomXArray[3], randomYArray[3])


            lineDown(line_1)
            lineDown(line_2)
            lineDown(line_3)
           anim_Id = requestAnimationFrame(repeat)
        }
    }

    function randomXPos() {
        let arr = []
        arr.push(Math.floor(Math.random() * ((container_Width - car_Width)/4) ) )
        arr.push(Math.floor(Math.random() * ((container_Width - car_Width)/4) ) + ((container_Width - car_Width)/4) )
        arr.push(Math.floor(Math.random() * ((container_Width - car_Width)/4) ) + ((container_Width - car_Width)/2) )
        arr.push(Math.floor(Math.random() * ((container_Width - car_Width)/4) ) + (3*(container_Width - car_Width)/4) )
        return arr //array of 4 X Positions that are not the same/ in 4 separate zones ~mostly
    }

    function randomYPos(){
        let arr = []
        arr.push(Math.floor(Math.random()* 100))
        arr.push(Math.ceil(Math.random()* 100))
        arr.push(Math.floor(Math.random()* 100))
        arr.push(Math.ceil(Math.random()* 100))
        return arr
    }

    function carDown(random_car,x,y){
        //pulls the car element down
        let currentYPos = parseInt(random_car.css('top'))
        let updateYPos = currentYPos+car_Speed
        random_car.css('top',updateYPos)

        //checks if the car element is out of the frame,
        // pulls it back to the top & changes the x position of the car
        if (currentYPos>(container_Height+50)){
            random_car.css('left',x)
            random_car.css('top',-200-y)
        }
    }

    function lineDown(line){
        let line_current_top = parseInt(line.css('top'))
        if(line_current_top > (container_Height)){
            line_current_top = -line_height
        }
        line.css('top',line_current_top + line_Speed)
    }

    function stopGame(){
        game_Over = true
        cancelAnimationFrame(anim_Id) // stops the animation at the collision
        //slideDown() works on elements hidden with jQuery methods and
        // display:none in CSS (but not visibility:hidden)
        restart_Div.slideDown()
        restart_Btn.focus()
    }

    function collision(firstCar,secondCar){
        let x1 = firstCar.offset().left
        let y1 = firstCar.offset().top

        let x2 = secondCar.offset().left
        let y2 = secondCar.offset().top

        let h1 = firstCar.outerHeight()
        let w1 = firstCar.outerWidth()

        let h2 = secondCar.outerHeight()
        let w2 = secondCar.outerWidth()

        let b1 = y1+h1
        let r1 = x1+w1
        let b2 = y2+h2
        let r2 = x2+w2

        if(b1<y2 || y1>b2 || r1<x2 || x1>r2){
            return false
        }
        return true
    }


})
