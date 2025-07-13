import React from 'react';
import './GraphVisualizer.css';

const GraphVisualizer = ({ graph, algorithm, setAlgorithm }) => {
  return (
    <div className="graph-container">
      <div className="graph-canvas">
        <svg width="100%" height="100%" className="graph-svg" viewBox="0 0 800 300">
          {/* Edges */}
          {graph.edges.map((edge, index) => {
            const from = graph.nodes.find(n => n.id === edge.from);
            const to = graph.nodes.find(n => n.id === edge.to);
            return (
              <line
                key={index}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className="graph-edge"
              />
            );
          })}

          {/* Nodes */}
          {graph.nodes.map((node) => {
            let nodeClass = 'graph-node graph-node-unvisited';

            if (graph.current === node.id) {
              nodeClass = 'graph-node graph-node-current';
            } else if (graph.visited.includes(node.id)) {
              nodeClass = 'graph-node graph-node-visited';
            }

            return (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  className={nodeClass}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  className="graph-node-text"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="graph-controls">
        <div className="algorithm-selector">
          <label className="algorithm-label">Algorithm: </label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="algorithm-select"
          >
            <option value="bfs">BFS (Breadth-First Search)</option>
            <option value="dfs">DFS (Depth-First Search)</option>
          </select>
        </div>

        <div className="path-display">
          <strong>Path:</strong> {graph.path.map(id => graph.nodes.find(n => n.id === id)?.label).join(' → ')}
        </div>
      </div>
    </div>
  );
};

export default GraphVisualizer;
