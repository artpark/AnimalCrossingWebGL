/**
 * Specifies the skybox. A subclass of geometry.
 *
 * @author Terence So
 * @this {Cube}
 */
class Skybox extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Skybox} Skybox created
   */
  constructor(shader, image) {
      super(shader);

      this.vertices = this.generateSkyboxVertices();
      this.faces = {0: this.vertices};

      this.image = image;      

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateSkyboxVertices() {
      var vertices = []
      var scale = 34;

      // face 1
      var vertex1  = new Vertex(-scale, -scale,  scale);
      var vertex2  = new Vertex( scale, -scale,  scale);
      var vertex3  = new Vertex( scale,  scale,  scale);
      var vertex4  = new Vertex(-scale, -scale,  scale);
      var vertex5  = new Vertex( scale,  scale,  scale);
      var vertex6  = new Vertex(-scale,  scale,  scale);
      vertex1.texCoord = [0.00, 0.34];
      vertex2.texCoord = [0.25, 0.34];
      vertex3.texCoord = [0.25, 0.66];
      vertex4.texCoord = [0.00, 0.34];
      vertex5.texCoord = [0.25, 0.66];
      vertex6.texCoord = [0.00, 0.66];
      // face 2
      var vertex7  = new Vertex( scale, -scale,  scale);
      var vertex8  = new Vertex( scale, -scale, -scale);
      var vertex9  = new Vertex( scale,  scale, -scale);
      var vertex10 = new Vertex( scale, -scale,  scale);
      var vertex11 = new Vertex( scale,  scale, -scale);
      var vertex12 = new Vertex( scale,  scale,  scale);
      vertex7.texCoord = [0.00, 0.34];
      vertex8.texCoord = [0.25, 0.34];
      vertex9.texCoord = [0.25, 0.66];
      vertex10.texCoord = [0.00, 0.34];
      vertex11.texCoord = [0.25, 0.66];
      vertex12.texCoord = [0.00, 0.66];
      // face 3
      var vertex13 = new Vertex( scale,  scale,  scale);
      var vertex14 = new Vertex( scale,  scale, -scale);
      var vertex15 = new Vertex(-scale,  scale, -scale);
      var vertex16 = new Vertex( scale,  scale,  scale);
      var vertex17 = new Vertex(-scale,  scale, -scale);
      var vertex18 = new Vertex(-scale,  scale,  scale);
      vertex13.texCoord = [0.51, 0.65];
      vertex14.texCoord = [0.74, 0.65];
      vertex15.texCoord = [0.74, 1.00];
      vertex16.texCoord = [0.51, 0.65];
      vertex17.texCoord = [0.74, 1.00];
      vertex18.texCoord = [0.51, 1.00];
      // face 4
      var vertex19 = new Vertex( scale, -scale,  scale);
      var vertex20 = new Vertex( scale, -scale, -scale);
      var vertex21 = new Vertex(-scale, -scale, -scale);
      var vertex22 = new Vertex( scale, -scale,  scale);
      var vertex23 = new Vertex(-scale, -scale, -scale);
      var vertex24 = new Vertex(-scale, -scale,  scale);
      vertex19.texCoord = [0.51, 0.00];
      vertex20.texCoord = [0.74, 0.00];
      vertex21.texCoord = [0.74, 0.34];
      vertex22.texCoord = [0.51, 0.00];
      vertex23.texCoord = [0.74, 0.34];
      vertex24.texCoord = [0.51, 0.34];
      // face 5
      var vertex25 = new Vertex( scale, -scale, -scale);
      var vertex26 = new Vertex(-scale, -scale, -scale);
      var vertex27 = new Vertex(-scale,  scale, -scale);
      var vertex28 = new Vertex( scale, -scale, -scale);
      var vertex29 = new Vertex(-scale,  scale, -scale);
      var vertex30 = new Vertex( scale,  scale, -scale);
      vertex25.texCoord = [0.75, 0.34];
      vertex26.texCoord = [1.00, 0.34];
      vertex27.texCoord = [1.00, 0.66];
      vertex28.texCoord = [0.75, 0.34];
      vertex29.texCoord = [1.00, 0.66];
      vertex30.texCoord = [0.75, 0.66];
      // face 6
      var vertex31 = new Vertex(-scale, -scale, -scale);
      var vertex32 = new Vertex(-scale, -scale,  scale);
      var vertex33 = new Vertex(-scale,  scale,  scale);
      var vertex34 = new Vertex(-scale, -scale, -scale);
      var vertex35 = new Vertex(-scale,  scale,  scale);
      var vertex36 = new Vertex(-scale,  scale, -scale);
      vertex31.texCoord = [0.00, 0.34];
      vertex32.texCoord = [0.25, 0.34];
      vertex33.texCoord = [0.25, 0.66];
      vertex34.texCoord = [0.00, 0.34];
      vertex35.texCoord = [0.25, 0.66];
      vertex36.texCoord = [0.00, 0.66];

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);
      vertices.push(vertex7);
      vertices.push(vertex8);
      vertices.push(vertex9);
      vertices.push(vertex10);
      vertices.push(vertex11);
      vertices.push(vertex12);
      vertices.push(vertex13);
      vertices.push(vertex14);
      vertices.push(vertex15);
      vertices.push(vertex16);
      vertices.push(vertex17);
      vertices.push(vertex18);
      vertices.push(vertex19);
      vertices.push(vertex20);
      vertices.push(vertex21);
      vertices.push(vertex22);
      vertices.push(vertex23);
      vertices.push(vertex24);
      vertices.push(vertex25);
      vertices.push(vertex26);
      vertices.push(vertex27);
      vertices.push(vertex28);
      vertices.push(vertex29);
      vertices.push(vertex30);
      vertices.push(vertex31);
      vertices.push(vertex32);
      vertices.push(vertex33);
      vertices.push(vertex34);
      vertices.push(vertex35);
      vertices.push(vertex36);

      return vertices;
  }
}
