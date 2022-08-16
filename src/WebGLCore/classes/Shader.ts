class Shader {
  gl: WebGL2RenderingContext;
  type: number;
  source: string;
  glShader: WebGLShader | null;

  constructor(gl: WebGL2RenderingContext, type: number, source: string) {
    this.gl = gl;
    this.type = type;
    this.source = source;

    this.glShader = gl.createShader(this.type);

    if (this.glShader !== null) {
      gl.shaderSource(this.glShader, this.source);
      gl.compileShader(this.glShader);

      if (!gl.getShaderParameter(this.glShader, gl.COMPILE_STATUS)) {
        alert(
          "An error occurred compiling the shaders: " + gl.getShaderInfoLog(this.glShader)
        );
        gl.deleteShader(this.glShader);
      }
    }
  }

  deleteShader() {
    this.gl.deleteShader(this.glShader);
  }
}

export { Shader };
