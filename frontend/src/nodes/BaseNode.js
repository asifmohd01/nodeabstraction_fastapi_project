// src/nodes/BaseNode.js
import React from "react";
import { Handle, Position } from "reactflow";

export default function BaseNode({ id, data }) {
  const {
    title = "Node",
    subtitle,
    inputs = [], // [{id, label}]
    outputs = [], // [{id, label}]
    children,
  } = data || {};

  return (
    <div className="node-card border rounded-lg bg-white shadow-md p-2">
      {/* Header */}
      <div className="node-header flex justify-between items-center mb-2">
        <div className="font-bold text-sm">{title}</div>
        {subtitle ? (
          <div className="badge text-xs bg-gray-200 px-2 py-1 rounded">
            {subtitle}
          </div>
        ) : null}
      </div>

      {/* Body Content */}
      <div className="node-body text-xs mb-2">{children}</div>

      {/* Input Handles (Left Side) */}
      <div className="flex flex-col gap-2 absolute left-[-8px] top-8">
        {inputs.map((h, idx) => (
          <div key={`in-${h.id}`} className="flex items-center gap-1">
            <Handle
              id={h.id}
              type="target"
              position={Position.Left}
              style={{ top: 0 }}
            />
            <span className="text-[10px]">{h.label}</span>
          </div>
        ))}
      </div>

      {/* Output Handles (Right Side) */}
      <div className="flex flex-col gap-2 absolute right-[-8px] top-8">
        {outputs.map((h, idx) => (
          <div key={`out-${h.id}`} className="flex items-center gap-1">
            <span className="text-[10px]">{h.label}</span>
            <Handle
              id={h.id}
              type="source"
              position={Position.Right}
              style={{ top: 0 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
