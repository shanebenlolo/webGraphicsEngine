import { cube } from "../apis/shapes/cube/cubeBuffers";
import { IndexBuffer } from "./classes/IndexBuffer";
import { VertexBuffer } from "./classes/VertexBuffer";

function initBuffers(gl: WebGLRenderingContext, shape: string) {
  const colors: Array<number> = generateColors(shape);

  const colorBuffer = new VertexBuffer(gl, new Float32Array(colors));
  const positionBuffer = new VertexBuffer(gl, new Float32Array(cube.positionBuffer));
  const textureBuffer = new VertexBuffer(gl, new Float32Array(cube.textureBuffer));
  const normalBuffer = new VertexBuffer(gl, new Float32Array(cube.vertexNormals));

  const indexBuffer = new IndexBuffer(gl, new Uint16Array(cube.indexBuffer));

  return {
    color: colorBuffer.buffer,
    position: positionBuffer.buffer,
    textureCoord: textureBuffer.buffer,
    normal: normalBuffer.buffer,
    indices: indexBuffer.buffer,
  };
}

const generateColors = (shape: string): Array<number> => {
  let colors: Array<number> = [];
  if (shape === "cube") {
    for (var j = 0; j < cube.colorBuffer.length; j++) {
      const c = cube.colorBuffer[j];
      // assign rgba value at every corner (vertex) of each cube face
      colors = colors.concat(c, c, c, c);
    }
  }
  if (shape === "sphere") {
    // TO DO
  }
  return colors;
};

export { initBuffers };
