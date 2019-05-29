var _inputHandler = null;

/**
 * Specifies a Input Handler. Used to parse input events from a HTML page.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */
class InputHandler {
    /**
     * Initializes the event handeling functions within the program.
     */
    constructor(canvas, scene, camera, player) {
      this.canvas = canvas;
      this.scene  = scene;
      this.camera = camera;
      this.player = player;

      this.clicking = false;

      _inputHandler = this;

      // Mouse Events
      //this.canvas.onmousedown = function(ev) { _inputHandler.mouseDown(ev) };
      //this.canvas.onmouseup   = function(ev) { _inputHandler.mouseUp(ev) };

      //this.canvas.onmousemove = function(ev) { _inputHandler.mouseMove(ev) };

      

      // Keyboard Events
      document.addEventListener('keydown', function(ev) { _inputHandler.keyDown(ev); }, false);
      document.addEventListener('keyup',   function(ev) { _inputHandler.keyUp(ev);   }, false);

      //document.getElementById("webgl").addEventListener("wheel", zoom);
      //document.addEventListener("wheel", function(ev) {_inputHandler.mouseWheel(ev); }, false);
    }

    /**
     * Function called upon mouse click.
     */
    /*mouseDown(ev) {
        // Print x,y coordinates.
        //console.log(ev.clientX, ev.clientY);
        this.clicking = true;
    }

    mouseUp(ev) {
         this.clicking = false;
    }

    mouseMove(ev) {
        var movementX = ev.movementX;
        var movementY = ev.movementY;

        if (this.clicking) {
            this.camera.pan(movementX);
            this.camera.tilt(movementY);
        }
    }

    mouseWheel(ev) {
       var deltaY = ev.deltaY;
       this.camera.fov(deltaY);
    }*/

    keyUp(ev) {
        var keyName = event.key;
        //console.log("key up", keyName);
    }

    keyDown(ev) {
        var keyName = event.key;
        //console.log("key down", keyName);

        if(keyName == "a") {
            this.camera.truck(-1);
            this.player.moveHor(-1);
        }
        if(keyName == "d") {
            this.camera.truck(1);
            this.player.moveHor(1);
        }
        if(keyName == "w") {
            this.camera.dolly(-1);
            this.player.moveVer(-1);
        }
        if(keyName == "s") {
            this.camera.dolly(1);
            this.player.moveVer(1);
        }

        /*else if(keyName == "z") {
            this.camera.swapPerspective();
        }*/
    }

    /**
     * Function called to read a selected file.
     */
    /*readSelectedFile() {
        var fileReader = new FileReader();
        var objFile = document.getElementById("fileInput").files[0];

        if (!objFile) {
            alert("OBJ file not set!");
            return;
        }

        fileReader.readAsText(objFile);
        fileReader.onloadend = function() {
            alert(fileReader.result);
        }
    }*/

    readTexture(src, onTexLoad) {
        // Create the image object
        var image = new Image();
        if (!image) {
          console.log('Failed to create the image object');
          return false;
        }

        // Register the event handler to be called on loading an image
        image.onload = function() {
            _inputHandler.image = image;
            onTexLoad(image);
        };

        // Tell the browser to load an image
        image.src = src
        return true;
    }
}