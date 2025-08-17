// src/nodes/OutputNode.js
import React, { useState, useEffect } from "react";
import BaseNode from "./BaseNode";

export default function OutputNode({ id, data }) {
  const title = data?.title || "Output";
  const [inputValue, setInputValue] = useState(data?.input || "");

  // Update value whenever data changes (for edge updates)
  useEffect(() => {
    setInputValue(data?.input || "");
  }, [data?.input]);

  return (
    <BaseNode
      id={id}
      data={{
        title,
        subtitle: "sink",
        inputs: [
          {
            id: `${id}-input`,
            label: "in",
            value: inputValue,
            onChange: (val) => setInputValue(val), // edge-ready
          },
        ],
        outputs: [],
        children: (
          <div>
            Final destination of data.
            <pre
              style={{
                marginTop: "8px",
                padding: "4px",
                border: "1px solid #ccc",
                whiteSpace: "pre-wrap",
              }}
            >
              {inputValue}
            </pre>
          </div>
        ),
      }}
    />
  );
}
