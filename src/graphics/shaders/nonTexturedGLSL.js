// Vertex Shader
var NONTEXTURED_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  varying vec4 v_Color;

  uniform mat4 u_ModelMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;

  uniform mat4 u_dayEveningNightFilter;

  void main() {
    v_Color = a_Color;
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;
  }`;

// Fragment Shader
var NONTEXTURED_FSHADER =
  `precision mediump float;
  varying vec4 v_Color;

  uniform mat4 u_dayEveningNightFilter;

  void main() {
    gl_FragColor = u_dayEveningNightFilter * v_Color;
  }`;
