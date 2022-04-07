import { mat4 } from "gl-matrix";
import { VertexArray } from "./classes/VertexArray";
import { Buffers } from "./interfaces/Buffers";
import { ProgramInfo } from "./interfaces/ProgramInfo";

let cubeRotation = 0.0;

const drawScene = (
  gl: WebGLRenderingContext,
  programInfo: ProgramInfo,
  buffers: Buffers,
  texture: WebGLTexture,
  deltaTime: number
) => {
  const { shaderProgram, attributeLocations, uniformLocations } = programInfo;

  setBackground(gl);

  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();
  const modelViewMatrix = mat4.create();
  const normalMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  mat4.translate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    [-0.0, 0.0, -6.0] // amount to translate
  );

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

  // calculate lighting this is for lighting
  mat4.invert(normalMatrix, modelViewMatrix);
  mat4.transpose(normalMatrix, normalMatrix);

  // POSITION
  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 3; // pull out 3 values per iteration
    const type = gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set of values to the next
    const offset = 0; // how many bytes inside the buffer to start from
    const positionVertexArray = new VertexArray(
      buffers.position,
      attributeLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    positionVertexArray.enable(gl);
  }

  // COLOR
  // Tell WebGL how to pull out the color from the color
  // buffer into the vertexPosition attribute
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    const colorVertexArray = new VertexArray(
      buffers.color,
      attributeLocations.vertexColor,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    colorVertexArray.enable(gl);
  }

  // TEXTURE
  // Tell WebGL how to pull out the texture coordinates from
  // the texture coordinate buffer into the textureCoord attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    const textureVertexArray = new VertexArray(
      buffers.textureCoord,
      attributeLocations.textureCoord,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    textureVertexArray.enable(gl);
  }

  // LIGHTING
  // Tell WebGL how to pull out the normals from
  // the normal buffer into the vertexNormal attribute.
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    const normalVertexArray = new VertexArray(
      buffers.normal,
      attributeLocations.vertexNormal,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    normalVertexArray.enable(gl);
  }

  // Tell WebGL to use our program when drawing
  shaderProgram.bind();

  // SET UNIFORMS
  shaderProgram.setUniform4f(uniformLocations.projectionMatrix, projectionMatrix);
  shaderProgram.setUniform4f(uniformLocations.modelViewMatrix, modelViewMatrix);
  shaderProgram.setUniform4f(uniformLocations.normalMatrix, normalMatrix);

  shaderProgram.setUniform1f(uniformLocations.uTime, deltaTime);

  // Specify the texture to map onto the faces.
  // Tell WebGL we want to affect texture unit 0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture to texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Tell the shader we bound the texture to texture unit 0
  gl.uniform1i(uniformLocations.uSampler, 0);

  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

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

export { drawScene };
