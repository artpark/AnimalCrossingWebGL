// Vertex Shader
var PARTICLE_VSHADER =
  `precision mediump float;

   uniform float uTime;
   uniform vec3 uFirePos;

   attribute float aLifetime;
   attribute vec2 aTextureCoords;
   attribute vec2 aTriCorner;
   attribute vec3 aCenterOffset;
   attribute vec3 aVelocity;
   
   uniform mat4 uPMatrix;
   uniform mat4 uViewMatrix;

   /*uniform bool uUseBillboarding;*/

   varying float vLifetime;
   varying vec2 vTextureCoords;

   void main (void) {
      float time = mod(uTime, aLifetime);                   /* particles restart from beginning when life expires */

      vec4 position = vec4(                                 /* particle @ location of fire + offset + (velocity * time) */
         uFirePos + aCenterOffset + (time * aVelocity),
         1.0
      );

      vLifetime = 1.3 - (time / aLifetime);                 /* scale particle down as time elapses */
      vLifetime = clamp(vLifetime, 0.0, 1.0);
      float size = (vLifetime * vLifetime) * 0.05;

}`;

// Fragment Shader
var PARTICLE_FSHADER =
  `precision mediump float;
   
   uniform vec4 uColor;
   uniform float uTimeFrag;

   varying float vLifetime;
   varying vec2 vTextureCoords;

   uniform sampler2D fireAtlas;

   void main (void) {
         float time = mod(uTimeFrag, vLifetime);
         float percentOfLife = time / vLifetime;
         percentOfLife = clamp(percentOfLife, 0.0, 1.0);

         float offset = floor(16.0 * percentOfLife);
         float offsetX = floor(mod(offset, 4.0)) / 4.0;
         float offsetY = 0.75 - floor(offset / 4.0) / 4.0;

         vec4 texColor = texture2D(
         fireAtlas, 
         vec2(
            (vTextureCoords.x / 4.0) + offsetX,
            (vTextureCoords.y / 4.0) + offsetY
         ));
         gl_FragColor = uColor * texColor;

         gl_FragColor.a *= vLifetime;                       /* particle fades away as vLifetime decreases */
}`;
