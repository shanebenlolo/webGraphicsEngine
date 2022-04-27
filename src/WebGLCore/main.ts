// import { initTextures } from "./initTextures";
import { initShaders } from "./initShaders";
import { initBuffers } from "./initBuffers";
import { ProgramInfo } from "./interfaces/ProgramInfo";
import { Buffers } from "./interfaces/Buffers";
import { GLProps } from "./interfaces/GLProps";

const initWebGL = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement>,
  shape: string
) => {
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
    },
    uniformLocations: {
      normalMatrix: gl.getUniformLocation(program, "uNormalMatrix"),
      modelViewMatrix: gl.getUniformLocation(program, "uModelViewMatrix"),
      projectionMatrix: gl.getUniformLocation(program, "uProjectionMatrix"),
      uTime: gl.getUniformLocation(program, "uTime"),
    },
  };

  const buffers: Buffers = initBuffers(gl, shape);

  const renderProps: GLProps = {
    gl,
    programInfo,
    buffers,
  };

  return renderProps;
};

export { initWebGL };
