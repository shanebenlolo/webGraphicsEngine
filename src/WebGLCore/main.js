import { initShaders } from "./initShaders";
import { initBuffers } from "./initBuffers";
import { initTextures } from "./initTextures";

const initWebGL = (canvasRef) => {
  const canvas = canvasRef.current;
  const gl = canvas.getContext("webgl");

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaders(gl);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // (such as aVertexPosition), and look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
      vertexNormal: gl.getAttribLocation(shaderProgram, "aVertexNormal"),
      textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      normalMatrix: gl.getUniformLocation(shaderProgram, "uNormalMatrix"),
      uSampler: gl.getUniformLocation(shaderProgram, "uSampler"),
      uTime: gl.getUniformLocation(shaderProgram, "uTime"),
    },
  };

  const buffers = initBuffers(gl);
  const texture = initTextures(gl, "/shape-textures/cubetexture1.png");

  return [gl, programInfo, buffers, texture];
};

export { initWebGL };
