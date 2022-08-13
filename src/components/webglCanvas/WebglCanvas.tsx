import React, { useEffect, useRef, useState } from "react";
import { initWebGL } from "../../WebGLCore/main";
import { render } from "../../WebGLCore/renderer";
import Slider from "@mui/material/Slider";
import "./webgl.css";
import { GLProps } from "../../WebGLCore/interfaces/GLProps";

let renderProps: GLProps;

export function WebglCanvas() {
  const canvasRef = useRef(null);

  const [shape, setShape] = useState("cube");
  const [ambientLight, setAmbientLight] = useState(0.5);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [translation, setTranslation] = useState({ x: 0, y: 0, z: -10 });
  const [currentAnimationId, setCurrentAnimationId] = useState(null);
  const [rerender, setRerender] = useState(true);

  // init webgl when first mounting component
  useEffect(() => {
    renderProps = initWebGL(canvasRef, shape);
  }, []);

  // render canvas on mount
  // rerender as needed
  useEffect(() => {
    cancelAnimationFrame(currentAnimationId);
    requestAnimationFrame((timestamp) => {
      const animationId = render(renderProps, ambientLight, rotation, translation);
      setCurrentAnimationId(animationId);
    });
  }, [rerender]);

  const rerenderCanvas = () => {
    setRerender(!rerender);
  };

  function handleAmbientLighting(value: number | number[]) {
    if (typeof value === "number") {
      setAmbientLight(value);
      rerenderCanvas();
    }
  }

  function handleRotation(payload: { value: number | number[]; axis: string }) {
    const { value, axis } = payload;
    if (typeof value === "number") {
      switch (axis) {
        case "x":
          setRotation(() => ({
            ...rotation,
            x: value,
          }));
          break;
        case "y":
          setRotation(() => ({
            ...rotation,
            y: value,
          }));
          break;
        case "z":
          setRotation(() => ({
            ...rotation,
            z: value,
          }));
          break;
      }
      rerenderCanvas();
    }
  }
  function handleTranslation(payload: { value: number | number[]; axis: string }) {
    const { value, axis } = payload;
    if (typeof value === "number") {
      switch (axis) {
        case "x":
          setTranslation(() => ({
            ...translation,
            x: value,
          }));
          break;
        case "y":
          setTranslation(() => ({
            ...translation,
            y: value,
          }));
          break;
        case "z":
          setTranslation(() => ({
            ...translation,
            z: value,
          }));
          break;
      }
      rerenderCanvas();
    }
  }

  return (
    <div className="graphicsEngine">
      <div className="controls">
        ambient light:
        <Slider
          className="slider"
          aria-label="light"
          value={ambientLight}
          onChange={(_, value) => handleAmbientLighting(value)}
          color="secondary"
          max={1}
          step={0.01}
        />
        rotate X:
        <Slider
          className="slider"
          aria-label="x"
          value={rotation.x}
          onChange={(_, value) => handleRotation({ value, axis: "x" })}
          color="secondary"
          max={1}
          step={0.01}
        />
        rotate Y:
        <Slider
          className="slider"
          aria-label="y"
          value={rotation.y}
          onChange={(_, value) => handleRotation({ value, axis: "y" })}
          color="secondary"
          max={1}
          step={0.01}
        />
        rotate Z:
        <Slider
          className="slider"
          aria-label="z"
          value={rotation.z}
          onChange={(_, value) => handleRotation({ value, axis: "z" })}
          color="secondary"
          max={1}
          step={0.01}
        />
        translate X:
        <Slider
          className="slider"
          aria-label="x"
          value={translation.x}
          onChange={(_, value) => handleTranslation({ value, axis: "x" })}
          color="secondary"
          max={5}
          min={-5}
          step={0.01}
        />
        translate Y:
        <Slider
          className="slider"
          aria-label="y"
          value={translation.y}
          onChange={(_, value) => handleTranslation({ value, axis: "y" })}
          color="secondary"
          max={5}
          min={-5}
          step={0.01}
        />
        translate Z:
        <Slider
          className="slider"
          aria-label="z"
          value={translation.z}
          onChange={(_, value) => handleTranslation({ value, axis: "z" })}
          color="secondary"
          max={-2}
          min={-15}
          step={0.01}
        />
        {/* <div className="shapes">
          <h3>Select Shape</h3>
          <div className="shapes-buttons"></div>
          <button className="button" onClick={() => setShape("cube")}>
            Cube
          </button>
          <button className="button" onClick={() => setShape("sphere")}>
            sphere
          </button>
        </div> */}
      </div>

      <div className="canvasContainer">
        <canvas className="canvas" ref={canvasRef} width="800" height="800"></canvas>
      </div>
    </div>
  );
}
