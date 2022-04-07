import { cubeShaders } from "../apis/shapes/cube/cubeShaders";
import { Shader } from "./classes/Shader";
import { ShaderProgram } from "./classes/ShaderProgram";

const initShaders = (gl: WebGLRenderingContext) => {
  // we are probably going to be wanting to pass shaders from the UI, into here from main
  const vertexShader = new Shader(gl, gl.VERTEX_SHADER, cubeShaders.vertexShader);
  const fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, cubeShaders.fragmentShader);

  return new ShaderProgram(gl, vertexShader.glShader, fragmentShader.glShader);
};

export { initShaders };
