import React, { useEffect, useRef, useState } from "react";
import { objCollection, render } from "../WebGLCore/renderer";
import Slider from "@mui/material/Slider";
import "./ui.css";
import { XyzSliders } from "./XyzSliders";
import { Layers } from "./Layers";
import { mouseDown } from "../WebGLCore/mouseControls";

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
  const [rerender, setRerender] = useState(false);
  const [objectCount, setObjectCount] = useState(0);
  const [ambientLight, setAmbientLight] = useState(0.5);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [translation, setTranslation] = useState({ x: 0, y: 0, z: -5 });
  const [objectToAdd, setObjectToAdd] = useState(null);
  const [objectToDelete, setObjectToDelete] = useState(null);
  const [activeId, setActiveId] = useState(0);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    gl = canvas.getContext("webgl2");
    canvas.onmousedown = (e) => mouseDown(e, gl);
    // canvasRef.current.addEventListener("click", () => console.log("test"));
    // canvas.onmousedown = mouseDown;
  }, []);

  useEffect(() => {
    render(gl, objectToDelete, objectToAdd, ambientLight);
    setObjectToDelete(null);
    setObjectToAdd(null);
  }, [rerender]);

  const updateAmbientLight = (value: number) => {
    setAmbientLight(value);
    setRerender(!rerender);
  };

  const rotateObject = (payload: { value: number; axis: string }) => {
    const { value, axis } = payload;

    // update UI
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

    // update Obj
    objCollection.get(activeId).setRotation(rotation);

    setRerender(!rerender);
  };

  const translateObject = (payload: { value: number; axis: string }) => {
    //update UI
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

    // update Obj
    objCollection.get(activeId).setTranslation(translation);

    setRerender(!rerender);
  };

  const deleteObject = (id: number) => {
    setObjectToDelete(id);
    setObjectCount(objectCount - 1);
    setRerender(!rerender);
  };

  const addObject = (id: number) => {
    setObjectToAdd(id);
    setActiveId(id);
    setObjectCount(objectCount + 1);
    setRerender(!rerender);
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
          <XyzSliders
            title="Rotate"
            x={rotation.x}
            y={rotation.y}
            z={rotation.z}
            min={-2}
            max={2}
            step={0.01}
            callback={rotateObject}
          />
          <XyzSliders
            title="Translate"
            x={translation.x}
            y={translation.y}
            z={translation.z}
            min={-5}
            max={5}
            step={0.01}
            callback={translateObject}
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
        <canvas className="canvas" ref={canvasRef} width={vw} height={vh}></canvas>
      </div>
    </div>
  );
}
