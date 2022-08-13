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
  const shaderProgramA = initShaders(gl);
  const shaderProgramB = initShaders(gl);
  const programA = shaderProgramA.program;
  const programB = shaderProgramB.program;

  const programInfoA: ProgramInfo = {
    shaderProgram: shaderProgramA,
    attributeLocations: {
      vertexPosition: gl.getAttribLocation(programA, "aVertexPosition"),
      vertexColor: gl.getAttribLocation(programA, "aVertexColor"),
      vertexNormal: gl.getAttribLocation(programA, "aVertexNormal"),
    },
    uniformLocations: {
      normalMatrix: gl.getUniformLocation(programA, "uNormalMatrix"),
      modelViewMatrix: gl.getUniformLocation(programA, "uModelViewMatrix"),
      projectionMatrix: gl.getUniformLocation(programA, "uProjectionMatrix"),
      uAmbientLight: gl.getUniformLocation(programA, "uAmbientLight"),
    },
  };
  const programInfoB: ProgramInfo = {
    shaderProgram: shaderProgramB,
    attributeLocations: {
      vertexPosition: gl.getAttribLocation(programB, "aVertexPosition"),
      vertexColor: gl.getAttribLocation(programB, "aVertexColor"),
      vertexNormal: gl.getAttribLocation(programB, "aVertexNormal"),
    },
    uniformLocations: {
      normalMatrix: gl.getUniformLocation(programB, "uNormalMatrix"),
      modelViewMatrix: gl.getUniformLocation(programB, "uModelViewMatrix"),
      projectionMatrix: gl.getUniformLocation(programB, "uProjectionMatrix"),
      uAmbientLight: gl.getUniformLocation(programB, "uAmbientLight"),
    },
  };

  const buffersA: Buffers = initBuffers(gl, shape);
  const buffersB: Buffers = initBuffers(gl, shape);

  const renderProps: GLProps = {
    gl,
    programInfoA,
    programInfoB,
    buffersA,
    buffersB,
  };

  return renderProps;
};

export { initWebGL };
