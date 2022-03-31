class VertexBuffer {
  data: Float32Array;
  buffer: WebGLBuffer | null;

  constructor(gl: WebGL2RenderingContext, data: Float32Array) {
    this.buffer = gl.createBuffer();
    this.data = data;

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  }

  deleteBuffer(gl: WebGL2RenderingContext) {
    gl.deleteBuffer(this.buffer);
  }

  bind(gl: WebGL2RenderingContext) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
  }

  // this is actually unneeded because whatever buffer is used
  // next will automatically get bound over the previously bound buffer
  unbind(gl: WebGL2RenderingContext) {
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }
}

export { VertexBuffer };
