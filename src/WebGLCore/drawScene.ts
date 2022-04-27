import { mat4 } from "gl-matrix";
import { VertexArray } from "./classes/VertexArray";
import { Buffers } from "./interfaces/Buffers";
import { ProgramInfo, AttributeLocations } from "./interfaces/ProgramInfo";

let cubeRotation: number = 0.0;

const drawScene = (
  gl: WebGLRenderingContext,
  programInfo: ProgramInfo,
  buffers: Buffers,
  deltaTime: number,
  timestamp: number
) => {
  const { shaderProgram, attributeLocations, uniformLocations } = programInfo;

  const projectionMatrix: mat4 = createProjectionMatrix(gl);
  const modelViewMatrix: mat4 = mat4.create();
  const normalMatrix: mat4 = mat4.create();

  setBackground(gl);

  // push the cube away from the center a bit so we are not
  // viewing the center of the cube
  mat4.translate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    [-0.0, 0.0, -6.0] // amount to translate
  );

  rotateCube(modelViewMatrix, cubeRotation);

  // calculate the lighting
  mat4.invert(normalMatrix, modelViewMatrix);
  mat4.transpose(normalMatrix, normalMatrix);

  // create and enable all vertex arrays
  createVertexArrays(gl, buffers, attributeLocations).forEach((vertexArray) => {
    vertexArray.enable();
  });

  // Tell WebGL to use our program when drawing
  shaderProgram.bind();

  // SET UNIFORMS
  shaderProgram.setUniform4f(uniformLocations.projectionMatrix, projectionMatrix);
  shaderProgram.setUniform4f(uniformLocations.modelViewMatrix, modelViewMatrix);
  shaderProgram.setUniform4f(uniformLocations.normalMatrix, normalMatrix);

  shaderProgram.setUniform1f(uniformLocations.uTime, timestamp);

  // I'm honestly confused why this is 36, need to ask someone
  const vertexCount = 36;
  const type = gl.UNSIGNED_SHORT;
  const offset = 0;
  gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);

  // Update the rotation for the next draw
  cubeRotation += deltaTime;
};

const setBackground = (gl: WebGLRenderingContext) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
  gl.clearDepth(1.0); // Clear everything
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things

  // Clear the canvas before we start drawing on it.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

const createVertexArrays = (
  gl: WebGLRenderingContext,
  buffers: Buffers,
  attributeLocations: AttributeLocations
): VertexArray[] => {
  const positionVertexArray = new VertexArray(
    gl,
    buffers.position,
    attributeLocations.vertexPosition,
    3,
    gl.FLOAT,
    false,
    0,
    0
  );

  const colorVertexArray = new VertexArray(
    gl,
    buffers.color,
    attributeLocations.vertexColor,
    4,
    gl.FLOAT,
    false,
    0,
    0
  );

  const normalVertexArray = new VertexArray(
    gl,
    buffers.normal,
    attributeLocations.vertexNormal,
    3,
    gl.FLOAT,
    false,
    0,
    0
  );

  return [positionVertexArray, colorVertexArray, normalVertexArray];
};

const createProjectionMatrix = (gl: WebGLRenderingContext): mat4 => {
  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  return mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
};

const rotateCube = (modelViewMatrix: mat4, cubeRotation: number) => {
  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    cubeRotation, // amount to rotate in radians
    [0, 0, 1] // axis to rotate around (Z)
  );

  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    cubeRotation * 0.7, // amount to rotate in radians
    [0, 1, 0] // axis to rotate around (X)
  );
};

export { drawScene };
