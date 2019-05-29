/**
 * Specifies a shading program.
 *
 * @author Lucas N. Ferreira
 * @this {Shader}
 */
class Shader {
   /**
    * Constructor for Shader.
    *
    * @constructor
    * @param gl WebGL instance
    * @param {String} vShader Vertex Shader used for shading program
    * @param {String} fShader Fragment Shader used for shading program
    * @returns {Shader} Shader created
    */
    constructor(gl, vShader, fShader) {
        this.gl = gl;

        this.program = createShaderProgram(this.gl, vShader, fShader)
        this.uniforms = {};
        this.attributes = {};
    }

    /**
     * Adds an attribute variable and stores it's location.
     * Only name is necessary since an attribute's information is stored by a
     * geometry's vertices.
     *
     * @param {String} attributeName Name of the attribute variable
     */
    addAttribute(attributeName) {
        var location = this.gl.getAttribLocation(this.program, attributeName);
        this.attributes[attributeName] = {"location": location};
    }

    /**
     * Adds an attribute variable, stores it's type, and stores it's location.
     * Acceptable types: float, vec2, vec3, vec4, mat2, mat3, mat4
     *
     * @param {String} uniformName Name of the uniform variable
     * @param {String} type Type of the uniform variable
     * @param value Value assigned to uniform variable
     */
    addUniform(uniformName, type, value) {
        var location = this.gl.getUniformLocation(this.program, uniformName);
        this.uniforms[uniformName] = {"type": type, "location": location, "value": value};
    }

    /**
     * Sets an uniform value specificed by name.
     *
     * @param {String} uniformName Name of the uniform variable
     * @param value Value assigned to uniform variable
     */
    setUniform(uniformName, value) {
        if(uniformName in this.uniforms) {
            this.uniforms[uniformName].value = value;
        }
    }
}
