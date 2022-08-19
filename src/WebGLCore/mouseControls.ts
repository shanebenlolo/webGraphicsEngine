export const mouseDown = (e: MouseEvent, gl: WebGL2RenderingContext) => {
  const rect = gl.canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  console.log(mouseX);
  console.log(mouseY);
  const pixelX = (mouseX * gl.canvas.width) / gl.canvas.clientWidth;
  const pixelY =
    gl.canvas.height - (mouseY * gl.canvas.height) / gl.canvas.clientHeight - 1;
  const data = new Uint8Array(4);
  gl.readPixels(
    pixelX, // x
    pixelY, // y
    1, // width
    1, // height
    gl.RGBA, // format
    gl.UNSIGNED_BYTE, // type
    data
  ); // typed array to hold result

  console.log(data);
};
