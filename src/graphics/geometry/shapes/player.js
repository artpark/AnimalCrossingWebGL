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
  constructor(shader) {
      super(shader);

      this.Tx = 0;
      this.Ty = 0;
      this.Tz = 0;

      this.vertices = this.generatePlayerVertices(this.Tx, this.Ty, this.Tz);
      this.faces = {0: this.vertices};
      //this.image = image;

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generatePlayerVertices(Tx, Ty, Tz) {
      /*Tx -= 15.5;
      Ty -=  0.5;
      Tz -= 15.5;*/

      var vertices = []
      // face 1
      var vertex1  = new Vertex(-0.50+Tx, -0.50+Ty,  0.50+Tz);
      var vertex2  = new Vertex( 0.50+Tx, -0.50+Ty,  0.50+Tz);
      var vertex3  = new Vertex( 0.50+Tx,  0.50+Ty,  0.50+Tz);
      var vertex4  = new Vertex(-0.50+Tx, -0.50+Ty,  0.50+Tz);
      var vertex5  = new Vertex( 0.50+Tx,  0.50+Ty,  0.50+Tz);
      var vertex6  = new Vertex(-0.50+Tx,  0.50+Ty,  0.50+Tz);
      /*vertex1.texCoord = [0.0, 0.0];
      vertex2.texCoord = [1.0, 0.0];
      vertex3.texCoord = [1.0, 1.0];
      vertex4.texCoord = [0.0, 0.0];
      vertex5.texCoord = [1.0, 1.0];
      vertex6.texCoord = [0.0, 1.0];*/
      // face 2
      var vertex7  = new Vertex( 0.50+Tx, -0.50+Ty,  0.50+Tz);
      var vertex8  = new Vertex( 0.50+Tx, -0.50+Ty, -0.50+Tz);
      var vertex9  = new Vertex( 0.50+Tx,  0.50+Ty, -0.50+Tz);
      var vertex10 = new Vertex( 0.50+Tx, -0.50+Ty,  0.50+Tz);
      var vertex11 = new Vertex( 0.50+Tx,  0.50+Ty, -0.50+Tz);
      var vertex12 = new Vertex( 0.50+Tx,  0.50+Ty,  0.50+Tz);
      /*vertex7.texCoord = [0.0, 0.0];
      vertex8.texCoord = [1.0, 0.0];
      vertex9.texCoord = [1.0, 1.0];
      vertex10.texCoord = [0.0, 0.0];
      vertex11.texCoord = [1.0, 1.0];
      vertex12.texCoord = [0.0, 1.0];*/
      // face 3
      var vertex13 = new Vertex( 0.50+Tx,  0.50+Ty,  0.50+Tz);
      var vertex14 = new Vertex( 0.50+Tx,  0.50+Ty, -0.50+Tz);
      var vertex15 = new Vertex(-0.50+Tx,  0.50+Ty, -0.50+Tz);
      var vertex16 = new Vertex( 0.50+Tx,  0.50+Ty,  0.50+Tz);
      var vertex17 = new Vertex(-0.50+Tx,  0.50+Ty, -0.50+Tz);
      var vertex18 = new Vertex(-0.50+Tx,  0.50+Ty,  0.50+Tz);
      /*vertex13.texCoord = [0.0, 0.0];
      vertex14.texCoord = [1.0, 0.0];
      vertex15.texCoord = [1.0, 1.0];
      vertex16.texCoord = [0.0, 0.0];
      vertex17.texCoord = [1.0, 1.0];
      vertex18.texCoord = [0.0, 1.0];*/
      // face 4
      var vertex19 = new Vertex( 0.50+Tx, -0.50+Ty,  0.50+Tz);
      var vertex20 = new Vertex( 0.50+Tx, -0.50+Ty, -0.50+Tz);
      var vertex21 = new Vertex(-0.50+Tx, -0.50+Ty, -0.50+Tz);
      var vertex22 = new Vertex( 0.50+Tx, -0.50+Ty,  0.50+Tz);
      var vertex23 = new Vertex(-0.50+Tx, -0.50+Ty, -0.50+Tz);
      var vertex24 = new Vertex(-0.50+Tx, -0.50+Ty,  0.50+Tz);
      /*vertex19.texCoord = [0.0, 0.0];
      vertex20.texCoord = [1.0, 0.0];
      vertex21.texCoord = [1.0, 1.0];
      vertex22.texCoord = [0.0, 0.0];
      vertex23.texCoord = [1.0, 1.0];
      vertex24.texCoord = [0.0, 1.0];*/
      // face 5
      var vertex25 = new Vertex( 0.50+Tx, -0.50+Ty, -0.50+Tz);
      var vertex26 = new Vertex(-0.50+Tx, -0.50+Ty, -0.50+Tz);
      var vertex27 = new Vertex(-0.50+Tx,  0.50+Ty, -0.50+Tz);
      var vertex28 = new Vertex( 0.50+Tx, -0.50+Ty, -0.50+Tz);
      var vertex29 = new Vertex(-0.50+Tx,  0.50+Ty, -0.50+Tz);
      var vertex30 = new Vertex( 0.50+Tx,  0.50+Ty, -0.50+Tz);
      /*vertex25.texCoord = [0.0, 0.0];
      vertex26.texCoord = [1.0, 0.0];
      vertex27.texCoord = [1.0, 1.0];
      vertex28.texCoord = [0.0, 0.0];
      vertex29.texCoord = [1.0, 1.0];
      vertex30.texCoord = [0.0, 1.0];*/
      // face 6
      var vertex31 = new Vertex(-0.50+Tx, -0.50+Ty, -0.50+Tz);
      var vertex32 = new Vertex(-0.50+Tx, -0.50+Ty,  0.50+Tz);
      var vertex33 = new Vertex(-0.50+Tx,  0.50+Ty,  0.50+Tz);
      var vertex34 = new Vertex(-0.50+Tx, -0.50+Ty, -0.50+Tz);
      var vertex35 = new Vertex(-0.50+Tx,  0.50+Ty,  0.50+Tz);
      var vertex36 = new Vertex(-0.50+Tx,  0.50+Ty, -0.50+Tz);
      /*vertex31.texCoord = [0.0, 0.0];
      vertex32.texCoord = [1.0, 0.0];
      vertex33.texCoord = [1.0, 1.0];
      vertex34.texCoord = [0.0, 0.0];
      vertex35.texCoord = [1.0, 1.0];
      vertex36.texCoord = [0.0, 1.0];*/

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

  moveHor(dir) {
      console.log("hor "+dir);
      
  }

  moveVer(dir) {
      console.log("ver "+dir);
      this.Tz += dir;
  }

  updatePos() {

  }
}
