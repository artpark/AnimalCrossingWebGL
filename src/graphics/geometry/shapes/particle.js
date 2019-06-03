/**
 * Specifies the ground plane. A subclass of geometry.
 *
 * @author Terence So
 * @this {Triangle}
 */
class Particle extends Geometry {
  /**
   * Constructor for Plane.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Plane} Plane created
   */
  constructor(shader, image, Tx, Tz) {
      super(shader);
      
      this.level = 0.1;

      this.vertices = this.generateParticleVertices(this.level, Tx, Tz);
      this.faces = {0: [0, 1, 2]};
      
      this.image = image;

      this.timeLeft = 30.0;

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateParticleVertices(level, Tx, Tz) {
      var vertices = []

      // Vertex 0
      var vertex0 = new Vertex(-1.0, level, -1);
      vertex0.texCoord = [0.0, 0.0];
      vertices.push(vertex0);

      // Vertex1
      var vertex1 = new Vertex( 1.0, level, -1);
      vertex1.texCoord = [1.0, 0.0];
      vertices.push(vertex1);

      // Vertex 2
      var vertex2 = new Vertex( 1.0, level, 1);
      vertex2.texCoord = [1.0, 1.0];
      vertices.push(vertex2);

      // Vertex 3
      var vertex3 = new Vertex(-1.0, level, -1);
      vertex3.texCoord = [0.0, 0.0];
      vertices.push(vertex3);

      // Vertex 4
      var vertex4 = new Vertex( 1.0, level, 1);
      vertex4.texCoord = [1.0, 1.0];
      vertices.push(vertex4);

      // Vertex 5
      var vertex5 = new Vertex( -1.0, level, 1);
      vertex5.texCoord = [0.0, 1.0];
      vertices.push(vertex5);

      return vertices;
   }

   render() {
      //console.log(this.timeLeft);
      if (this.timeLeft <= 0){
         this.vertices = null;
      }
      else
         this.timeLeft--;
   }
}