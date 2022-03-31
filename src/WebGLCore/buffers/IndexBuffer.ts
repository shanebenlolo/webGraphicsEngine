class IndexBuffer {
  data: Uint16Array;
  buffer: WebGLBuffer | null;

  constructor(gl: WebGL2RenderingContext, data: Uint16Array) {
    this.buffer = gl.createBuffer();
    this.data = data;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
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

export { IndexBuffer };
