import { mat4 } from "gl-matrix";
import { initBuffers } from "./initBuffers";
import { initShaders } from "./initShaders";
import { Buffers } from "../../interfaces/Buffers";
import { AttributeLocations, ProgramInfo } from "../../interfaces/ProgramInfo";
import { VertexArray } from "../VertexArray";

export class Obj {
  gl: WebGL2RenderingContext;
  id: number;
  buffers: Buffers;
  programInfo: ProgramInfo;
  rotation: { x: number; y: number; z: number };
  translation: { x: number; y: number; z: number };
  uAmbientLight: number[];
  projectionMatrix: mat4;
  modelViewMatrix: mat4;
  normalMatrix: mat4;
  vertexCount: number;
  type: number;
  offset: number;

  constructor(gl: WebGL2RenderingContext, uAmbientLight: number[]) {
    this.gl = gl;
    this.buffers = initBuffers(gl);
    this.programInfo = initShaders(gl);

    this.uAmbientLight = uAmbientLight;
    this.rotation = { x: 0, y: 0, z: 0 };
    this.translation = { x: 0, y: 0, z: -5 };

    this.projectionMatrix = this.createProjectionMatrix(gl);
    this.modelViewMatrix = mat4.create();
    this.normalMatrix = mat4.create();

    this.vertexCount = 36;
    this.type = gl.UNSIGNED_SHORT;
    this.offset = 0;
  }

  setTranslation(translation: { x: number; y: number; z: number }) {
    this.translation = translation;
  }

  setRotation(rotation: { x: number; y: number; z: number }) {
    this.rotation = rotation;
  }

  draw() {
    this.translate();
    this.rotate();

    // calculate the lighting
    mat4.invert(this.normalMatrix, this.modelViewMatrix);
    mat4.transpose(this.normalMatrix, this.normalMatrix);

    const { shaderProgram, attributeLocations, uniformLocations } = this.programInfo;

    // create and enable all vertex arrays
    this.createVertexArrays(attributeLocations).forEach((vertexArray) => {
      vertexArray.enable();
    });

    // Tell WebGL to use our program when drawing
    // set the uniforms for the shader
    // draw
    shaderProgram.bind();
    shaderProgram.setUniform4f(uniformLocations.projectionMatrix, this.projectionMatrix);
    shaderProgram.setUniform4f(uniformLocations.modelViewMatrix, this.modelViewMatrix);
    shaderProgram.setUniform4f(uniformLocations.normalMatrix, this.normalMatrix);
    shaderProgram.setUniform3f(uniformLocations.uAmbientLight, this.uAmbientLight);
    this.gl.drawElements(this.gl.TRIANGLES, this.vertexCount, this.type, this.offset);

    // reset our matrices for the next draw call
    this.modelViewMatrix = mat4.create();
    this.normalMatrix = mat4.create();
  }

  translate() {
    const modelViewMatrix: mat4 = mat4.create();

    mat4.translate(
      modelViewMatrix, // destination matrix
      modelViewMatrix, // matrix to translate
      [this.translation.x, this.translation.y, this.translation.z] // amount to translate
    );

    this.modelViewMatrix = modelViewMatrix;
  }

  rotate() {
    mat4.rotate(
      this.modelViewMatrix, // destination matrix
      this.modelViewMatrix, // matrix to rotate
      this.rotation.z, // amount to rotate in radians
      [0, 0, 1] // axis to rotate around (Z)
    );

    mat4.rotate(
      this.modelViewMatrix, // destination matrix
      this.modelViewMatrix, // matrix to rotate
      this.rotation.x, // amount to rotate in radians
      [0, 1, 0] // axis to rotate around (X)
    );

    mat4.rotate(
      this.modelViewMatrix, // destination matrix
      this.modelViewMatrix, // matrix to rotate
      this.rotation.y, // amount to rotate in radians
      [1, 0, 0] // axis to rotate around (Y)
    );
  }

  createVertexArrays = (attributeLocations: AttributeLocations): VertexArray[] => {
    const positionVertexArray = new VertexArray(
      this.gl,
      this.buffers.position,
      attributeLocations.vertexPosition,
      3,
      this.gl.FLOAT,
      false,
      0,
      0
    );

    const colorVertexArray = new VertexArray(
      this.gl,
      this.buffers.color,
      attributeLocations.vertexColor,
      4,
      this.gl.FLOAT,
      false,
      0,
      0
    );

    const normalVertexArray = new VertexArray(
      this.gl,
      this.buffers.normal,
      attributeLocations.vertexNormal,
      3,
      this.gl.FLOAT,
      false,
      0,
      0
    );

    return [positionVertexArray, colorVertexArray, normalVertexArray];
  };

  createProjectionMatrix = (gl: WebGL2RenderingContext): mat4 => {
    const fieldOfView = (45 * Math.PI) / 180; // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    return mat4.perspective(mat4.create(), fieldOfView, aspect, zNear, zFar);
  };
}
