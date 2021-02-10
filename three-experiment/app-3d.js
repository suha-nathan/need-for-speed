//variables for setup

let container; //html element
let camera;
let renderer;
let scene; //3d world
let carRender;

function init(){
    container = document.querySelector(".container");

    //create the scene
    scene = new THREE.Scene();

    //camera setup
    const FOV = 35; //field of view of the camera (degrees)
    const aspectRatio = container.clientWidth/container.clientHeight;
    const near = 0.1; //near and far clipping, outside of this range you cannot see the 3D model
    const far = 500;

    camera = new THREE.PerspectiveCamera(FOV,aspectRatio,near,far);
    camera.position.set(5,0.5,5)//sets the camera position in x,y,z(left-right,up-down,depth)
    camera.rotation.y = 45/180*Math.PI

    //setup lighting
    const ambient = new THREE.AmbientLight(0x404040,6) ;
    scene.add(ambient);

    const light =new THREE.DirectionalLight(0xffffff,8)
    light.position.set(10,10,10)
    scene.add(light)

    //render setup
    renderer = new THREE.WebGLRenderer({antialias:true, alpha: true}) //antialias makes the edges of the 3d model not so jagged
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    container.appendChild(renderer.domElement) //appending the renderer(incl scene, camera and model) into the html canvas

    //load model

    let loader = new THREE.GLTFLoader();
    loader.load('./three-experiment/game-assets/scene.gltf',function(gltf){
        //gltf is a super large object with information on the gltf 3d model
        // console.log(gltf);
        // console.log(gltf.scene.position)
        gltf.scene.position.set(-1.2,-0.7,0.5);

        scene.add(gltf.scene); //adding the model to the scene
        carRender = gltf.scene.children[0]; //the actual car object
       // renderer.render(scene,camera) //rendering the scene with teh camera
        animate()
    });

    //add interactivity
    // const controls = new OrbitControls(camera, renderer.domElement );
    // controls.minDistance = 1;
    // controls.maxDistance = 1000;
    // controls.update() // must be called after any manual changes to the camera's transform
    const animate=() =>{
        requestAnimationFrame(animate) //recursion
        carRender.rotation.z += 0.005;
        renderer.render(scene,camera);

    }

}

function openNav(){
    document.getElementById("sideNav").style.width = "250px";
    document.getElementById("openNav").style.display = "none";
}
function closeNav(){
    document.getElementById("sideNav").style.width ="0";
    document.getElementById("openNav").style.display = "inline-block";
}

function onWindowResize(){
    camera.aspect = container.clientWidth/ container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth,container.clientHeight);
    //updates camera and renderer on window event - resize
}

document.querySelector('#openNav').addEventListener('click',openNav)
document.querySelector('.closebtn').addEventListener('click',closeNav)
window.addEventListener('resize',onWindowResize)
init()





