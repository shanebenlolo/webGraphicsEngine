import { Buffers } from "./Buffers";
import { ProgramInfo } from "./ProgramInfo";

interface GLProps {
  gl: WebGLRenderingContext;
  programInfo: ProgramInfo;
  buffers: Buffers;
  // texture: WebGLTexture;
}

export { GLProps };
