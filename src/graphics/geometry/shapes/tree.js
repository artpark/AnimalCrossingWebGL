/**
 * Specifies a tree. A subclass of geometry.
 *
 * @author Terence So
 * @this {Cube}
 */
class Tree extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Tree} shader Shading object used to shade geometry
   * @returns {Tree} Tree created
   */
  constructor(shader, image, Tx, Ty, Tz)
  {
        super(shader);

        this.vertices = this.generateTreeVertices(Tx, Ty, Tz);
        this.faces = {0: this.vertices};
        this.image = image; // testing

        //AABB vs AABB
          this.centerPoint = new Vector3([Tx, Ty, Tz]);
          this.halfWidth = new Vector3([0.4,0.4,0.4]);

        // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
        this.interleaveVertices();
  }

  generateTreeVertices(Tx, Ty, Tz)
  {
      var vertices = []
      var segConstant = Math.PI / 3;  // for vertice generation calculations
      var torsoW =    0.3;            // scalar for torso width
      var torsoH =    0.6;            // scalar for torso height
      var topScalar = 0.7;            // scalar for torso cone shape

      var headW = 0.7;
      var headH = 0.4;

      // generate trunk vertices
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
        vertex1.texCoord = [0.0, 0.1];
        vertex2.texCoord = [0.1, 0.1];
        vertex3.texCoord = [0.1, 0.1];
        vertex4.texCoord = [0.0, 0.1];
        vertex5.texCoord = [0.1, 0.1];
        vertex6.texCoord = [0.0, 0.1];
        // push vertices
        vertices.push(vertex1);
        vertices.push(vertex2);
        vertices.push(vertex3);
        vertices.push(vertex4);
        vertices.push(vertex5);
        vertices.push(vertex6);
      }

      // generate layer1 vertices
      for (var i = 0; i < 6; i++)
      {
        // create vertices
        var vertex7 = new Vertex(  1.3*headW*Math.cos((i+1) * segConstant)+Tx, torsoH+0.2, 1.3*headW * Math.sin((i+1) * segConstant)+Tz);
        var vertex8 = new Vertex(  1.3*headW*Math.cos(    i * segConstant)+Tx, torsoH+0.2, 1.3*headW * Math.sin(    i * segConstant)+Tz);
        var vertex9 = new Vertex(                                          Tx, torsoH+0.6,                                           Tz);
        // set texture coordinates
        vertex7.texCoord = [0.0, 0.5];
        vertex8.texCoord = [0.1, 1.0];
        vertex9.texCoord = [1.0, 1.0];

        
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

      // generate layer2 vertices
      for (var i = 0; i < 6; i++)
      {
        var vertex7 = new Vertex(  headW*Math.cos((i+1) * segConstant)+Tx, torsoH+0.5, headW * Math.sin((i+1) * segConstant)+Tz);
        var vertex8 = new Vertex(  headW*Math.cos(    i * segConstant)+Tx, torsoH+0.5, headW * Math.sin(    i * segConstant)+Tz);
        var vertex9 = new Vertex(                                      Tx, torsoH+0.9,                                       Tz);
        // set texture coordinates
        vertex7.texCoord = [0.0, 0.5];
        vertex8.texCoord = [0.5, 1.0];
        vertex9.texCoord = [1.0, 1.0];

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

      // generate layer3 vertices
      for (var i = 0; i < 6; i++)
      {
        var vertex7 = new Vertex(  0.7 * headW*Math.cos((i+1) * segConstant)+Tx, torsoH+0.8, headW * Math.sin((i+1) * segConstant)+Tz);
        var vertex8 = new Vertex(  0.7 * headW*Math.cos(    i * segConstant)+Tx, torsoH+0.8, headW * Math.sin(    i * segConstant)+Tz);
        var vertex9 = new Vertex(                                      Tx, torsoH+1.4,                                       Tz);
        // set texture coordinates
         // set texture coordinates
        vertex7.texCoord = [0.0, 0.5];
        vertex8.texCoord = [0.5, 1.0];
        vertex9.texCoord = [1.0, 1.0];
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
