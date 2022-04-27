import { drawScene } from "./drawScene";
import { GLProps } from "./interfaces/GLProps";

let then = 0;

const render = (renderProps: GLProps, timestamp: number, spinRate: number) => {
  timestamp *= spinRate;
  const deltaTime = timestamp - then;
  then = timestamp;

  const { gl, programInfo, buffers } = renderProps;

  drawScene(gl, programInfo, buffers, deltaTime, timestamp);

  const animationId = requestAnimationFrame((timestamp) => {
    render(renderProps, timestamp, spinRate);
  });

  return animationId;
};

export { render };
