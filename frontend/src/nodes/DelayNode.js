// src/nodes/DelayNode.js
import React from "react";
import BaseNode from "./BaseNode";

export default function DelayNode({ id, data }) {
  const ms = data?.ms ?? 500; // default 500 ms

  return (
    <BaseNode
      id={id}
      data={{
        title: "Delay",
        subtitle: `${ms} ms`,
        inputs: [{ id: `${id}-in`, label: "In" }],
        outputs: [{ id: `${id}-out`, label: "Out" }],
        children: (
          <div style={{ fontSize: "12px", color: "#555" }}>
            Delays flow by {ms} ms (demo).
          </div>
        ),
      }}
    />
  );
}
