var texturedShader = null;
var nonTexturedShader = null;

function main() {
  // Retrieve the canvas from the HTML document
  canvas = document.getElementById("webgl");
  var hud = document.getElementById('hud'); 

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }

  // Initialize the scene and camera
  var scene = new Scene();
  var camera = new Camera();

  // Initialize shaders
  initializeShaders(gl);

  // Create our player
  var player = new Player(nonTexturedShader);

  // Create our input handler
  var inputHandler = new InputHandler(canvas, scene, camera, player);   // Feed player into inputhandler
  inputHandler.update();    // Update the movement with every frame
   
  // Draw the HUD
  drawHUD(hud);

  // Draw the map
  drawMap(inputHandler);

  

  // Add our player onto the map
  scene.addGeometry(player);

  // Load skybox texture and add cube to scene with that texture.
  /*inputHandler.readTexture("objs/skybox.jpg", function(image) {
      var skybox = new Skybox(texturedShader, image);
      scene.addGeometry(skybox);
  })*/

  /*// Load grass texture and add ground plane to scene with that texture.
  inputHandler.readTexture("objs/grass.jpg", function(image) {
      this.player = new Player(texturedShader, image);
      scene.addGeometry(this.player);
  })*/

  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, camera);
  renderer.start();
}

// ========== FUNCTIONS ========== //

function initializeShaders(gl)
{
  // Initialize textured shader
  texturedShader = new Shader(gl, TEXTURED_VSHADER, TEXTURED_FSHADER);
  // Add attibutes
  texturedShader.addAttribute("a_Position");
  texturedShader.addAttribute("a_Color");
  texturedShader.addAttribute("a_TexCoord");
  // Add uniforms
  var idMatrix = new Matrix4();
  texturedShader.addUniform("u_ModelMatrix", "mat4", idMatrix.elements);
  texturedShader.addUniform("u_Sampler", "sampler2D", new Matrix4().elements);
  texturedShader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  texturedShader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);

  // Initialize non-textured shader
  nonTexturedShader = new Shader(gl, NONTEXTURED_VSHADER, NONTEXTURED_FSHADER);
  // Add attibutes
  nonTexturedShader.addAttribute("a_Position");
  nonTexturedShader.addAttribute("a_Color");
  // Add uniforms
  var idMatrix = new Matrix4();
  nonTexturedShader.addUniform("u_ModelMatrix", "mat4", idMatrix.elements);
  nonTexturedShader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  nonTexturedShader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
}

function drawHUD(hud)
{
    var ctx = hud.getContext("2d");
    
    // Draw the time and date HUDs
    var date = new Date();
    ctx.font = "30px Arial";
    ctx.fillText(date.getMonth() + "/" + date.getDate() , 10, 50);
}

function drawMap(inputHandler)
{
    inputHandler.readTexture("objs/cobble.jpg", function(image) {
        //var startCube = new Cube(texturedShader, image, 0, 0, 0);
        //scene.addGeometry(startCube);
  
        // Hardcoded array of world layout
        // VALUES 1-4 specify regular stacks
        // VALUE    5 specifies a door
        var blocksArray = [[4, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 5, 5, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 4], 
                           [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
                           [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
                           [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
                           [3, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 4, 5, 5, 4, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 0, 0, 0, 3], 
                           [4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 4],
                           [4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 4],
                           [3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3],
                           [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
                           [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
                           [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
                           [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
                           [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
                           [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
                           [4, 5, 5, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 4],
                           [5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5],
                           [5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5], 
                           [4, 5, 5, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 4],
                           [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
                           [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
                           [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
                           [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
                           [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
                           [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
                           [3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3], 
                           [4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 4],
                           [4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 4],
                           [3, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 4, 5, 5, 4, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 0, 0, 0, 3],
                           [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
                           [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
                           [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
                           [4, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 5, 5, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 4]];
        // Generate cubes as specified by array
        for (var i=0; i<blocksArray.length; i++) {
            for (var j=0; j<blocksArray[0].length; j++) {
                if (blocksArray[i][j] == 5) {
                    //var cube = new Cube(texturedShader, image, i, 2, j);
                    //scene.addGeometry(cube);
                }
                else{
                    for (var k=0; k<blocksArray[i][j]; k++) {
                        //var cube = new Cube(texturedShader, image, i, k, j);
                        //scene.addGeometry(cube);
                    }
                }
            }
        }
    });

    // Load grass texture and add ground plane to scene with that texture.
    inputHandler.readTexture("objs/acgrass.png", function(image) {
        var plane = new Plane(texturedShader, image);
        inputHandler.scene.addGeometry(plane);
    });
}

// Puts text in center of canvas.
function makeTextCanvas(text, width, height) {
    textCtx.canvas.width  = width;
    textCtx.canvas.height = height;
    textCtx.font = "20px monospace";
    textCtx.textAlign = "center";
    textCtx.textBaseline = "middle";
    textCtx.fillStyle = "black";
    textCtx.clearRect(0, 0, textCtx.canvas.width, textCtx.canvas.height);
    textCtx.fillText(text, width / 2, height / 2);
    return textCtx.canvas;
}

// ========== END OF FUNCTIONS ========== //