/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Triangle}
 */
class Triangle extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Triangle} Triangle created
   */
  constructor(shader, image) {
      super(shader);

      this.vertices = this.generateTriangleVertices();
      this.faces = {0: [0, 1, 2]};

      this.image = image;

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateTriangleVertices() {
      var vertices = []

      // Vertex 0
      var vertex0 = new Vertex(-1.0, -1.0, 0.0);
      vertex0.texCoord = [0.0,0.0];
      vertices.push(vertex0);

      // Vertex1
      var vertex1 = new Vertex( 1.0, -1.0, 0.0);
      vertex1.texCoord = [1.0,0.0];
      vertices.push(vertex1);

      // Vertex 2
      var vertex2 = new Vertex( 0.0,  1.0, 0.0);
      vertex2.texCoord = [0.5,1.0];
      vertices.push(vertex2);

      return vertices;
   }
}
