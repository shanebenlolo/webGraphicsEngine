import { Obj } from "./classes/Obj/Obj";
import { Scene } from "./classes/Scene";

let scene: Scene = null;

export const objCollection: Map<number, Obj> = new Map();

export const render = (
  gl: WebGL2RenderingContext,
  deleteObjId: number,
  addObjId: number,
  ambientLight: number
) => {
  if (scene === null) {
    scene = new Scene(gl);
  }
  scene.setBackground();

  // definitely a better way to do this
  if (deleteObjId !== null) {
    objCollection.delete(deleteObjId);
  } else if (addObjId !== null) {
    objCollection.set(addObjId, new Obj(gl, [ambientLight, ambientLight, ambientLight]));
  }

  objCollection.forEach((obj) => {
    obj.draw();
  });
};
