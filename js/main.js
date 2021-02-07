


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
        restart_Div =$("#restart-div"),
        restart_Btn =$("#restart"),
        score =$("#score");

    //saving initial settings

    //css method sets or returns one or more css style properties
    let container_Left = parseInt(container.css('left')),
        container_Width = parseInt(container.css('width')),
        container_Height = parseInt(container.css('height')),
        car_Width = parseInt(carPlayer.css('width')),
        car_Height = parseInt(carPlayer.css('height'));

    let game_Over =false,
        score_Counter = 1,
        car_Speed = 2,
        line_Speed = 5;

    // Game starts here

    $(window).on('keydown',function(e){
        let key = e.keyCode
        if (game_Over===false){
            if(key===37){
             //if left arrow is pressed, we check if car has 20px of space to move to the left
             //if theres space car moves left by 20 px, if not, nth changes
             if(parseInt(carPlayer.css('right')) < (container_Width-car_Width-20) ){
                 //custom animation of a set of css properties. gradually changed
                 carPlayer.animate({
                    left:'-=20px'
                },20)
             }
             //right arrow press
            }else if(key ===39){
                if(parseInt(carPlayer.css('left')) < (container_Width-car_Width-20) ){
                    carPlayer.animate({
                        left:'+=20px'
                    },20)
                }
                //up arrow press
            }else if(key ===38 ){
                // console.log('up')
                if(parseInt(carPlayer.css('bottom')) <= (container_Height-car_Height-20) ){
                    carPlayer.animate({
                        top:'-=20px'
                    },20)
                }
                //down arrow press
            }else if(key ===40){
                // console.log('down')
                if(parseInt(carPlayer.css('top')) < (container_Height-car_Height-20) ){
                    console.log('can move down')
                    carPlayer.animate({
                        top:'+=20px'
                    },20)
                }
            }else{ //gameOver is true
                if (key == 13){
                    //pull the document from the web-server again as the document contents
                    // // change dynamically
                    window.location.reload(true)
                }
            }
        }
    });

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
                console.log(game_Over)
            }
            carDown(car_1)
            carDown(car_2)
            carDown(car_3)

            lineDown(line_1)
            lineDown(line_2)
            lineDown(line_3)
           anim_Id = requestAnimationFrame(repeat)
        }
    }
    function carDown(random_car){
        let current_Top = parseInt(random_car.css('top'))

        if (current_Top> (container_Height+50)){
            current_Top= -60
            let random_car_Left = Math.floor(Math.random() *(container_Width - car_Width))
            console.log(random_car_Left)
            random_car.css('left',random_car_Left)
        }
        random_car.css('top',current_Top+car_Speed)
    }

    function lineDown(line){
        let line_current_top = parseInt(line.css('top'))
        if(line_current_top > (container_Height +150)){
            line_current_top = -300
        }
        line.css('top',line_current_top + line_Speed)
    }

    function stopGame(){
        game_Over = true
        cancelAnimationFrame(anim_Id) // stops the animation at the collision
        restart_Div.slideDown()
        restart_Btn.focus()
    }

    restart_Div.click(function(){
        window.location.reload(true)
    })

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
