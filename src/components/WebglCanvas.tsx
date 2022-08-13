import React, { useEffect, useRef, useState } from "react";
import { render } from "../WebGLCore/renderer";
import Slider from "@mui/material/Slider";
import "./webgl.css";
import { XyzSliders } from "./XyzSliders";
import { Layers } from "./Layers";

let gl: WebGLRenderingContext;

export function WebglCanvas() {
  const canvasRef = useRef(null);

  const [shape, setShape] = useState("cube");
  const [ambientLight, setAmbientLight] = useState(0.5);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [translation, setTranslation] = useState({ x: 0, y: 0, z: -10 });
  const [objectCount, setObjectCount] = useState(1);
  const [rerender, setRerender] = useState(false);

  // init webgl when first mounting component
  useEffect(() => {
    gl = canvasRef.current.getContext("webgl");
  }, []);

  useEffect(() => {
    render(gl, objectCount, ambientLight, rotation, translation);
  }, [rerender]);

  const updateAmbientLight = (value: number) => {
    setAmbientLight(value);
    setRerender(!rerender);
  };

  const updateRotation = (payload: { value: number; axis: string }) => {
    const { value, axis } = payload;
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
    setRerender(!rerender);
  };

  const updateTranslation = (payload: { value: number; axis: string }) => {
    const { value, axis } = payload;
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
    setRerender(!rerender);
  };

  const updateObjectCount = (value: number) => {
    setObjectCount(value);
    setRerender(!rerender);
  };

  return (
    <div className="graphicsEngine">
      <div className="controls">
        ambient light:
        <Slider
          className="slider"
          aria-label="light"
          value={ambientLight}
          onChange={(_, value) => updateAmbientLight(value as number)}
          color="secondary"
          max={1}
          step={0.01}
        />
        <XyzSliders
          title="Rotate"
          x={rotation.x}
          y={rotation.y}
          z={rotation.z}
          min={-2}
          max={2}
          step={0.01}
          callback={updateRotation}
        />
        <XyzSliders
          title="Translate"
          x={translation.x}
          y={translation.y}
          z={translation.z}
          min={-20}
          max={0}
          step={0.01}
          callback={updateTranslation}
        />
        <Layers objectCount={objectCount} updateCount={updateObjectCount} />
      </div>
      <div className="canvasContainer">
        <canvas className="canvas" ref={canvasRef} width="800" height="800"></canvas>
      </div>
    </div>
  );
}
