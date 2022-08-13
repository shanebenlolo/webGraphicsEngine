import { drawScene } from "./drawScene";
import { initBuffers } from "./initBuffers";
import { initShaders } from "./initShaders";
import { SceneState } from "./interfaces/SceneState";

const state: SceneState = {
  intialized: false,
  objectCount: -1,
  buffers: new Map(),
  programs: new Map(),
};

const render = (
  gl: WebGLRenderingContext,
  objectCount: number,
  ambientLight: number,
  rotation: { x: number; y: number; z: number },
  translation: { x: number; y: number; z: number }
) => {
  // if objCount doesn't match or buffers havent' been established, recreate buffers
  if (objectCount !== state.objectCount || state.intialized === false) {
    const numObjsToCreate: number = objectCount - state.objectCount;

    for (let i = 0; i < numObjsToCreate; i++) {
      state.buffers.set(state.objectCount + 1, initBuffers(gl));
      state.programs.set(state.objectCount + 1, initShaders(gl));
      state.objectCount++;
    }

    state.intialized = true;
  }

  drawScene(
    gl,
    objectCount,
    state.buffers,
    state.programs,
    [ambientLight, ambientLight, ambientLight],
    rotation,
    translation
  );
};

export { render };
