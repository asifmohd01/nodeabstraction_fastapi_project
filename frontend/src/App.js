// src/App.js
import React, { useCallback, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  ConnectionMode,
} from "reactflow";
import "reactflow/dist/style.css";
import "./index.css";

import InputNode from "./nodes/InputNode";
import OutputNode from "./nodes/OutputNode";
import LLMNode from "./nodes/LLMNode";
import TextNode from "./nodes/TextNode";
import MathNode from "./nodes/MathNode";
import FilterNode from "./nodes/FilterNode";
import DelayNode from "./nodes/DelayNode";
import APINode from "./nodes/APINode";
import MarkdownNode from "./nodes/MarkdownNode";

import { SubmitButton } from "./submit";

// Initial nodes
const initialNodes = [
  { id: "in-1", type: "inputNode", position: { x: 100, y: 100 }, data: {} },
  {
    id: "text-1",
    type: "textNode",
    position: { x: 380, y: 100 },
    data: { value: "Hello {{name}}" },
  },
  { id: "out-1", type: "outputNode", position: { x: 700, y: 100 }, data: {} },
];

const initialEdges = [];

// Node types registration
const NODE_TYPES = {
  inputNode: InputNode,
  outputNode: OutputNode,
  llmNode: LLMNode,
  textNode: TextNode,
  mathNode: MathNode,
  filterNode: FilterNode,
  delayNode: DelayNode,
  apiNode: APINode,
  markdownNode: MarkdownNode,
};

// Toolbar for adding nodes
function Toolbar({ onAdd }) {
  const nodeList = [
    ["inputNode", "Input"],
    ["textNode", "Text"],
    ["llmNode", "LLM"],
    ["mathNode", "Math"],
    ["filterNode", "Filter"],
    ["delayNode", "Delay"],
    ["apiNode", "API"],
    ["markdownNode", "Markdown"],
    ["outputNode", "Output"],
  ];

  return (
    <div className="toolbar">
      <h3>Nodes</h3>
      <div className="group">
        {nodeList.map(([type, label]) => (
          <button key={type} className="node-btn" onClick={() => onAdd(type)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodeTypes = useMemo(() => NODE_TYPES, []);

  // Add edges
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            animated: true,
            style: { stroke: "#007bff", strokeWidth: 2 },
          },
          eds
        )
      ),
    [setEdges]
  );

  // Add new node dynamically
  const onAdd = (type) => {
    const id = `${type}-${Math.random().toString(36).slice(2, 8)}`;
    const x = 100 + Math.random() * 600;
    const y = 100 + Math.random() * 400;

    const newNodeData = { label: type, value: "" };
    setNodes((nds) =>
      nds.concat({ id, type, position: { x, y }, data: newNodeData })
    );
  };

  return (
    <div className="canvas-shell">
      <Toolbar onAdd={onAdd} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        deleteKeyCode={["Backspace", "Delete"]}
      >
        <MiniMap
          nodeStrokeWidth={3}
          nodeColor={(node) => {
            switch (node.type) {
              case "inputNode":
                return "green";
              case "outputNode":
                return "blue";
              case "llmNode":
                return "purple";
              case "textNode":
                return "#f39c12";
              case "mathNode":
                return "#e74c3c";
              default:
                return "#999";
            }
          }}
        />
        <Controls />
        <Background gap={16} color="#aaa" />
        <div
          style={{ position: "absolute", right: 16, bottom: 16, zIndex: 10 }}
        >
          {/* Pass current nodes & edges to SubmitButton */}
          <SubmitButton nodes={nodes} edges={edges} />
        </div>
      </ReactFlow>
    </div>
  );
}
