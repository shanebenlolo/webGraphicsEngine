const cubeShaders = {
  vertexShader: /*glsl*/ `
  attribute vec4 aVertexPosition;
  attribute vec4 aVertexColor;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;

  uniform mat4 uNormalMatrix;
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  uniform float uTime;

  varying highp vec4 vColor;
  varying highp vec3 vLighting;
  varying highp vec2 vTextureCoord;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor =  aVertexPosition;

    // Apply lighting effect
    highp vec3 ambientLight = vec3(0.5, 0.5, 0.5);
    highp vec3 directionalLightColor = vec3(1, 1, 1);
    highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

    highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

    highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
    vLighting = ambientLight + (directionalLightColor * directional);

    // use unused attributes here so errors arent thrown (temporary)
    highp vec4 colorWaste = vec4(aVertexColor);
    highp vec2 textureWaste = vec2(aTextureCoord);
  }
`,

  fragmentShader: /*glsl*/ `
  varying highp vec4 vColor;
  varying highp vec3 vLighting;
  varying highp vec2 vTextureCoord;

  uniform sampler2D uSampler;
  uniform highp float uTime;

  void main(void) {
    highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

    gl_FragColor = vec4(
      sin(vColor.r * uTime/1.5),
      sin(vColor.g * uTime/1.5),
      sin(vColor.b * uTime/1.5),
      texelColor.a
      );
  }
`,
};

export { cubeShaders };
