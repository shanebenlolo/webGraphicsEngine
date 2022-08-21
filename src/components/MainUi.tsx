import React, { useEffect, useRef, useState } from "react";
import { objCollection, render } from "../WebGLCore/renderer";
import Slider from "@mui/material/Slider";
import "./ui.css";
import { Layers } from "./Layers";
import {
  handleMouseControls,
  mouseDown,
  mouseMove,
  mouseOut,
  mouseUp,
} from "../WebGLCore/mouseControls";

let gl: WebGL2RenderingContext;

const vw = Math.max(
  document.documentElement.clientWidth * 0.5 || 0,
  window.innerWidth * 0.5 || 0
);
const vh = Math.max(
  document.documentElement.clientHeight * 0.5 || 0,
  window.innerHeight * 0.5 || 0
);

export function MainUi() {
  const canvasRef = useRef(null);

  // const [shape, setShape] = useState("cube");
  const [objectCount, setObjectCount] = useState(0);
  const [ambientLight, setAmbientLight] = useState(0.5);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [translation, setTranslation] = useState({ x: 0, y: 0, z: -5 });
  const [objectToAdd, setObjectToAdd] = useState(null);
  const [objectToDelete, setObjectToDelete] = useState(null);
  const [activeId, setActiveId] = useState(0);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    // remove preserve arg if you switch to animation loop
    gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true });
  }, []);

  useEffect(() => {
    handleMouseControls(gl, rotateObject, translateObject, rotation, translation);
    render(gl, objectToDelete, objectToAdd, ambientLight);
    setObjectToDelete(null);
    setObjectToAdd(null);
  });

  const updateAmbientLight = (value: number) => {
    setAmbientLight(value);
  };

  const rotateObject = (payload: { x: number; y: number; z: number }) => {
    setRotation(() => ({
      ...payload,
    }));
    objCollection.get(activeId).setRotation(rotation);
  };

  const translateObject = (payload: { x: number; y: number; z: number }) => {
    setTranslation(() => ({
      ...payload,
    }));
    objCollection.get(activeId).setTranslation(translation);
  };

  const deleteObject = (id: number) => {
    setObjectToDelete(id);
    setObjectCount(objectCount - 1);
  };

  const addObject = (id: number) => {
    setObjectToAdd(id);
    setActiveId(id);
    setObjectCount(objectCount + 1);
  };

  const selectObject = (id: number) => {
    setActiveId(id);
  };

  return (
    <div className="graphicsEngine">
      <div className="tools">
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
        </div>
        <Layers
          objectCount={objectCount}
          addObject={addObject}
          deleteObject={deleteObject}
          selectObject={selectObject}
        />
      </div>

      <div className="canvasContainer">
        <canvas
          onContextMenu={(e) => e.preventDefault()}
          className="canvas"
          ref={canvasRef}
          width={vw}
          height={vh}
        ></canvas>
      </div>
    </div>
  );
}
