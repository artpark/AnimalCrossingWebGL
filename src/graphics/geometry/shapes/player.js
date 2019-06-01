/**
 * Specifies a player. A subclass of geometry.
 * Interaction functions should go here.
 *
 * @author Terence So
 * @this {Cube}
 */
class Player extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Square} Square created
   */
  constructor(shader)
  {
        super(shader);
        
        this.Tx = 0;
        this.Ty = 0;
        this.Tz = 0;

        this.vertices = this.generatePlayerVertices(this.Tx, this.Ty, this.Tz);
        this.faces = {0: this.vertices};
        //this.image = image;

        this.currentAngle = 0;
        this.lerpConstant = 0.04;
        this.rotationMatrix = new Matrix4();

        // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
        this.interleaveVertices();
  }

  render()
  {
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
    //console.log(this.currentAngle);
  }

  generatePlayerVertices(Tx, Ty, Tz)
  {
      var vertices = []
      var segConstant = Math.PI / 3;  // for vertice generation calculations
      var torsoW = 0.3;               // scalar for torso width
      var torsoH = 0.6;               // scalar for torso height
      var topScalar = 0.7;

      // generate torso vertices
      for (var i = 0; i < 6; i++) {
        // create vertices
        var vertex1 = new Vertex(             torsoW*Math.cos(    i * segConstant)+Tx,      0, torsoW * Math.sin(    i * segConstant)+Tz);
        var vertex2 = new Vertex(             torsoW*Math.cos((i+1) * segConstant)+Tx,      0, torsoW * Math.sin((i+1) * segConstant)+Tz);
        var vertex3 = new Vertex( topScalar * torsoW*Math.cos((i+1) * segConstant)+Tx, torsoH, topScalar * torsoW * Math.sin((i+1) * segConstant)+Tz);
        var vertex4 = new Vertex(             torsoW*Math.cos(    i * segConstant)+Tx,      0, torsoW * Math.sin(    i * segConstant)+Tz);
        var vertex5 = new Vertex( topScalar * torsoW*Math.cos((i+1) * segConstant)+Tx, torsoH, topScalar * torsoW * Math.sin((i+1) * segConstant)+Tz);
        var vertex6 = new Vertex( topScalar * torsoW*Math.cos(    i * segConstant)+Tx, torsoH, topScalar * torsoW * Math.sin(    i * segConstant)+Tz);
        // set vertice colors
        vertex1.color = [0.5, 0.0, 0.0, 1.0];
        vertex2.color = [0.5, 0.0, 0.0, 1.0];
        vertex3.color = [0.8, 0.0, 0.0, 1.0];
        vertex4.color = [0.5, 0.0, 0.0, 1.0];
        vertex5.color = [0.8, 0.0, 0.0, 1.0];
        vertex6.color = [0.8, 0.0, 0.0, 1.0];
        // push vertices
        vertices.push(vertex1);
        vertices.push(vertex2);
        vertices.push(vertex3);
        vertices.push(vertex4);
        vertices.push(vertex5);
        vertices.push(vertex6);
      }

      return vertices;
  }
}
