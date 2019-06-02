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
    constructor(shader, image, Tx, Ty, Tz)
    {
          super(shader);
  
          this.vertices = this.generateVillagerVertices(Tx, Ty, Tz);
          this.faces = {0: this.vertices};
          this.image = image;
  
          //AABB vs AABB
          this.centerPoint = new Vector3([Tx, Ty, Tz]);
          this.halfWidth = new Vector3([0.4,0.4,0.4]);
  
          // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
          this.interleaveVertices();
    }
  
    generateVillagerVertices(Tx, Ty, Tz)
    {
        var vertices = []
        var segConstant = Math.PI / 3;  // for vertice generation calculations
        var torsoW =    0.3;            // scalar for torso width
        var torsoH =    0.6;            // scalar for torso height
        var topScalar = 0.7;            // scalar for torso cone shape
  
        var headW = 0.4;
        var headH = 0.5;
  
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
            vertex2.texCoord = [1.0, -0.5];
            vertex3.texCoord = [0.8, 1.0];
            vertex4.texCoord = [0.0, -0.5];
            vertex5.texCoord = [0.8, 1.0];
            vertex6.texCoord = [0.2, 1.0];
          }
          else  // side faces
          {
            vertex1.texCoord = [0.0, -0.5];
            vertex2.texCoord = [0.1, -0.5];
            vertex3.texCoord = [0.1, 0.1];
            vertex4.texCoord = [0.0, -0.5];
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
          // set texture coordinates
          
          if (i == 4) // front face
          {
            vertex1.texCoord = [0.0, 0.0];
            vertex2.texCoord = [1.0, 0.0];
            vertex3.texCoord = [1.0, 1.0];
            vertex4.texCoord = [0.0, 0.0];
            vertex5.texCoord = [1.0, 1.0];
            vertex6.texCoord = [0.0, 1.0];
          }
          else  // side faces
          {
            vertex1.texCoord = [0.0, -0.5];
            vertex2.texCoord = [0.1, -0.5];
            vertex3.texCoord = [0.1, 0.1];
            vertex4.texCoord = [0.0, -0.5];
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
  
        return vertices;
    }
  }
  