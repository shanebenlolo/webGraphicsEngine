class VertexArray {
  gl: WebGL2RenderingContext;
  buffer: WebGLBuffer;
  attribute: number; // memory location of attribute to be assigned to
  numComponents: number; // how values to pull out per iteration
  type: number; // the type of data in the buffer (32bit floats, 16bit ints, etc.)
  normalize: boolean; // do/don't normalize
  stride: number; // how many bytes to get from one set of values to the next
  offset: number; // how many bytes inside the buffer to start from

  constructor(
    gl: WebGL2RenderingContext,
    buffer: WebGLBuffer,
    attribute: number,
    numComponents: number,
    type: number,
    normalize: boolean,
    stride: number,
    offset: number
  ) {
    this.gl = gl;
    this.buffer = buffer;
    this.attribute = attribute;
    this.numComponents = numComponents;
    this.type = type;
    this.normalize = normalize;
    this.stride = stride;
    this.offset = offset;
  }

  enable() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.vertexAttribPointer(
      this.attribute,
      this.numComponents,
      this.type,
      this.normalize,
      this.stride,
      this.offset
    );
    this.gl.enableVertexAttribArray(this.attribute);
  }
}

export { VertexArray };
