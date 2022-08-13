import { drawScene } from "./drawScene";
import { GLProps } from "./interfaces/GLProps";

let then = 0;

const render = (
  renderProps: GLProps,
  ambientLight: number,
  rotation: { x: number; y: number; z: number },
  translation: { x: number; y: number; z: number }
) => {
  const ambientLightValues = [ambientLight, ambientLight, ambientLight];
  const { gl, programInfoA, programInfoB, buffersA, buffersB } = renderProps;

  drawScene(
    gl,
    programInfoA,
    programInfoB,
    buffersA,
    buffersB,
    ambientLightValues,
    rotation,
    translation
  );

  const animationId = requestAnimationFrame((timestamp) => {
    render(renderProps, ambientLight, rotation, translation);
  });

  return animationId;
};

export { render };
