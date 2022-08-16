import { cube } from "../../../apis/shapes/cube/cubeBuffers";
import { IndexBuffer } from "../../classes/IndexBuffer";
import { VertexBuffer } from "../../classes/VertexBuffer";
import { Buffers } from "../../interfaces/Buffers";

function initBuffers(gl: WebGL2RenderingContext) {
  const colors: Array<number> = generateColors();

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
  } as Buffers;
}

const generateColors = (): Array<number> => {
  let colors: Array<number> = [];
  for (var j = 0; j < cube.colorBuffer.length; j++) {
    const c = cube.colorBuffer[j];
    // assign rgba value at every corner (vertex) of each cube face
    colors = colors.concat(c, c, c, c);
  }
  return colors;
};

export { initBuffers };
