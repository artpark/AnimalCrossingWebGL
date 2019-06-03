/**
 * Specifies a Villager. A subclass of geometry.
 * Interaction functions should go here.
 *
 * @author Terence So
 * @this {Cube}
 */
class Villager extends Geometry {
    /**
     * Constructor for Villager.
     *
     * @constructor
     * @param {Shader} shader Shading object used to shade geometry
     * @returns {Villager} Villager created
     */
    constructor(shader, image, name, Tx, Ty, Tz)
    {
          super(shader);
          this.Tx = Tx;
          this.Ty = Ty;
          this.Tz = Tz;

          this.vertices = this.generateVillagerVertices(this.Tx, this.Ty, this.Tz);
          this.faces = {0: this.vertices};
          this.image = image;

          // Rotations
          this.currentAngle = 0;
          this.lerpConstant = 0.05;
          this.rotationMatrix = new Matrix4();

          // Dialogue variables
          this.name = name;
          this.dialogueGenerator = new DialogueGenerator();
          this.dialogue = this.dialogueGenerator.generate();

          // Random walking variables
          this.speed = 0.005;
          this.walkDirection = Math.random() * 360;
          this.walkDuration = Math.floor((Math.random() * 120) + 130);

          // AABB vs AABB
          this.centerPoint = new Vector3([this.Tx, this.Ty, this.Tz]);
          this.halfWidth = new Vector3([0.4,0.4,0.4]);
  
          // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
          this.interleaveVertices();
    }
  
    render()
    {
      var translateToOrigin = new Matrix4();
      var modelMatrixCopy = new Matrix4();
      modelMatrixCopy.set(this.modelMatrix);
      translateToOrigin.setTranslate(this.Tx, this.Ty, this.Tz);
      modelMatrixCopy.multiply(translateToOrigin);
      modelMatrixCopy.multiply(this.rotationMatrix);
      translateToOrigin.setTranslate(-this.Tx, -this.Ty, -this.Tz);
      modelMatrixCopy.multiply(translateToOrigin);
      
      this.shader.setUniform("u_ModelMatrix", modelMatrixCopy.elements);
    }

