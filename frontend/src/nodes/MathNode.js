// src/nodes/MarkdownNode.js
import React, { useState, useEffect } from "react";
import BaseNode from "./BaseNode";

export default function MarkdownNode({ id, data }) {
  const [inputText, setInputText] = useState(data?.md || "");
  const [htmlOutput, setHtmlOutput] = useState(inputText); // simple placeholder for output

  const subtitle = data?.subtitle || "render";

  // Update output whenever input changes
  useEffect(() => {
    // For now, just pass the text as-is
    setHtmlOutput(inputText);
  }, [inputText]);

  return (
    <BaseNode
      id={id}
      data={{
        title: "Markdown",
        subtitle,
        inputs: [
          {
            id: `${id}-md`,
            label: "Markdown Input",
            value: inputText,
            onChange: (val) => setInputText(val), // edge-ready input update
          },
        ],
        outputs: [
          {
            id: `${id}-html`,
            label: "HTML Output",
            value: htmlOutput, // can be sent to connected nodes
          },
        ],
        children: (
          <div>
            Converts <strong>Markdown</strong> text to <strong>HTML</strong>.
            <pre
              style={{
                marginTop: "8px",
                padding: "4px",
                border: "1px solid #ccc",
                whiteSpace: "pre-wrap",
              }}
            >
              {htmlOutput}
            </pre>
          </div>
        ),
      }}
    />
  );
}
