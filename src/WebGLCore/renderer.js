import { drawScene } from "./drawScene.ts";

let then = 0;

// watch cherno on how to abstract this in a better way
const render = (timestamp, gl, programInfo, buffers, texture, spinRate) => {
  timestamp *= spinRate;
  const deltaTime = timestamp - then;
  then = timestamp;

  drawScene(gl, programInfo, buffers, texture, deltaTime);

  const animationId = requestAnimationFrame((timestamp) => {
    render(timestamp, gl, programInfo, buffers, texture, spinRate);
  });

  return animationId;
};

export { render };
