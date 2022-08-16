import Checkbox from "@mui/material/Checkbox";
import React, { useState } from "react";

interface Layer {
  selected: boolean;
  name: string;
  // index where the corresponding 3D Object is stored
  objectId: number;
}

export function Layers(props: {
  objectCount: number;
  addObject: (id: number) => void;
  deleteObject: (id: number) => void;
  selectObject: (id: number) => void;
}) {
  const [layers, setLayers] = useState([] as Layer[]);
  const [layerCount, setLayerCount] = useState(0);

  const { objectCount, addObject, deleteObject, selectObject } = props;

  const addLayer = (layer: Layer) => {
    layers.push(layer);
    addObject(layer.objectId);
  };

  const removeLayer = (objectId: number) => {
    const index = layers.findIndex((layer) => layer.objectId === objectId);
    layers.splice(index, 1);
    setLayerCount(layerCount + 1);
    deleteObject(objectId);
  };

  const selectLayer = (objectId: number) => {
    const index = layers.findIndex((layer) => layer.objectId === objectId);
    layers[index].selected = !layers[index].selected;
    setLayers([...layers]);
    selectObject(objectId);
  };

  return (
    <div className="layers">
      <button
        onClick={() =>
          addLayer({
            name: `layer ${layerCount}`,
            objectId: objectCount,
            selected: false,
          })
        }
      >
        Add Object
      </button>
      {objectCount}
      {layers.map((layer, key) => (
        <div key={key} className="layer">
          {layer.name}
          <button onClick={() => removeLayer(layer.objectId)}>Delete</button>
          <Checkbox
            checked={layer.selected}
            onChange={() => selectLayer(layer.objectId)}
          />
        </div>
      ))}
    </div>
  );
}
