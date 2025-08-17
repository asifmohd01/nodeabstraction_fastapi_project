// src/nodes/TextNode.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import BaseNode from "./BaseNode";
import { Position, useReactFlow } from "reactflow"; // removed Handle

const VAR_RE = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

export default function TextNode({ id, data }) {
  const [value, setValue] = useState(data?.value || "");
  const [vars, setVars] = useState([]);
  const [size, setSize] = useState({ w: 260, h: 140 });
  const taRef = useRef(null);
  const { setNodes } = useReactFlow();

  // detect variables {{var}}
  useEffect(() => {
    const found = new Set();
    let m;
    while ((m = VAR_RE.exec(value)) !== null) found.add(m[1]);
    setVars([...found]);
  }, [value]);

  // autosize textarea & node
  useEffect(() => {
    if (!taRef.current) return;
    const TA = taRef.current;
    TA.style.height = "0px";
    TA.style.height = TA.scrollHeight + "px";
    const lines = TA.value.split("\n");
    const longest = lines.reduce((a, b) => (b.length > a ? b.length : a), 0);
    const w = Math.min(520, Math.max(260, longest * 7 + 40));
    const h = Math.min(420, Math.max(140, TA.scrollHeight + 80));
    setSize({ w, h });
  }, [value]);

  // push updates back into node data for edges
  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, value } } : n))
    );
  }, [value, id, setNodes]);

  const inputs = useMemo(
    () => vars.map((name) => ({ id: `var:${name}`, label: name })),
    [vars]
  );

  return (
    <BaseNode
      id={id}
      data={{
        title: "Text",
        subtitle: `${vars.length} var${vars.length === 1 ? "" : "s"}`,
        size,
        inputs: inputs.map((h) => ({
          ...h,
          type: "target",
          position: Position.Left,
          style: {
            background: "#555",
            width: 12,
            height: 12,
            borderRadius: "50%",
          },
        })),
        outputs: [
          {
            id: `${id}-out`,
            label: "Output",
            type: "source",
            position: Position.Right,
            style: {
              background: "green",
              width: 14,
              height: 14,
              borderRadius: "50%",
            },
            value,
          },
        ],
        children: (
          <div>
            <textarea
              ref={taRef}
              className="node-textarea"
              placeholder="Type here... use {{ variableName }} to create inputs"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ width: "100%", minHeight: 80 }}
            />
            {vars.length > 0 && (
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                }}
              >
                {vars.map((v) => (
                  <span key={v} className="badge">
                    {v}
                  </span>
                ))}
              </div>
            )}
          </div>
        ),
      }}
    />
  );
}
