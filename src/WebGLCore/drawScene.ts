import { mat4 } from "gl-matrix";
import { VertexArray } from "./classes/VertexArray";
import { Buffers } from "./interfaces/Buffers";
import { ProgramInfo, AttributeLocations } from "./interfaces/ProgramInfo";

const drawScene = (
  gl: WebGLRenderingContext,
  programInfoA: ProgramInfo,
  programInfoB: ProgramInfo,
  buffersA: Buffers,
  buffersB: Buffers,
  ambientLightValues: number[],
  rotation: { x: number; y: number; z: number },
  translation: { x: number; y: number; z: number }
) => {
  setBackground(gl);

  const shaderProgramA = programInfoA.shaderProgram;
  const attributeLocationsA = programInfoA.attributeLocations;
  const uniformLocationsA = programInfoA.uniformLocations;

  const shaderProgramB = programInfoB.shaderProgram;
  const attributeLocationsB = programInfoB.attributeLocations;
  const uniformLocationsB = programInfoB.uniformLocations;

  const projectionMatrixA: mat4 = createProjectionMatrix(gl);
  const modelViewMatrixA: mat4 = mat4.create();
  const normalMatrixA: mat4 = mat4.create();

  const projectionMatrixB: mat4 = createProjectionMatrix(gl);
  const modelViewMatrixB: mat4 = mat4.create();
  const normalMatrixB: mat4 = mat4.create();

  // push the cube away from the center a bit so we are not
  // viewing the center of the cube
  mat4.translate(
    modelViewMatrixA, // destination matrix
    modelViewMatrixA, // matrix to translate
    [translation.x, translation.y, translation.z] // amount to translate
  );

  // push the cube away from the center a bit so we are not
  // viewing the center of the cube
  mat4.translate(
    modelViewMatrixB, // destination matrix
    modelViewMatrixB, // matrix to translate
    [translation.x + 3.0, translation.y, translation.z] // amount to translate
  );

  // we will only rotate cube a to test...
  rotateCube(modelViewMatrixA, rotation);
  rotateCube(modelViewMatrixB, {
    x: -rotation.x,
    y: -rotation.y,
    z: -rotation.z,
  });

  // calculate the lighting
  mat4.invert(normalMatrixA, modelViewMatrixA);
  mat4.transpose(normalMatrixA, normalMatrixA);
  // calculate the lighting
  mat4.invert(normalMatrixB, modelViewMatrixB);
  mat4.transpose(normalMatrixB, normalMatrixB);

  // create and enable all vertex arrays
  createVertexArrays(gl, buffersA, attributeLocationsA).forEach((vertexArray) => {
    vertexArray.enable();
  });
  // create and enable all vertex arrays
  createVertexArrays(gl, buffersB, attributeLocationsB).forEach((vertexArray) => {
    vertexArray.enable();
  });

  // I'm honestly confused why this is 36, need to ask someone
  const vertexCount = 36;
  const type = gl.UNSIGNED_SHORT;
  const offset = 0;

  // Tell WebGL to use our program when drawing
  // set the uniforms for the shader
  // draw
  shaderProgramA.bind();
  shaderProgramA.setUniform4f(uniformLocationsA.projectionMatrix, projectionMatrixA);
  shaderProgramA.setUniform4f(uniformLocationsA.modelViewMatrix, modelViewMatrixA);
  shaderProgramA.setUniform4f(uniformLocationsA.normalMatrix, normalMatrixA);
  shaderProgramA.setUniform3f(uniformLocationsA.uAmbientLight, ambientLightValues);
  gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);

  // Tell WebGL to use our program when drawing
  // set the uniforms for the shader
  // draw
  shaderProgramB.bind();
  shaderProgramB.setUniform4f(uniformLocationsB.projectionMatrix, projectionMatrixB);
  shaderProgramB.setUniform4f(uniformLocationsB.modelViewMatrix, modelViewMatrixB);
  shaderProgramB.setUniform4f(uniformLocationsB.normalMatrix, normalMatrixB);
  shaderProgramB.setUniform3f(uniformLocationsB.uAmbientLight, ambientLightValues);
  gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
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

const rotateCube = (
  modelViewMatrix: mat4,
  rotation: { x: number; y: number; z: number }
) => {
  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    rotation.z, // amount to rotate in radians
    [0, 0, 1] // axis to rotate around (Z)
  );

  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    rotation.x, // amount to rotate in radians
    [0, 1, 0] // axis to rotate around (X)
  );

  mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    rotation.y, // amount to rotate in radians
    [1, 0, 0] // axis to rotate around (Y)
  );
};

export { drawScene };
