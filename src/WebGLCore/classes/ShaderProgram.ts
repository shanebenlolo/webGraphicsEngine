import { mat4 } from "gl-matrix";

class ShaderProgram {
  gl: WebGL2RenderingContext;
  program: WebGLProgram | null;
  vertexShader: WebGLShader;
  fragmentShader: WebGLShader;

  constructor(
    gl: WebGL2RenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ) {
    this.gl = gl;
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;

    this.program = gl.createProgram();

    if (this.program !== null) {
      gl.attachShader(this.program, this.vertexShader);
      gl.attachShader(this.program, this.fragmentShader);
      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        alert(
          "Unable to initialize the shader program: " + gl.getProgramInfoLog(this.program)
        );
      }
    }
  }

  setUniform1f(uniformLocation: WebGLUniformLocation, value: number) {
    this.gl.uniform1f(uniformLocation, value);
  }

  setUniform3f(uniformLocation: WebGLUniformLocation, xyz: number[]) {
    this.gl.uniform3f(uniformLocation, xyz[0], xyz[1], xyz[2]);
  }

  setUniform4f(uniformLocation: WebGLUniformLocation, matrix: mat4) {
    this.gl.uniformMatrix4fv(uniformLocation, false, matrix);
  }

  bind() {
    this.gl.useProgram(this.program);
  }

  unbind() {
    this.gl.useProgram(null);
  }
}

export { ShaderProgram };
