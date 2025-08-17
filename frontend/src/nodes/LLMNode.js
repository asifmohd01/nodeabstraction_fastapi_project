// src/nodes/LLMNode.js
import React from "react";
import BaseNode from "./BaseNode";

export default function LLMNode({ id, data }) {
  const model = data?.model || "gpt-3.5";

  return (
    <BaseNode
      id={id}
      data={{
        title: "LLM",
        subtitle: model,
        // Inputs and outputs define edge connection points
        inputs: [
          { id: `${id}-prompt`, label: "prompt" },
          { id: `${id}-context`, label: "context" }, // optional extra input
        ],
        outputs: [
          { id: `${id}-response`, label: "response" },
          { id: `${id}-log`, label: "log" }, // optional extra output
        ],
        children: (
          <div>
            <p>This node represents a Large Language Model.</p>
            <p>You can connect a prompt input and get a response output.</p>
          </div>
        ),
      }}
    />
  );
}
