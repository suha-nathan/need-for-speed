# Need for Speed

![image](https://s3.gifyu.com/images/need-for-speed.gif)

Used Javascript, HTML, CSS and SCSS to create a game inspired by racing pop-culture.

The project is split into 2 - where the first is the 3D visuals and the second is the 2D game. 

## 3D Landing Page

The landing page that takes you to the initial game was built with three.js with a simple loading and rendering of the 3D model using WebGL and visualising the render in the webpage in canvas. Learnt about the fundamental features needed to build a 3D scene in three.js.

Unsolved problems:
- Figuring out how to use Orbital Controls within three.js to make the scene interactive
- Not all 3D models are created equal, some 3D model file types dont render. 

## 2D Racing Game

There were a few different approaches I was evaluating to build the 2D game.
1. Using SCSS and jQuery to animate individual css elements. Movement of the CSS element is slightly choppy
  
2. Using vanilla JS `<canvas>` to draw rectangles and images. Movement is smoother than using CSS. However, drawing and resizing images in `<canvas>` decreases the quality of the image. 
  
3. Using SVG.js. Work In Progress. Didn't manage to thoroughly explore this route due to time constraints. 

Ultimately, the logic of the game is based off the following:
- Counter to increase the speed of the road and NPC-cars  
- Collsion detection of the player with the NPC-car   
- Linking keypress events to enable interactivity and ensuring the player CSS element remains within the container of the window

Unsolved Problems:
- I would like the animation to be more dynamic - will explore this with SVG.js and three.js   
- I'd like to bring out the concept of racing better within the 2D game. Additional game features include throttle control, curved paths, different car/characters   


** All animations including the 3D model rotation and 2D game was done using the `requestAnimationFrame` function in Javascript.


