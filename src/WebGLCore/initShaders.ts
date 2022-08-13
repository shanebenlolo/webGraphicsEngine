import { cubeShaders } from "../apis/shapes/cube/cubeShaders";
import { Shader } from "./classes/Shader";
import { ShaderProgram } from "./classes/ShaderProgram";
import { ProgramInfo } from "./interfaces/ProgramInfo";

const initShaders = (gl: WebGLRenderingContext) => {
  const vertexShader = new Shader(gl, gl.VERTEX_SHADER, cubeShaders.vertexShader);
  const fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, cubeShaders.fragmentShader);

  const shaderProgram = new ShaderProgram(
    gl,
    vertexShader.glShader,
    fragmentShader.glShader
  );
  const { program } = shaderProgram;

  return {
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
      uAmbientLight: gl.getUniformLocation(program, "uAmbientLight"),
    },
  } as ProgramInfo;
};

export { initShaders };
