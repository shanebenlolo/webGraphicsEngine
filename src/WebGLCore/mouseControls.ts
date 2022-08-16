// import { getCanvas, getGL } from "../components/MainUi";

// export const mouseDown = (event: MouseEvent) => {
//   const canvas = getCanvas();
//   const gl = getGL();
//   const rect = canvas.getBoundingClientRect();
//   const mouseX = event.clientX - rect.left;
//   const mouseY = event.clientY - rect.top;

//   const pixelX = (mouseX * gl.canvas.width) / gl.canvas.clientWidth;
//   const pixelY =
//     gl.canvas.height - (mouseY * gl.canvas.height) / gl.canvas.clientHeight - 1;
//   const data = new Uint8Array(4);
//   gl.readPixels(
//     pixelX, // x
//     pixelY, // y
//     1, // width
//     1, // height
//     gl.RGBA, // format
//     gl.UNSIGNED_BYTE, // type
//     data
//   ); // typed array to hold result

//   console.log(data);
// };
