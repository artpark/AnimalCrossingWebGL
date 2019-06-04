/**
 * Specifies a particle. A subclass of geometry.
 * Interaction functions should go here.
 *
 * @author Terence So
 * @this {Particle}
 */
class Particle extends Geometry {
  /**
   * Constructor for Particle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Particle} Particle created
   */
  constructor(shader, image)
  {
        super(shader);
        
        this.Tx = 0;
        this.Ty = 0;
        this.Tz = 0;

        this.timeElapsed = 0.0;

        this.rot = 0;

        this.currentAngle = 0;
        this.lerpConstant = 0.05;
        this.rotationMatrix = new Matrix4();

        this.vertices = this.generateParticleVertices(this.Tx, this.Ty, this.Tz);
        this.faces = {0: this.vertices};
        this.image = image; // testing

        // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
        this.interleaveVertices();
  }

  render()
  {
      var transformation = new Matrix4();
      transformation.set(this.modelMatrix);
      var scaleMatrix = new Matrix4();
      var particleScalar = 1.5 - this.timeElapsed;
      scaleMatrix.setScale(particleScalar, particleScalar, particleScalar);
      this.rotationMatrix.setRotate(this.rot, 0, 1, 0);
      this.rot = (this.rot + 2) % 360;
      transformation.multiply(this.rotationMatrix);

      // if sprinting
      if (_inputHandler.sprint) {
         if (particleScalar > 0)
         {
            this.timeElapsed += 0.05;
         }
         else
         {
            this.modelMatrix.setTranslate(_inputHandler.camera.eye.elements[0], 0, _inputHandler.camera.eye.elements[2] + 3);
            this.timeElapsed = 0.0;
         }
         transformation.multiply(scaleMatrix);
         this.shader.setUniform("u_ModelMatrix", transformation.elements);
      }
      // if walking
      else{
         if (particleScalar > 0)
         {
            this.timeElapsed += 0.05;
         }
         transformation.multiply(scaleMatrix);
         this.shader.setUniform("u_ModelMatrix", transformation.elements);
         
      }
  }

  moveToCenter()
  {
      //console.log(this.timeElapsed);
      //if (this.timeElapsed == 0.0)
         this.modelMatrix.setTranslate(_inputHandler.camera.eye.elements[0], 0, _inputHandler.camera.eye.elements[2] + 3);
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
    //this.rotationMatrix.setRotate(this.currentAngle, 0, 1, 0);
  }

  generateParticleVertices(Tx, Ty, Tz)
  {
      var vertices = []
      var segConstant = Math.PI / 3;  // for vertice generation calculations

      var particleW = 0.1;
      var particleH = 0.1;

      // generate particle vertices
      for (var i = 0; i < 6; i++)
      {
        // create vertices
        var vertex1 = new Vertex(  particleW*Math.cos(    i * segConstant)+Tx,    Ty, particleW * Math.sin(    i * segConstant)+Tz);
        var vertex2 = new Vertex(  particleW*Math.cos((i+1) * segConstant)+Tx,    Ty, particleW * Math.sin((i+1) * segConstant)+Tz);
        var vertex3 = new Vertex(  particleW*Math.cos((i+1) * segConstant)+Tx, particleH, particleW * Math.sin((i+1) * segConstant)+Tz);
        var vertex4 = new Vertex(  particleW*Math.cos(    i * segConstant)+Tx,    Ty, particleW * Math.sin(    i * segConstant)+Tz);
        var vertex5 = new Vertex(  particleW*Math.cos((i+1) * segConstant)+Tx, particleH, particleW * Math.sin((i+1) * segConstant)+Tz);
        var vertex6 = new Vertex(  particleW*Math.cos(    i * segConstant)+Tx, particleH, particleW * Math.sin(    i * segConstant)+Tz);

        var vertex7 = new Vertex(  particleW*Math.cos((i+1) * segConstant)+Tx, particleH, particleW * Math.sin((i+1) * segConstant)+Tz);
        var vertex8 = new Vertex(  particleW*Math.cos(    i * segConstant)+Tx, particleH, particleW * Math.sin(    i * segConstant)+Tz);
        var vertex9 = new Vertex(                                      Tx, particleH+0.05,                                  Tz);
        // set texture coordinates
        vertex1.texCoord = [0.3, 0.31];
        vertex2.texCoord = [0.31, 0.31];
        vertex3.texCoord = [0.31, 0.31];
        vertex4.texCoord = [0.3, 0.31];
        vertex5.texCoord = [0.31, 0.31];
        vertex6.texCoord = [0.3, 0.31];

        vertex7.texCoord = [0.3, 0.31];
        vertex8.texCoord = [0.31, 0.31];
        vertex9.texCoord = [0.3, 0.31];
        
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
