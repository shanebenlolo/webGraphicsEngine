const cubeShaders = {
  vertexShader: /*glsl*/ `
  attribute vec4 aVertexPosition;
  attribute vec4 aVertexColor;
  attribute vec3 aVertexNormal;

  uniform mat4 uNormalMatrix;
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  uniform float uTime;

  varying highp vec4 vColor;
  varying highp vec3 vLighting;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor =  aVertexColor;

    // Apply lighting effect
    highp vec3 ambientLight = vec3(0.5, 0.5, 0.5);
    highp vec3 directionalLightColor = vec3(1, 1, 1);
    highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

    highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

    highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
    vLighting = ambientLight + (directionalLightColor * directional);
  }
`,

  fragmentShader: /*glsl*/ `
  varying highp vec4 vColor;
  varying highp vec3 vLighting;

  uniform highp float uTime;

  void main(void) {
    gl_FragColor = vec4(sin(vColor.rgb * vLighting), vColor.a);
  }
`,
};

export { cubeShaders };