    generateVillagerVertices(Tx, Ty, Tz)
    {
      var vertices = []
      var segConstant = Math.PI / 3;  // for vertice generation calculations
      var torsoW =    0.2;            // scalar for torso width
      var torsoH =    0.6;            // scalar for torso height
      var topScalar = 0.7;            // scalar for torso cone shape

      var headW = 0.3;
      var headH = 0.4;

      // generate torso vertices
      for (var i = 0; i < 6; i++)
      {
        // create vertices
        var vertex1 = new Vertex(             torsoW*Math.cos(    i * segConstant)+Tx,      0, torsoW * Math.sin(    i * segConstant)+Tz);
        var vertex2 = new Vertex(             torsoW*Math.cos((i+1) * segConstant)+Tx,      0, torsoW * Math.sin((i+1) * segConstant)+Tz);
        var vertex3 = new Vertex( topScalar * torsoW*Math.cos((i+1) * segConstant)+Tx, torsoH, topScalar * torsoW * Math.sin((i+1) * segConstant)+Tz);
        var vertex4 = new Vertex(             torsoW*Math.cos(    i * segConstant)+Tx,      0, torsoW * Math.sin(    i * segConstant)+Tz);
        var vertex5 = new Vertex( topScalar * torsoW*Math.cos((i+1) * segConstant)+Tx, torsoH, topScalar * torsoW * Math.sin((i+1) * segConstant)+Tz);
        var vertex6 = new Vertex( topScalar * torsoW*Math.cos(    i * segConstant)+Tx, torsoH, topScalar * torsoW * Math.sin(    i * segConstant)+Tz);
        // set texture coordinates
        
        if (i == 4) // front face
        {
          vertex1.texCoord = [0.0, -0.5];
          vertex2.texCoord = [0.5, -0.5];
          vertex3.texCoord = [0.4, 0.65];
          vertex4.texCoord = [0.0, -0.5];
          vertex5.texCoord = [0.4, 0.65];
          vertex6.texCoord = [0.1, 0.65];
        }
        else  // side faces
        {
          vertex1.texCoord = [0.0, 0.1];
          vertex2.texCoord = [0.1, 0.1];
          vertex3.texCoord = [0.1, 0.1];
          vertex4.texCoord = [0.0, 0.1];
          vertex5.texCoord = [0.1, 0.1];
          vertex6.texCoord = [0.0, 0.1];
        }
        // push vertices
        vertices.push(vertex1);
        vertices.push(vertex2);
        vertices.push(vertex3);
        vertices.push(vertex4);
        vertices.push(vertex5);
        vertices.push(vertex6);
      }

      // generate head vertices
      for (var i = 0; i < 6; i++)
      {
        // create vertices
        var vertex1 = new Vertex(  headW*Math.cos(    i * segConstant)+Tx,         torsoH, headW * Math.sin(    i * segConstant)+Tz);
        var vertex2 = new Vertex(  headW*Math.cos((i+1) * segConstant)+Tx,         torsoH, headW * Math.sin((i+1) * segConstant)+Tz);
        var vertex3 = new Vertex(  headW*Math.cos((i+1) * segConstant)+Tx, headH + torsoH, headW * Math.sin((i+1) * segConstant)+Tz);
        var vertex4 = new Vertex(  headW*Math.cos(    i * segConstant)+Tx,         torsoH, headW * Math.sin(    i * segConstant)+Tz);
        var vertex5 = new Vertex(  headW*Math.cos((i+1) * segConstant)+Tx, headH + torsoH, headW * Math.sin((i+1) * segConstant)+Tz);
        var vertex6 = new Vertex(  headW*Math.cos(    i * segConstant)+Tx, headH + torsoH, headW * Math.sin(    i * segConstant)+Tz);

        var vertex7 = new Vertex(  headW*Math.cos((i+1) * segConstant)+Tx, headH + torsoH, headW * Math.sin((i+1) * segConstant)+Tz);
        var vertex8 = new Vertex(  headW*Math.cos(    i * segConstant)+Tx, headH + torsoH, headW * Math.sin(    i * segConstant)+Tz);
        var vertex9 = new Vertex(                                      Tx, headH + torsoH+0.15,                                  Tz);
        // set texture coordinates
        
        if (i == 4) // front face
        {
          vertex1.texCoord = [0.0, 0.5];
          vertex2.texCoord = [0.5, 0.5];
          vertex3.texCoord = [0.5, 1.0];
          vertex4.texCoord = [0.0, 0.5];
          vertex5.texCoord = [0.5, 1.0];
          vertex6.texCoord = [0.0, 1.0];
          //top
          vertex7.texCoord = [0.0, 0.9999];
          vertex8.texCoord = [0.1, 0.9999];
          vertex9.texCoord = [0.1, 1.0];
        }
        else if (i == 5 || i == 3)
        {
          vertex1.texCoord = [0.7, 0.5];
          vertex2.texCoord = [1.0, 0.5];
          vertex3.texCoord = [1.0, 1.0];
          vertex4.texCoord = [0.7, 0.5];
          vertex5.texCoord = [1.0, 1.0];
          vertex6.texCoord = [0.7, 1.0];
          //top
          vertex7.texCoord = [0.0, 0.9999];
          vertex8.texCoord = [0.1, 0.9999];
          vertex9.texCoord = [0.1, 1.0];
        }
        else if (i == 2 || i == 0)
        {
          vertex1.texCoord = [0.7, 0.6];
          vertex2.texCoord = [1.0, 0.6];
          vertex3.texCoord = [1.0, 1.0];
          vertex4.texCoord = [0.7, 0.6];
          vertex5.texCoord = [1.0, 1.0];
          vertex6.texCoord = [0.7, 1.0];
          //top
          vertex7.texCoord = [0.0, 0.9999];
          vertex8.texCoord = [0.1, 0.9999];
          vertex9.texCoord = [0.1, 1.0];
        }
        else  // side faces
        {
          vertex1.texCoord = [0.7, 0.7];
          vertex2.texCoord = [1.0, 0.7];
          vertex3.texCoord = [1.0, 1.0];
          vertex4.texCoord = [0.7, 0.7];
          vertex5.texCoord = [1.0, 1.0];
          vertex6.texCoord = [0.7, 1.0];
          //top
          vertex7.texCoord = [0.0, 0.9999];
          vertex8.texCoord = [0.1, 0.9999];
          vertex9.texCoord = [0.1, 1.0];
        }
        // push vertices
        vertices.push(vertex1);
        vertices.push(vertex2);
        vertices.push(vertex3);
        vertices.push(vertex4);
        vertices.push(vertex5);
        vertices.push(vertex6);
        vertices.push(vertex7);
        vertices.push(vertex8);
        vertices.push(vertex9);
      }
  
        return vertices;
    }

    // TO-DO: check collision for villagers and other geometries
    randomWalk(geometries)
    {
      // If timer is up, switch directions
      if(this.walkDuration == 0)
      {
        this.walkDirection = (this.walkDirection + ((Math.random() * 240) - 120)) % 360;
        if(this.walkDirection < 0) {this.walkDirection = (Math.random() * 360);}
        this.walkDuration = Math.floor((Math.random() * 120) + 130);
      }

      // Face specific angle
      this.faceAngle(this.walkDirection);

      // Move in that angle
      var translationMatrix = new Matrix4();
      var walkDirectionRadians = this.walkDirection * (Math.PI / 180);

      translationMatrix.setTranslate(-Math.sin(walkDirectionRadians) * this.speed, 0, -Math.cos(walkDirectionRadians) * this.speed);
      this.modelMatrix.multiply(translationMatrix);

      // Update center point for hit collision
      var processedPosition = this.modelMatrix.multiplyVector3(new Vector3([this.Tx, this.Ty, this.Tz]));
      this.centerPoint = new Vector3([processedPosition.elements[0], processedPosition.elements[1], processedPosition.elements[2]]);

      // Reduce the timer
      this.walkDuration--;
    }

    faceAngle(turnToAngle)
    {
      this.currentAngle = ((this.lerpConstant) * (turnToAngle) + (1 - this.lerpConstant) * (this.currentAngle)) % 360;
      this.rotationMatrix.setRotate(this.currentAngle, 0, 1, 0);
    }
  }
  