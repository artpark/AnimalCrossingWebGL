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
        
        // Input booleans
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        // Movement constants
        this.truckSpeed = 0.3;
        this.dollySpeed = 0.3;

        // Keyboard Events
        document.addEventListener('keydown', function(ev) { _inputHandler.keyDown(ev); }, false);
        document.addEventListener('keyup',   function(ev) { _inputHandler.keyUp(ev);   }, false);

    }

    update()
    {
      var currAngle = _inputHandler.player.currentAngle;
      // Movement left
      if(_inputHandler.left) 
      {
          _inputHandler.camera.truck(-_inputHandler.truckSpeed);
          if(Math.abs(270 - currAngle) > Math.abs(-90 - currAngle)) {_inputHandler.player.faceAngle(-90);}
          else {_inputHandler.player.faceAngle(270);}
      }
      // Movement right
      if(_inputHandler.right)
      {
          _inputHandler.camera.truck(_inputHandler.truckSpeed);
          if(Math.abs(90 - currAngle) > Math.abs(-270 - currAngle)) {_inputHandler.player.faceAngle(-270);}
          else {_inputHandler.player.faceAngle(90);}
      }
      // Movement up
      if(_inputHandler.up)
      {
          _inputHandler.camera.dolly(-_inputHandler.dollySpeed);
          if(Math.abs(180 - currAngle) > Math.abs(-180 - currAngle)) {_inputHandler.player.faceAngle(-180);}
          else {_inputHandler.player.faceAngle(180);}
      }
      // Movement down
      if(_inputHandler.down)
      {
          _inputHandler.camera.dolly(_inputHandler.dollySpeed);
          if(Math.abs(0 - currAngle) > Math.abs(360 - currAngle)) {_inputHandler.player.faceAngle(360);}
          else if(currAngle < -180) {_inputHandler.player.faceAngle(-360);}
          else {_inputHandler.player.faceAngle(0);}
      }
      
      _inputHandler.player.modelMatrix.setTranslate(_inputHandler.camera.eye.elements[0], 0, _inputHandler.camera.eye.elements[2] + 3);
      requestAnimationFrame(_inputHandler.update);
    }

    keyDown(ev) {
        var keyName = event.key;
        console.log("key down", keyName);
    
        if(keyName == "a" || keyName == "A" || keyName == "ArrowLeft") {
          _inputHandler.left = true;
        }
        if(keyName == "d" || keyName == "D" || keyName == "ArrowRight") {
          _inputHandler.right = true;
        }
        if(keyName == "w" || keyName == "W" || keyName == "ArrowUp") {
          _inputHandler.up = true;
        }
        if(keyName == "s" || keyName == "S" || keyName == "ArrowDown") {
          _inputHandler.down = true;
        }
      }
    
      keyUp(ev) {
        var keyName = event.key;
        console.log("key up", keyName);
    
        if(keyName == "a" || keyName == "A" || keyName == "ArrowLeft") {
          _inputHandler.left = false;
        }
        if(keyName == "d" || keyName == "D" || keyName == "ArrowRight") {
          _inputHandler.right = false;
        }
        if(keyName == "w" || keyName == "W" || keyName == "ArrowUp") {
          _inputHandler.up = false;
        }
        if(keyName == "s" || keyName == "S" || keyName == "ArrowDown") {
          _inputHandler.down = false;
        }
      }

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