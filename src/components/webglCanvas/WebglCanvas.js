import React, { useEffect, useRef, useState } from "react";
// import ReactSlider from "react-slider";
import { initWebGL } from "../../WebGLCore/main";
import { render } from "../../WebGLCore/renderer";
import Slider from "@mui/material/Slider";
import "./webgl.css";

let gl, programInfo, buffers, texture;

export function WebglCanvas() {
  const canvasRef = useRef(null);

  const [slider, setSlider] = useState(0);
  const [spinRate, setSpinRate] = useState(0);
  const [currentAnimationId, setCurrentAnimationId] = useState(null);

  useEffect(() => {
    [gl, programInfo, buffers, texture] = initWebGL(canvasRef);
  }, []);

  useEffect(() => {
    cancelAnimationFrame(currentAnimationId);
    requestAnimationFrame((timestamp) => {
      const animationId = render(timestamp, gl, programInfo, buffers, texture, spinRate);
      setCurrentAnimationId(animationId);
    });
  }, [spinRate]);

  const handleChange = (event, newValue) => {
    setSlider(newValue);
    setSpinRate(newValue / 10000);
  };

  return (
    <div className="graphicsEngine">
      <div className="controls">
        Spin Speed:
        <Slider
          className="slider"
          aria-label="Speed"
          value={slider}
          onChange={handleChange}
          color="secondary"
        />
      </div>

      <div className="canvasContainer">
        <canvas className="canvas" ref={canvasRef} width="800" height="800"></canvas>
      </div>
    </div>
  );
}
