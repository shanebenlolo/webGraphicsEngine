import { cubeShaders } from "../apis/shapes/cube/cubeShaders";

// Initialize a shader program, so WebGL knows how to draw our data
const initShaders = (gl: WebGL2RenderingContext) => {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, cubeShaders.vertexShader);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, cubeShaders.fragmentShader);

  // Create the shader program
  const shaderProgram = gl.createProgram();

  if (shaderProgram === null || vertexShader == null || fragmentShader == null) {
    console.log("shaderProgram, vertexShader, or fragmentShader is null or undefined");
    return;
  }

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      "Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram)
    );
    return null;
  }

  return shaderProgram;
};

// creates a shader of the given type, uploads the source and
// compiles it.
const loadShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);

  if (shader === null) {
    console.log("shader is null");
    return;
  }

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

export { initShaders };
