# Need for Speed

Used Javascript, HTML and CSS to create a game inspired by racing pop-culture.

The project is split into 2 - where the first is the 3D visuals and the second is the 2D game. 

## 3D Landing Page

The landing page that takes you to the initial game was built with three.js with a simple loading and rendering of the 3D model using WebGL and visualising the render in the webpage in canvas. Learnt about the fundamental features needed to build a 3D scene in three.js.

Unsolved problems:
- Figuring out how to use Orbital Controls within three.js to make the scene interactive
- Not all 3D models are created equal, some models dont render and I dont yet understand why.

## 2D Racing Game

There were a few different approaches I was evaluating to build the 2D game.
1. Using CSS and jQuery to animate individual css elements. Movement of the CSS element is slightly choppy
  
2. Using canvas and the draw rectangles and images. Movement is smoother than using CSS. However, drawing and resizing images in `<canvas>` decreases the quality of the image. 
  
3. Using SVG.js. Work In Progress. Didn't manage to thoroughly explore this route due to time constraints. 


** All animations including the 3D model rotation and 2D game was done using the `requestAnimationFrame` function in Javascript.

