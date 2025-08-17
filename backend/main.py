# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from collections import deque, defaultdict

app = FastAPI(title="VectorShift Assessment Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: Optional[str] = None
    data: Optional[Dict[str, Any]] = None

class Edge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    indeg = defaultdict(int)
    adj = defaultdict(list)
    node_ids = set(n.id for n in nodes)
    for e in edges:
        if e.source not in node_ids or e.target not in node_ids:
            continue
        adj[e.source].append(e.target)
        indeg[e.target] += 1
        indeg.setdefault(e.source, indeg.get(e.source, 0))
    q = deque([n for n in node_ids if indeg.get(n, 0) == 0])
    visited = 0
    while q:
        u = q.popleft()
        visited += 1
        for v in adj.get(u, []):
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)
    return visited == len(node_ids)

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/pipelines/parse")
def parse_pipeline(p: Pipeline):
    num_nodes = len(p.nodes)
    num_edges = len(p.edges)
    dag = is_dag(p.nodes, p.edges)
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": dag}
