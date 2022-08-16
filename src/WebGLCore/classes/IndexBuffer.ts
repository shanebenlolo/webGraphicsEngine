class IndexBuffer {
  gl: WebGL2RenderingContext;
  data: Uint16Array;
  buffer: WebGLBuffer | null;

  constructor(gl: WebGL2RenderingContext, data: Uint16Array) {
    this.gl = gl;
    this.buffer = this.gl.createBuffer();
    this.data = data;

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
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

export { IndexBuffer };
