// src/nodes/MarkdownNode.js
import React, { useState, useEffect } from "react";
import BaseNode from "./BaseNode";
import { marked } from "marked"; // optional: convert markdown to HTML dynamically

export default function MarkdownNode({ id, data }) {
  const [html, setHtml] = useState("");
  const inputText = data?.md || "";
  const subtitle = data?.subtitle || "render";

  // Convert Markdown to HTML whenever input changes
  useEffect(() => {
    setHtml(marked(inputText));
  }, [inputText]);

  return (
    <BaseNode
      id={id}
      data={{
        title: "Markdown",
        subtitle,
        inputs: [
          { id: `${id}-md`, label: "Markdown Input", value: inputText },
        ],
        outputs: [
          { id: `${id}-html`, label: "HTML Output", value: html },
        ],
        children: (
          <div>
            Converts <strong>Markdown</strong> text to <strong>HTML</strong>.
            <div
              style={{ marginTop: "8px", padding: "4px", border: "1px solid #ccc" }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        ),
      }}
    />
  );
}
