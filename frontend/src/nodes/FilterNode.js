// src/nodes/FilterNode.js
import React from "react";
import { Handle, Position } from "reactflow";
import BaseNode from "./BaseNode";

export default function FilterNode({ id, data }) {
  return (
    <BaseNode
      id={id}
      data={{
        title: "Filter",
        subtitle: data?.rule || "contains",
        children: (
          <div className="text-sm text-gray-500">
            Filters passing data (demo).
          </div>
        ),
      }}
    >
      {/* Input Handles */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-in`}
        style={{ top: "40%", background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-rule`}
        style={{ top: "70%", background: "#555" }}
      />

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-out`}
        style={{ top: "50%", background: "#0f62fe" }}
      />
    </BaseNode>
  );
}
