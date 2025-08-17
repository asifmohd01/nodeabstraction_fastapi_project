// src/nodes/InputNode.js
import React from "react";
import BaseNode from "./BaseNode";

export default function InputNode({ id, data }) {
  const title = data?.title ?? "Input";

  return (
    <BaseNode
      id={id}
      data={{
        title,
        subtitle: "Source",
        inputs: [], // No incoming edges
        outputs: [{ id: `${id}-out`, label: "out" }], // Standardized naming
        children: <div>Provides data to the pipeline.</div>,
      }}
    />
  );
}
