import { cube } from "../apis/shapes/cube/cubeBuffers";
import { IndexBuffer } from "./buffers/IndexBuffer";
import { VertexBuffer } from "./buffers/VertexBuffer";

function initBuffers(gl: WebGL2RenderingContext) {
  var colors: Array<number> = [];
  for (var j = 0; j < cube.colorBuffer.length; j++) {
    const c = cube.colorBuffer[j];
    // assign rgba value at every corner (vertex) of each cube face
    colors = colors.concat(c, c, c, c);
  }

  const colorBuffer = new VertexBuffer(gl, new Float32Array(colors));
  const positionBuffer = new VertexBuffer(gl, new Float32Array(cube.positionBuffer));
  const textureBuffer = new VertexBuffer(gl, new Float32Array(cube.textureBuffer));
  const normalBuffer = new VertexBuffer(gl, new Float32Array(cube.vertexNormals));

  const indexBuffer = new IndexBuffer(gl, new Uint16Array(cube.indexBuffer));

  return {
    color: colorBuffer.buffer, //this is current not being shown due to contents of glsl shaders

    position: positionBuffer.buffer,
    textureCoord: textureBuffer.buffer,
    normal: normalBuffer.buffer,
    indices: indexBuffer.buffer,
  };
}

export { initBuffers };
