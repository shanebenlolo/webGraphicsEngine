const LEFT_CLICK = 1;
const RIGHT_CLICK = 2;

let isDragging = false;
let initalX: number;
let initialY: number;
let prevX: number;
let prevY: number;

export const handleMouseControls = (
  gl: WebGL2RenderingContext,
  rotateCallback: (payload: { x: number; y: number; z: number }) => void,
  translateCallback: (payload: { x: number; y: number; z: number }) => void,
  rotation: { x: number; y: number; z: number },
  translation: { x: number; y: number; z: number }
) => {
  gl.canvas.onmouseup = () => mouseUp();
  gl.canvas.onmouseout = () => mouseOut();
  gl.canvas.onmousedown = (e) => mouseDown(e, gl);
  gl.canvas.onmousemove = (e) =>
    mouseMove(e, rotateCallback, translateCallback, rotation, translation);
};

export const mouseDown = (e: MouseEvent, gl: WebGL2RenderingContext) => {
  if (isMouseInShape(gl, e)) {
    isDragging = true;
    initalX = e.clientX;
    initialY = e.clientY;
  }
};

export const mouseMove = (
  e: MouseEvent,
  rotateCallback: (payload: { x: number; y: number; z: number }) => void,
  translateCallback: (payload: { x: number; y: number; z: number }) => void,
  rotation: { x: number; y: number; z: number },
  translation: { x: number; y: number; z: number }
) => {
  if (isDragging) {
    if (prevX && prevY) {
      switch (e.buttons) {
        case LEFT_CLICK:
          const rotated = { x: rotation.x, y: rotation.y, z: rotation.z };
          rotated.x = rotation.x + (e.clientX - prevX) / 100;
          rotated.y = rotation.y + (e.clientY - prevY) / 100;
          rotateCallback(rotated);
          break;
        case RIGHT_CLICK:
          const translated = { x: translation.x, y: translation.y, z: translation.z };
          translated.x = translation.x - ((e.clientX - prevX) / 150) * -1;
          translated.y = translation.y - (e.clientY - prevY) / 150;
          translateCallback(translated);
          break;
      }
    }

    prevX = e.clientX;
    prevY = e.clientY;
  }
};

export const mouseUp = () => {
  if (!isDragging) return;
  isDragging = false;
  prevX = null;
  prevY = null;
};
export const mouseOut = () => {
  if (!isDragging) return;
  isDragging = false;
  prevX = null;
  prevY = null;
};

const isMouseInShape = (gl: WebGL2RenderingContext, e: MouseEvent) => {
  const rect = gl.canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const pixelX = (mouseX * gl.canvas.width) / gl.canvas.clientWidth;
  const pixelY =
    gl.canvas.height - (mouseY * gl.canvas.height) / gl.canvas.clientHeight - 1;
  const colorData = new Uint8Array(4);
  gl.readPixels(
    pixelX, // x
    pixelY, // y
    1, // width
    1, // height
    gl.RGBA, // format
    gl.UNSIGNED_BYTE, // type
    colorData
  ); // typed array to hold result

  //if youre not clicking black
  if (colorData[0] !== 0 || colorData[1] !== 0 || colorData[2] !== 0) {
    return true;
  }
  return false;
};
