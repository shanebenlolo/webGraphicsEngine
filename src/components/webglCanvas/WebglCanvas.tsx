import React, { useEffect, useRef, useState } from "react";
// import ReactSlider from "react-slider";
import { initWebGL } from "../../WebGLCore/main";
import { render } from "../../WebGLCore/renderer";
import Slider from "@mui/material/Slider";
import "./webgl.css";
import { GLProps } from "../../WebGLCore/interfaces/GLProps";
import { ProgramInfo } from "../../WebGLCore/interfaces/ProgramInfo";
import { Buffers } from "../../WebGLCore/interfaces/Buffers";

let renderProps: GLProps;
let gl: WebGLRenderingContext;
let programInfo: ProgramInfo;
let buffers: Buffers;
let texture: WebGLTexture;

export function WebglCanvas() {
  const canvasRef = useRef(null);

  const [slider, setSlider] = useState(0);
  const [spinRate, setSpinRate] = useState(0);
  const [currentAnimationId, setCurrentAnimationId] = useState(null);

  useEffect(() => {
    renderProps = initWebGL(canvasRef);
  }, []);

  useEffect(() => {
    cancelAnimationFrame(currentAnimationId);
    requestAnimationFrame((timestamp) => {
      const animationId = render(renderProps, timestamp, spinRate);
      setCurrentAnimationId(animationId);
    });
  }, [spinRate]);

  function handleChange(newValue: number | number[]) {
    if (typeof newValue === "number") {
      setSlider(newValue);
      setSpinRate(newValue / 10000);
    }
  }

  return (
    <div className="graphicsEngine">
      <div className="controls">
        Spin Speed:
        <Slider
          className="slider"
          aria-label="Speed"
          value={slider}
          onChange={(event, test) => handleChange(test)}
          color="secondary"
        />
      </div>

      <div className="canvasContainer">
        <canvas className="canvas" ref={canvasRef} width="800" height="800"></canvas>
      </div>
    </div>
  );
}
