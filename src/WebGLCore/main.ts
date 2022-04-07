import { initShaders } from "./initShaders";
import { initBuffers } from "./initBuffers";
import { initTextures } from "./initTextures";
import { ProgramInfo } from "./interfaces/ProgramInfo";
import { Buffers } from "./interfaces/Buffers";
import { GLProps } from "./interfaces/GLProps";

console.log(
  "errors below are from unused textrure and color attribute. Will be ignored for now."
);

const initWebGL = (canvasRef: React.MutableRefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  const gl: WebGLRenderingContext = canvas.getContext("webgl");
  const shaderProgram = initShaders(gl);
  const { program } = shaderProgram;

  const programInfo: ProgramInfo = {
    shaderProgram: shaderProgram,
    attributeLocations: {
      vertexPosition: gl.getAttribLocation(program, "aVertexPosition"),
      vertexColor: gl.getAttribLocation(program, "aVertexColor"),
      vertexNormal: gl.getAttribLocation(program, "aVertexNormal"),
      textureCoord: gl.getAttribLocation(program, "aTextureCoord"),
    },
    uniformLocations: {
      normalMatrix: gl.getUniformLocation(program, "uNormalMatrix"),
      modelViewMatrix: gl.getUniformLocation(program, "uModelViewMatrix"),
      projectionMatrix: gl.getUniformLocation(program, "uProjectionMatrix"),
      uSampler: gl.getUniformLocation(program, "uSampler"),
      uTime: gl.getUniformLocation(program, "uTime"),
    },
  };

  const buffers: Buffers = initBuffers(gl);

  const texture = initTextures(gl, "/shape-textures/cubetexture1.png");

  const renderProps: GLProps = {
    gl,
    programInfo,
    buffers,
    texture,
  };

  return renderProps;
};

export { initWebGL };
