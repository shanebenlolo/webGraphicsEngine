import { ShaderProgram } from "../classes/ShaderProgram";

interface ProgramInfo {
  shaderProgram: ShaderProgram;
  attributeLocations: AttributeLocations;
  uniformLocations: UniformLocations;
}

interface AttributeLocations {
  vertexPosition: GLint;
  vertexColor: GLint;
  vertexNormal: GLint;
  // textureCoord: GLint;
}

interface UniformLocations {
  projectionMatrix: WebGLUniformLocation | null;
  modelViewMatrix: WebGLUniformLocation | null;
  normalMatrix: WebGLUniformLocation | null;
  uTime: WebGLUniformLocation | null;
  // uSampler: WebGLUniformLocation | null;
}

export { ProgramInfo, AttributeLocations };
