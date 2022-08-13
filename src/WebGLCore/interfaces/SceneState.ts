import { Buffers } from "./Buffers";
import { ProgramInfo } from "./ProgramInfo";

export interface SceneState {
  intialized: boolean;
  objectCount: number;
  buffers: Map<number, Buffers>;
  programs: Map<number, ProgramInfo>;
}
