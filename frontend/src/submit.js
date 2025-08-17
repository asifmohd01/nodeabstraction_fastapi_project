// src/submit.js
import React, { useState } from "react";

export const SubmitButton = ({ nodes = [], edges = [] }) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const resp = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });
      const data = await resp.json();
      alert(
        `Pipeline Report\n\nNodes: ${data.num_nodes}\nEdges: ${
          data.num_edges
        }\nDAG: ${data.is_dag ? "Yes" : "No"}`
      );
    } catch (e) {
      alert("Failed to submit: " + String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="button" onClick={onSubmit} disabled={loading}>
      {loading ? "Submitting..." : "Submit"}
    </button>
  );
};
