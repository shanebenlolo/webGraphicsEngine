import { Buffers } from "./Buffers";
import { ProgramInfo } from "./ProgramInfo";

interface GLProps {
  gl: WebGLRenderingContext;
  programInfoA: ProgramInfo;
  programInfoB: ProgramInfo;
  buffersA: Buffers;
  buffersB: Buffers;
  // texture: WebGLTexture;
}

export { GLProps };
