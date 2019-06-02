var texturedShader = null;
var nonTexturedShader = null;

function main() {
  // Retrieve the canvas from the HTML document
  canvas = document.getElementById("webgl");
  var hud = document.getElementById("hud"); 
  var hudText = document.getElementById("hudText"); 
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

  // Create temp player (will be replaced after inputHandler initiated)
  var player = new Player(texturedShader);

  // Create our input handler
  var inputHandler = new InputHandler(canvas, scene, camera, player);   // Feed temp player into inputhandler

  // Main drawin function that updates everything
  // inputHandler.update(); is called inside here
  draw(inputHandler, hud, hudText);

  // Draw the map
  drawMap(inputHandler);

  

  // Add our player onto the map
  //scene.addGeometry(player);

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

function draw(inputHandler, hud, hudText)
{
    inputHandler.update();
    
    var ctx = hud.getContext("2d");
    var ctxText = hudText.getContext("2d");

    ctx.clearRect(0, 0, hud.width, hud.height);
    ctxText.clearRect(0, 0, hudText.width, hudText.height);

    if(!inputHandler.isTalking)
    {
        drawDateTimeHUD(hud, hudText);
    }
    else
    {
        drawChatHUD(inputHandler, hud, hudText);
    }
    requestAnimationFrame(function() {
        draw(inputHandler, hud, hudText);
    });
}

function drawDateTimeHUD(hud, hudText)
{
    var ctx = hud.getContext("2d");
    var ctxText = hud.getContext("2d");

    var imgWidth = 192.2;
    var imgHeight = 116.4;

    // Draw the hud element image
    var img = new Image();
    img.src = "ui/datetimeui.png";
    ctx.drawImage(img, 15, hud.height - imgHeight - 15, imgWidth, imgHeight);

    // Draw the date text
    var date = new Date();
    ctxText.font = "25px Arial";
    ctxText.fillStyle = "#421F0F";
    
    if (date.getMonth() + 1 < 10)   // MONTH
    {
        ctxText.fillText("0" + (date.getMonth() + 1), 35, hudText.height - imgHeight + 20);
    }
    else
    {
        ctxText.fillText(date.getMonth() + 1, 35, hudText.height - imgHeight + 20);
    }

    ctxText.fillText("/", 70, hudText.height - imgHeight + 23); // SLASH

    if (date.getDate() < 10)   // DATE
    {
        ctxText.fillText("0" + date.getDate(), 80, hudText.height - imgHeight + 25);
    }
    else
    {
        ctxText.fillText(date.getDate(), 80, hudText.height - imgHeight + 25);
    }

    // Draw the time text
    ctxText.font = "40px Arial";
    var isAM = date.getHours() < 12 ? true : false;

    ctxText.fillStyle = "#FFFFFF";
    ctxText.fillText(":", 87.5, hudText.height - imgHeight + 78);
    ctxText.fillStyle = "#025660";
    ctxText.fillText(":", 87.5, hudText.height - imgHeight + 77); // COLON 
    

    if(isAM)
    {
        // Special case, if hour is 0 write it as 12
        if(date.getHours() == 0) 
        {
            ctxText.fillStyle = "#FFFFFF";
            ctxText.fillText("12", 43, hudText.height - imgHeight + 80);
            ctxText.fillStyle = "#025660";
            ctxText.fillText("12", 43, hudText.height - imgHeight + 81);
        }
        else if(date.getHours() < 10) 
        {
            ctxText.fillStyle = "#FFFFFF";
            ctxText.fillText(date.getHours(), 65, hudText.height - imgHeight + 80);
            ctxText.fillStyle = "#025660";
            ctxText.fillText(date.getHours(), 65, hudText.height - imgHeight + 81);
        }
        else 
        {
            ctxText.fillStyle = "#FFFFFF";
            ctxText.fillText(date.getHours(), 43, hudText.height - imgHeight + 80);
            ctxText.fillStyle = "#025660";
            ctxText.fillText(date.getHours(), 43, hudText.height - imgHeight + 81);
        }

        if(date.getMinutes() < 10) 
        {
            ctxText.fillStyle = "#FFFFFF";
            ctxText.fillText("0" + date.getMinutes(), 100, hudText.height - imgHeight + 80);
            ctxText.fillStyle = "#025660";
            ctxText.fillText("0" + date.getMinutes(), 100, hudText.height - imgHeight + 81);
        }
        else 
        {
            ctxText.fillStyle = "#FFFFFF";
            ctxText.fillText(date.getMinutes(), 100, hudText.height - imgHeight + 80);
            ctxText.fillStyle = "#025660";
            ctxText.fillText(date.getMinutes(), 100, hudText.height - imgHeight + 81);
        }

        ctxText.font = "20px Arial";
        ctxText.fillStyle = "#FFFFFF";
        ctxText.fillText("AM", 150, hudText.height - imgHeight + 65);
        ctxText.fillStyle = "#025660";
        ctxText.fillText("AM", 150, hudText.height - imgHeight + 66);
    }
    else
    {
        // Special case, if hour is 0 write it as 12
        if(date.getHours() == 12) 
        {
            ctxText.fillStyle = "#FFFFFF";
            ctxText.fillText("12", 43, hudText.height - imgHeight + 81);
            ctxText.fillStyle = "#025660";
            ctxText.fillText("12", 43, hudText.height - imgHeight + 80);
        }
        else if(date.getHours() % 12 < 10) 
        {
            ctxText.fillStyle = "#FFFFFF";
            ctxText.fillText(date.getHours() % 12, 65, hudText.height - imgHeight + 81);
            ctxText.fillStyle = "#025660";
            ctxText.fillText(date.getHours() % 12, 65, hudText.height - imgHeight + 80);
        }
        else 
        {
            ctxText.fillStyle = "#FFFFFF";
            ctxText.fillText(date.getHours() % 12, 43, hudText.height - imgHeight + 81);
            ctxText.fillStyle = "#025660";
            ctxText.fillText(date.getHours() % 12, 43, hudText.height - imgHeight + 80);
        }
        
        if(date.getMinutes() < 10) 
        {
            ctxText.fillStyle = "#FFFFFF";
            ctxText.fillText("0" + date.getMinutes(), 100, hudText.height - imgHeight + 81);
            ctxText.fillStyle = "#025660";
            ctxText.fillText("0" + date.getMinutes(), 100, hudText.height - imgHeight + 80);
        }
        else 
        {
            ctxText.fillStyle = "#FFFFFF";
            ctxText.fillText(date.getMinutes(), 100, hudText.height - imgHeight + 81);
            ctxText.fillStyle = "#025660";
            ctxText.fillText(date.getMinutes(), 100, hudText.height - imgHeight + 80);
        }
        ctxText.font = "20px Arial";
        ctxText.fillStyle = "#FFFFFF";
        ctxText.fillText("PM", 150, hudText.height - imgHeight + 66);
        ctxText.fillStyle = "#025660";
        ctxText.fillText("PM", 150, hudText.height - imgHeight + 65);
    }

    // Draw the day of the week text
    ctxText.font = "30px Arial";
    ctxText.fillStyle = "#421F0F";
    var dayOfWeek = ""
    switch(date.getDay())
    {
        case 0:
            dayOfWeek = "Su";
            break;
        case 1:
            dayOfWeek = "Mo";
            break;
        case 2:
            dayOfWeek = "Tu";
            break;
        case 3:
            dayOfWeek = "We";
            break;
        case 4:
            dayOfWeek = "Th";
            break;
        case 5:
            dayOfWeek = "Fr";
            break;
        case 6:
            dayOfWeek = "Sa";
            break;
    }
    ctxText.fillText(dayOfWeek, 137.5, hudText.height - imgHeight + 27.5);
}

function drawChatHUD(inputHandler, hud, hudText)
{
    var ctx = hud.getContext("2d");
    var ctxText = hudText.getContext("2d");

    var imgWidth = hud.width/1.2;
    var imgHeight = 411/1.5;

    // Draw the hud element image
    var img = new Image();
    img.src = "ui/chatui.png";
    ctx.drawImage(img, (hud.width - hud.width/1.2)/2, hud.height - imgHeight - 15, imgWidth, imgHeight);

    // Draw the name text
    ctxText.font = "30px Arial";
    ctxText.fillStyle = "#000000";
    ctxText.textAlign = "center"; 
    ctxText.fillText(inputHandler.talkingToVillager, (hud.width - hud.width/1.2)/2 + 135, hudText.height - imgHeight + 30);
}

function drawMap(inputHandler)
{
    var testCube = new Cube(nonTexturedShader, null, 0, 0, 5);
    inputHandler.scene.addGeometry(testCube);

    // Load grass texture and add ground plane to scene with that texture.
    inputHandler.readTexture("objs/acgrass.png", function(image) {
        var plane = new Plane(texturedShader, image);
        inputHandler.scene.addGeometry(plane);
    });

    // load player shirt texture, apply it to a Player object, and
    // replace inputHandler's Player with the new textured object
    inputHandler.readTexture("objs/playertexture3.png", function(image) {
        //var headTex = inputHandler.readTexture("objs/playerface.png");
        inputHandler.player = new Player(texturedShader, image);
        inputHandler.scene.addGeometry(inputHandler.player);
    });

    drawVillagers(inputHandler);
    drawTrees(inputHandler);
}

function drawVillagers(inputHandler)
{
    inputHandler.readTexture("objs/playertexture3.png", function(image) {
        var lucky = new Villager(texturedShader, image, "Lucky", 2, 0, 2);
        inputHandler.scene.addGeometry(lucky);
    });

    inputHandler.readTexture("objs/playertexture3.png", function(image) {
        var isabelle = new Villager(texturedShader, image, "Isabelle", -2, 0, 2);
        inputHandler.scene.addGeometry(isabelle);
    });
}

function drawTrees(inputHandler)
{
    inputHandler.readTexture("objs/treetexture2.png", function(image) {
        //var headTex = inputHandler.readTexture("objs/playerface.png");
        var lucky = new Tree(texturedShader, image, 3, 0, 5);
        inputHandler.scene.addGeometry(lucky);
    });
}

// ========== END OF FUNCTIONS ========== //


// inputHandler.readTexture("objs/cobble.jpg", function(image) {
    //     //var startCube = new Cube(texturedShader, image, 0, 0, 0);
    //     //scene.addGeometry(startCube);
  
    //     // Hardcoded array of world layout
    //     // VALUES 1-4 specify regular stacks
    //     // VALUE    5 specifies a door
    //     var blocksArray = [[4, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 5, 5, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 4], 
    //                        [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    //                        [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    //                        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    //                        [3, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 4, 5, 5, 4, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 0, 0, 0, 3], 
    //                        [4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 4],
    //                        [4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 4],
    //                        [3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3],
    //                        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
    //                        [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    //                        [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    //                        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    //                        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
    //                        [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    //                        [4, 5, 5, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 4],
    //                        [5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5],
    //                        [5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5], 
    //                        [4, 5, 5, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 4],
    //                        [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    //                        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    //                        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
    //                        [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    //                        [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    //                        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    //                        [3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3], 
    //                        [4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 4],
    //                        [4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 4],
    //                        [3, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 4, 5, 5, 4, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 0, 0, 0, 3],
    //                        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
    //                        [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    //                        [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    //                        [4, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 5, 5, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4, 4]];
    //     // Generate cubes as specified by array
    //     for (var i=0; i<blocksArray.length; i++) {
    //         for (var j=0; j<blocksArray[0].length; j++) {
    //             if (blocksArray[i][j] == 5) {
    //                 //var cube = new Cube(texturedShader, image, i, 2, j);
    //                 //scene.addGeometry(cube);
    //             }
    //             else{
    //                 for (var k=0; k<blocksArray[i][j]; k++) {
    //                     //var cube = new Cube(texturedShader, image, i, k, j);
    //                     //scene.addGeometry(cube);
    //                 }
    //             }
    //         }
    //     }
    // });
