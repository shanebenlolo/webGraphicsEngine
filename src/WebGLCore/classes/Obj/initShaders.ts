import { cubeShaders } from "../../../apis/shapes/cube/cubeShaders";
import { Shader } from "../../classes/Shader";
import { ShaderProgram } from "../../classes/ShaderProgram";
import { AttributeLocations, ProgramInfo } from "../../interfaces/ProgramInfo";

const initShaders = (gl: WebGL2RenderingContext) => {
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
      textureCoord: gl.getAttribLocation(program, "aTextureCoord"),
    } as AttributeLocations,
    uniformLocations: {
      normalMatrix: gl.getUniformLocation(program, "uNormalMatrix"),
      modelViewMatrix: gl.getUniformLocation(program, "uModelViewMatrix"),
      projectionMatrix: gl.getUniformLocation(program, "uProjectionMatrix"),
      uAmbientLight: gl.getUniformLocation(program, "uAmbientLight"),
      uSampler: gl.getUniformLocation(program, "uSampler"),
    },
  } as ProgramInfo;
};

export { initShaders };
