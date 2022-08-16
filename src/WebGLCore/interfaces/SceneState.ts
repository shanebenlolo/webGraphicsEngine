import { Obj } from "../classes/Obj/Obj";

// currently unused
export interface SceneState {
  objMap: Map<number, Obj>;
  lighting: number[];
}
