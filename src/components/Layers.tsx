import React, { useState } from "react";

export function Layers(props: {
  objectCount: number;
  updateCount: (value: number) => void;
}) {
  const [layers, setLayers] = useState([{ name: "layer 0" }]);

  const { objectCount, updateCount } = props;

  const addLayer = (newCount: number, layer: { name: string }) => {
    layers.push(layer);
    updateCount(newCount);
  };

  const removeLayer = (newCount: number) => {
    layers.pop();
    updateCount(newCount);
  };

  return (
    <div className="layers">
      <button onClick={() => removeLayer(objectCount - 1)}>-</button>
      <button onClick={() => addLayer(objectCount + 1, { name: `layer ${objectCount}` })}>
        +
      </button>
      {objectCount}
      {layers.map((layer) => (
        <div className="layer">{layer.name}</div>
      ))}
    </div>
  );
}
