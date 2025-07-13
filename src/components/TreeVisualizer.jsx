import React from 'react';
import './TreeVisualizer.css';

const TreeVisualizer = ({ tree, algorithm, setAlgorithm }) => {
  return (
    <div className="tree-container">
      <div className="tree-canvas">
        <svg width="100%" height="100%" className="tree-svg" viewBox="0 0 800 400">
          {/* Edges */}
          {tree.nodes.map((node) => {
            if (node.parent !== null) {
              const parent = tree.nodes.find(n => n.id === node.parent);
              return (
                <line
                  key={`${node.parent}-${node.id}`}
                  x1={parent.x}
                  y1={parent.y}
                  x2={node.x}
                  y2={node.y}
                  className="tree-edge"
                />
              );
            }
            return null;
          })}

          {/* Nodes */}
          {tree.nodes.map((node) => {
            let nodeClass = 'tree-node tree-node-unvisited';

            if (tree.current === node.id) {
              nodeClass = 'tree-node tree-node-current';
            } else if (tree.visited.includes(node.id)) {
              nodeClass = 'tree-node tree-node-visited';
            }

            return (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="15"
                  className={nodeClass}
                />
                <text
                  x={node.x}
                  y={node.y + 4}
                  className="tree-node-text"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="tree-controls">
        <div className="algorithm-selector">
          <label className="algorithm-label">Algorithm: </label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="algorithm-select"
          >
            <option value="bfs">BFS (Level Order)</option>
            <option value="dfs">DFS (Pre-order)</option>
            <option value="postorder">Post-order</option>
            <option value="inorder">In-order</option>
          </select>
        </div>

        <div className="path-display">
          <strong>Path:</strong> {tree.path.map(id => tree.nodes.find(n => n.id === id)?.label).join(' → ')}
        </div>
      </div>
    </div>
  );
};

export default TreeVisualizer;
