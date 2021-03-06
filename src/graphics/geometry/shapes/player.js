/**
 * Specifies a player. A subclass of geometry.
 * Interaction functions should go here.
 *
 * @author Terence So
 * @this {Cube}
 */
class Player extends Geometry {
  /**
   * Constructor for Player.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Player} Playervxcz created
   */
  constructor(shader, image)
  {
        super(shader);
        
        this.Tx = 0;
        this.Ty = 0;
        this.Tz = 0;

        this.vertices = this.generatePlayerVertices(this.Tx, this.Ty, this.Tz);
        this.faces = {0: this.vertices};
        this.image = image; // testing

        this.currentAngle = 0;
        this.lerpConstant = 0.05;
        this.rotationMatrix = new Matrix4();

        //AABB vs AABB
        var processedPosition = this.modelMatrix.multiplyVector3(new Vector3([this.Tx, this.Ty, this.Tz]));
        this.centerPoint = new Vector3([processedPosition.elements[0], processedPosition.elements[1], processedPosition.elements[2]]);
        this.halfWidth = new Vector3([0.4,0.4,0.6]);

        // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
        this.interleaveVertices();
  }

  render()
  {
    var processedPosition = this.modelMatrix.multiplyVector3(new Vector3([this.Tx, this.Ty, this.Tz]));
    this.centerPoint = new Vector3([processedPosition.elements[0], processedPosition.elements[1], processedPosition.elements[2]]);
    this.modelMatrix.multiply(this.rotationMatrix);
    super.render();
  }

  faceAngle(turnToAngle)
  {
    if(this.currentAngle >= 270)
    {
      this.currentAngle -= 360;
    }
    if(this.currentAngle <= -270)
    {
      this.currentAngle += 360;
    }
    this.currentAngle = ((this.lerpConstant) * (turnToAngle) + (1 - this.lerpConstant) * (this.currentAngle) % 360);
    this.rotationMatrix.setRotate(this.currentAngle, 0, 1, 0);
  }

  generatePlayerVertices(Tx, Ty, Tz)
  {
      var vertices = []
      var segConstant = Math.PI / 3;  // for vertice generation calculations

      var shadowW = 0.28;

      var torsoW =    0.28;            // scalar for torso width ; prev 25
      var torsoH =    0.6;            // scalar for torso height
      var topScalar = 0.7;            // scalar for torso cone shape

      var headW = 0.3;
      var headH = 0.4;

      // generate shadow vertices
      for (var i = 0; i < 6; i++)
      {
        // create vertices
        var vertex1 = new Vertex(  shadowW*Math.cos((i+1) * segConstant)+Tx, 0.01, shadowW * Math.sin((i+1) * segConstant)+Tz);
        var vertex2 = new Vertex(  shadowW*Math.cos(    i * segConstant)+Tx, 0.01, shadowW * Math.sin(    i * segConstant)+Tz);
        var vertex3 = new Vertex(                                        Tx, 0.01,                                         Tz);      
        // set vertex color
        vertex1.texCoord = [0.0, 0.9999];
        vertex2.texCoord = [0.1, 0.9999];
        vertex3.texCoord = [0.1, 1.0];
        // push vertices
        vertices.push(vertex1);
        vertices.push(vertex2);
        vertices.push(vertex3);
      }

      // generate torso vertices
      for (var i = 0; i < 6; i++)
      {
        // create vertices
        var vertex1 = new Vertex(             torsoW*Math.cos(    i * segConstant)+Tx,      0.3, torsoW * Math.sin(    i * segConstant)+Tz);
        var vertex2 = new Vertex(             torsoW*Math.cos((i+1) * segConstant)+Tx,      0.3, torsoW * Math.sin((i+1) * segConstant)+Tz);
        var vertex3 = new Vertex( topScalar * torsoW*Math.cos((i+1) * segConstant)+Tx, torsoH, topScalar * torsoW * Math.sin((i+1) * segConstant)+Tz);
        var vertex4 = new Vertex(             torsoW*Math.cos(    i * segConstant)+Tx,      0.3, torsoW * Math.sin(    i * segConstant)+Tz);
        var vertex5 = new Vertex( topScalar * torsoW*Math.cos((i+1) * segConstant)+Tx, torsoH, topScalar * torsoW * Math.sin((i+1) * segConstant)+Tz);
        var vertex6 = new Vertex( topScalar * torsoW*Math.cos(    i * segConstant)+Tx, torsoH, topScalar * torsoW * Math.sin(    i * segConstant)+Tz);
        // set texture coordinates
        
        if (i == 4) // front face
        {
          vertex1.texCoord = [0.0, 0.0];
          vertex2.texCoord = [0.5, 0.0];
          vertex3.texCoord = [0.4, 0.55];
          vertex4.texCoord = [0.0, 0.0];
          vertex5.texCoord = [0.4, 0.55];
          vertex6.texCoord = [0.1, 0.55];
        }
        /*else  // side faces
        {
          vertex1.texCoord = [0.0, 0.1];
          vertex2.texCoord = [0.1, 0.1];
          vertex3.texCoord = [0.1, 0.1];
          vertex4.texCoord = [0.0, 0.1];
          vertex5.texCoord = [0.1, 0.1];
          vertex6.texCoord = [0.0, 0.1];
        }*/
        else  // side faces
        {
          vertex1.texCoord = [0.5, 0.0];
          vertex2.texCoord = [1.0, 0.0];
          vertex3.texCoord = [0.9, 0.55];
          vertex4.texCoord = [0.5, 0.0];
          vertex5.texCoord = [0.9, 0.55];
          vertex6.texCoord = [0.5, 0.55];
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
}
