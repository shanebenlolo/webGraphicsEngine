class VertexArray {
  buffer: WebGLBuffer;
  attribute: number;
  numComponents: number;
  type: number;
  normalize: boolean;
  stride: number;
  offset: number;

  constructor(
    buffer: WebGLBuffer,
    attribute: number,
    numComponents: number,
    type: number,
    normalize: boolean,
    stride: number,
    offset: number
  ) {
    this.buffer = buffer;
    this.attribute = attribute;
    this.numComponents = numComponents;
    this.type = type;
    this.normalize = normalize;
    this.stride = stride;
    this.offset = offset;
  }

  enable(gl: WebGLRenderingContext) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.vertexAttribPointer(
      this.attribute,
      this.numComponents,
      this.type,
      this.normalize,
      this.stride,
      this.offset
    );
    gl.enableVertexAttribArray(this.attribute);
  }
}

export { VertexArray };
