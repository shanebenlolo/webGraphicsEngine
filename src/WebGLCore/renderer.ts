import { drawScene } from "./drawScene";
import { GLProps } from "./interfaces/GLProps";

let then = 0;

const render = (renderProps: GLProps, timestamp: number, spinRate: number) => {
  timestamp *= spinRate;
  const deltaTime = timestamp - then;
  then = timestamp;

  const { gl, programInfo, buffers, texture } = renderProps;

  drawScene(gl, programInfo, buffers, texture, deltaTime);

  const animationId = requestAnimationFrame((timestamp) => {
    render(renderProps, timestamp, spinRate);
  });

  return animationId;
};

export { render };
