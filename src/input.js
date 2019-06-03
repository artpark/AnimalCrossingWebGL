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
    constructor(canvas, scene, camera, player, particle) {
        this.canvas = canvas;
        this.scene  = scene;
        this.camera = camera;
        this.player = player;
        this.particle = particle;

        this.clicking = false;

        _inputHandler = this;
        
        // Input booleans
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.sprint = false;

        // Movement constants
        this.truckSpeed = 0.3;
        this.dollySpeed = 0.3;
        this.diagScalar = 0.7;

        // Dialogue with villagers
        this.isTalking = false;
        this.talkingToVillager = null;
        
        // Keyboard Events
        document.addEventListener('keydown', function(ev) { _inputHandler.keyDown(ev); }, false);
        document.addEventListener('keyup',   function(ev) { _inputHandler.keyUp(ev);   }, false);
    }

    update()
    {
      var geometriesArr = _inputHandler.scene.geometries;
      _inputHandler.isTalking = false;
      _inputHandler.talkingToVillager = null;
      _inputHandler.camera.lerpZoom(70, 3);
      for(var geoI = 0; geoI < geometriesArr.length; geoI++)
      {
        if(geometriesArr[geoI] == _inputHandler.player) {continue;}
        else
        {
          if(_inputHandler.testAABBAABB(_inputHandler.player, geometriesArr[geoI]))
          {
            // Check which way the player can still move //
            // Store original center point
            var originalCenter = _inputHandler.player.centerPoint;

            //Up
            _inputHandler.player.centerPoint = new Vector3([originalCenter.elements[0], originalCenter.elements[1], originalCenter.elements[2] + _inputHandler.dollySpeed * 2]);
            if(_inputHandler.testAABBAABB(_inputHandler.player, geometriesArr[geoI])) {_inputHandler.up = false;}
            //Down
            _inputHandler.player.centerPoint = new Vector3([originalCenter.elements[0], originalCenter.elements[1], originalCenter.elements[2] - _inputHandler.dollySpeed * 2]);
            if(_inputHandler.testAABBAABB(_inputHandler.player, geometriesArr[geoI])) {_inputHandler.down = false;}
            //Left
            _inputHandler.player.centerPoint = new Vector3([originalCenter.elements[0] + _inputHandler.truckSpeed * 2, originalCenter.elements[1], originalCenter.elements[2]]);
            if(_inputHandler.testAABBAABB(_inputHandler.player, geometriesArr[geoI])) {_inputHandler.left = false;}
            //Right
            _inputHandler.player.centerPoint = new Vector3([originalCenter.elements[0] - _inputHandler.truckSpeed * 2, originalCenter.elements[1], originalCenter.elements[2]]);
            if(_inputHandler.testAABBAABB(_inputHandler.player, geometriesArr[geoI])) {_inputHandler.right = false;}

            // Reset player's center point
            _inputHandler.player.centerPoint = originalCenter;

            // Check to see if the player has collided with a villager
            if(geometriesArr[geoI] instanceof Villager)
            {
              //If so, initiate dialogue and camera zoom
              _inputHandler.camera.lerpZoom(35, 1.2);
              _inputHandler.isTalking = true;
              _inputHandler.talkingToVillager = geometriesArr[geoI];
            }
          }
        }
      }

      var currAngle = _inputHandler.player.currentAngle;
      // Movement left + up
      if (_inputHandler.left && _inputHandler.up)
      {
         _inputHandler.camera.truck(-_inputHandler.truckSpeed * _inputHandler.diagScalar);
         _inputHandler.camera.dolly(-_inputHandler.dollySpeed * _inputHandler.diagScalar);
         if(Math.abs(225 - currAngle) > Math.abs(-135 - currAngle)) {_inputHandler.player.faceAngle(-135);}
         else {_inputHandler.player.faceAngle(225);}
      }
      // Movement right + up
      else if (_inputHandler.right && _inputHandler.up)
      {
         _inputHandler.camera.truck( _inputHandler.truckSpeed * _inputHandler.diagScalar);
         _inputHandler.camera.dolly(-_inputHandler.dollySpeed * _inputHandler.diagScalar);
         if(Math.abs(135 - currAngle) > Math.abs(-255 - currAngle)) {_inputHandler.player.faceAngle(-255);}
         else {_inputHandler.player.faceAngle(135);}
      }
      // Movement right + down
      else if (_inputHandler.right && _inputHandler.down)
      {
         _inputHandler.camera.truck( _inputHandler.truckSpeed * _inputHandler.diagScalar);
         _inputHandler.camera.dolly( _inputHandler.dollySpeed * _inputHandler.diagScalar);
         if(Math.abs(45 - currAngle) > Math.abs(-315 - currAngle)) {_inputHandler.player.faceAngle(-315);}
         else {_inputHandler.player.faceAngle(45);}
      }
      // Movement left + down
      else if (_inputHandler.left && _inputHandler.down)
      {
         _inputHandler.camera.truck(-_inputHandler.truckSpeed * _inputHandler.diagScalar);
         _inputHandler.camera.dolly( _inputHandler.dollySpeed * _inputHandler.diagScalar);
         if(Math.abs(315 - currAngle) > Math.abs(-45 - currAngle)) {_inputHandler.player.faceAngle(-45);}
         else {_inputHandler.player.faceAngle(315);}
      }
      // Movement left
      else if(_inputHandler.left) 
      {
          _inputHandler.camera.truck(-_inputHandler.truckSpeed);
          if(Math.abs(270 - currAngle) > Math.abs(-90 - currAngle)) {_inputHandler.player.faceAngle(-90);
                                                                     _inputHandler.particle.faceAngle(-90);}
          else {_inputHandler.player.faceAngle(270);
                _inputHandler.particle.faceAngle(270);}
      }
      // Movement right
      else if(_inputHandler.right)
      {
          _inputHandler.camera.truck(_inputHandler.truckSpeed);
          if(Math.abs(90 - currAngle) > Math.abs(-270 - currAngle)) {_inputHandler.player.faceAngle(-270);
                                                                     _inputHandler.particle.faceAngle(-270);}
          else {_inputHandler.player.faceAngle(90);
                _inputHandler.particle.faceAngle(90);}
      }
      // Movement up
      else if(_inputHandler.up)
      {
          _inputHandler.camera.dolly(-_inputHandler.dollySpeed);
          if(Math.abs(180 - currAngle) > Math.abs(-180 - currAngle)) {_inputHandler.player.faceAngle(-180);
                                                                      _inputHandler.particle.faceAngle(-180);}
          else {_inputHandler.player.faceAngle(180);
                _inputHandler.particle.faceAngle(180);}
      }
      // Movement down
      else if(_inputHandler.down)
      {
          _inputHandler.camera.dolly(_inputHandler.dollySpeed);
          if(Math.abs(0 - currAngle) > Math.abs(360 - currAngle)) {_inputHandler.player.faceAngle(360);
                                                                   _inputHandler.particle.faceAngle(360);}
          else if(currAngle < -180) {_inputHandler.player.faceAngle(-360);
                                     _inputHandler.particle.faceAngle(-360);}
          else {_inputHandler.player.faceAngle(0);
                _inputHandler.particle.faceAngle(0);}
      }

      _inputHandler.player.modelMatrix.setTranslate(_inputHandler.camera.eye.elements[0], 0, _inputHandler.camera.eye.elements[2] + 3);
      _inputHandler.particle.modelMatrix.setTranslate(_inputHandler.camera.eye.elements[0]+0.4, 0, _inputHandler.camera.eye.elements[2]+3.3);
    }

    testAABBAABB(geometryA, geometryB)
    {
      if (geometryA.centerPoint == null || geometryA.halfWidth == null || geometryB.centerPoint == null || geometryB.halfWidth == null) {return false;}
      if (Math.abs(geometryA.centerPoint.elements[0] - geometryB.centerPoint.elements[0]) > (geometryA.halfWidth.elements[0] + geometryB.halfWidth.elements[0]) ) {return false;}
      if (Math.abs(geometryA.centerPoint.elements[1] - geometryB.centerPoint.elements[1]) > (geometryA.halfWidth.elements[1] + geometryB.halfWidth.elements[1]) ) {return false;}
      if (Math.abs(geometryA.centerPoint.elements[2] - geometryB.centerPoint.elements[2]) > (geometryA.halfWidth.elements[2] + geometryB.halfWidth.elements[2]) ) {return false;}
  
      // We have an overlap
      return true;
    }

    absVector3(vector)
    {
      return (new Vector3([Math.abs(vector.elements[0]), Math.abs(vector.elements[1]), Math.abs(vector.elements[2])]));
    }

    keyDown(ev) {
        var keyName = event.key;
        //console.log("key down", keyName);

        if(keyName == "Shift") {
          //if (this.left || this.right || this.up || this.down) {
            this.sprint = true;
          //}
          this.truckSpeed = 0.6;
          this.dollySpeed = 0.6;
        }
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
    
        if(keyName == "Shift") {
          this.sprint = false;
          this.truckSpeed = 0.3;
          this.dollySpeed = 0.3;
        }
        if(keyName == "a" || keyName == "A" || keyName == "ArrowLeft") {
          _inputHandler.left = false;
          //_inputHandler.sprint = false;
        }
        if(keyName == "d" || keyName == "D" || keyName == "ArrowRight") {
          _inputHandler.right = false;
          //_inputHandler.sprint = false;
        }
        if(keyName == "w" || keyName == "W" || keyName == "ArrowUp") {
          _inputHandler.up = false;
          //_inputHandler.sprint = false;
        }
        if(keyName == "s" || keyName == "S" || keyName == "ArrowDown") {
          _inputHandler.down = false;
          //_inputHandler.sprint = false;
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