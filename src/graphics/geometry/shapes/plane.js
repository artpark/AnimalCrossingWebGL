/**
 * Specifies the ground plane. A subclass of geometry.
 *
 * @author Terence So
 * @this {Triangle}
 */
class Plane extends Geometry {
  /**
   * Constructor for Plane.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Plane} Plane created
   */
  constructor(shader, image) {
      super(shader);
      
      this.vertices = this.generatePlaneVertices();
      this.faces = {0: [0, 1, 2]};
      this.level = -1.0;
      this.image = image;

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generatePlaneVertices() {
      var vertices = []

      // Vertex 0
      var vertex0 = new Vertex(-16.0, -1.0, -16);
      vertex0.texCoord = [0.0, 0.0];
      vertices.push(vertex0);

      // Vertex1
      var vertex1 = new Vertex( 16.0, -1.0, -16);
      vertex1.texCoord = [32.0, 0.0];
      vertices.push(vertex1);

      // Vertex 2
      var vertex2 = new Vertex( 16.0, -1.0, 16);
      vertex2.texCoord = [32.0, 32.0];
      vertices.push(vertex2);

      // Vertex 3
      var vertex3 = new Vertex(-16.0, -1.0, -16);
      vertex3.texCoord = [0.0, 0.0];
      vertices.push(vertex3);

      // Vertex 4
      var vertex4 = new Vertex( 16.0, -1.0, 16);
      vertex4.texCoord = [32.0, 32.0];
      vertices.push(vertex4);

      // Vertex 5
      var vertex5 = new Vertex( -16.0, -1.0, 16);
      vertex5.texCoord = [0.0, 32.0];
      vertices.push(vertex5);

      return vertices;
   }
}
