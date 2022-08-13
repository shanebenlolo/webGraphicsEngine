import { mat4 } from "gl-matrix";
import { VertexArray } from "./classes/VertexArray";
import { Buffers } from "./interfaces/Buffers";
import { ProgramInfo, AttributeLocations } from "./interfaces/ProgramInfo";

const drawScene = (
  gl: WebGLRenderingContext,
  objectCount: number,
  buffers: Map<number, Buffers>,
  programs: Map<number, ProgramInfo>,
  ambientLight: number[],
  rotation: { x: number; y: number; z: number },
  translation: { x: number; y: number; z: number }
) => {
  setBackground(gl);

  // I'm honestly confused why this is 36, need to ask someone
  const vertexCount = 36;
  const type = gl.UNSIGNED_SHORT;
  const offset = 0;

  // draw call for each object in the scene
  for (let i = 0; i < objectCount; i++) {
    const programInfo = programs.get(i);

    const shaderProgram = programInfo.shaderProgram;
    const attributeLocations = programInfo.attributeLocations;
    const uniformLocations = programInfo.uniformLocations;

    const projectionMatrix: mat4 = createProjectionMatrix(gl);
    const modelViewMatrix: mat4 = mat4.create();
    const normalMatrix: mat4 = mat4.create();

    // push the cube away from the center a bit so we are not
    // viewing the center of the cube
    mat4.translate(
      modelViewMatrix, // destination matrix
      modelViewMatrix, // matrix to translate
      [translation.x + i, translation.y + i, translation.z + i] // amount to translate
    );

    rotateCube(modelViewMatrix, rotation);

    // calculate the lighting
    mat4.invert(normalMatrix, modelViewMatrix);
    mat4.transpose(normalMatrix, normalMatrix);

    // create and enable all vertex arrays
    createVertexArrays(gl, buffers.get(i), attributeLocations).forEach((vertexArray) => {
      vertexArray.enable();
    });

    // Tell WebGL to use our program when drawing
    // set the uniforms for the shader
    // draw
    shaderProgram.bind();
    shaderProgram.setUniform4f(uniformLocations.projectionMatrix, projectionMatrix);
    shaderProgram.setUniform4f(uniformLocations.modelViewMatrix, modelViewMatrix);
    shaderProgram.setUniform4f(uniformLocations.normalMatrix, normalMatrix);
    shaderProgram.setUniform3f(uniformLocations.uAmbientLight, ambientLight);
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }
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
