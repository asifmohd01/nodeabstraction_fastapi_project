// src/nodes/APINode.js
import React, { useState } from "react";
import BaseNode from "./BaseNode";

export default function APINode({ id, data }) {
  const [url, setUrl] = useState(data?.url || "");
  const [method, setMethod] = useState(data?.method || "GET");
  const [body, setBody] = useState(data?.body || "");
  const [response, setResponse] = useState("");

  const handleRequest = async () => {
    try {
      const options = {
        method,
        headers: { "Content-Type": "application/json" },
        ...(method === "POST" && body
          ? { body: JSON.stringify(JSON.parse(body)) }
          : {}),
      };

      const res = await fetch(url, options);
      const text = await res.text();
      setResponse(text);
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  return (
    <BaseNode
      id={id}
      data={{
        title: "API Request",
        subtitle: method,
        inputs: [
          { id: `${id}-url`, label: "url" },
          { id: `${id}-body`, label: "body" },
        ],
        outputs: [{ id: `${id}-resp`, label: "response" }],
        children: (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Enter API URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
            {method === "POST" && (
              <textarea
                placeholder="Enter JSON body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            )}
            <button
              onClick={handleRequest}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Run
            </button>
            {response && (
              <pre className="bg-gray-100 p-2 text-xs rounded max-h-40 overflow-auto">
                {response}
              </pre>
            )}
          </div>
        ),
      }}
    />
  );
}
