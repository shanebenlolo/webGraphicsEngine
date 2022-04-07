class VertexBuffer {
  gl: WebGLRenderingContext;
  data: Float32Array;
  buffer: WebGLBuffer | null;

  constructor(gl: WebGLRenderingContext, data: Float32Array) {
    this.gl = gl;
    this.data = data;
    this.buffer = this.gl.createBuffer();

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
  }

  deleteBuffer() {
    this.gl.deleteBuffer(this.buffer);
  }

  bind() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
  }

  // this is actually unneeded because whatever buffer is used
  // next will automatically get bound over the previously bound buffer
  unbind() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  }
}

export { VertexBuffer };
