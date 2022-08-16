import React from "react";
import Slider from "@mui/material/Slider";
import "./ui.css";

export function XyzSliders(props: {
  title: string;
  x: number;
  y: number;
  z: number;
  min: number;
  max: number;
  step: number;
  callback: (args: { value: number; axis: "x" | "y" | "z" }) => void;
}) {
  return (
    <div>
      <h3> {props.title}</h3>
      <div className="xyz-controls">
        {props.title} X:
        <Slider
          className="slider"
          aria-label="x"
          value={props.x}
          color="secondary"
          min={props.min}
          max={props.max}
          step={props.step}
          onChange={(_, value) => props.callback({ value: value as number, axis: "x" })}
        />
        {props.title} Y:
        <Slider
          className="slider"
          aria-label="y"
          value={props.y}
          color="secondary"
          min={props.min}
          max={props.max}
          step={props.step}
          onChange={(_, value) => props.callback({ value: value as number, axis: "y" })}
        />
        {props.title} Z:
        <Slider
          className="slider"
          aria-label="z"
          value={props.z}
          color="secondary"
          min={props.min}
          max={props.max}
          step={props.step}
          onChange={(_, value) => props.callback({ value: value as number, axis: "z" })}
        />
      </div>
    </div>
  );
}
