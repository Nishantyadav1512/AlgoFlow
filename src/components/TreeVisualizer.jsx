import React from 'react';

const TreeVisualizer = ({ tree, algorithm, setAlgorithm }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '24px',
      padding: '24px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{ 
        width: '100%', 
        height: '600px', 
        border: '2px solid #e5e7eb', 
        borderRadius: '8px',
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <svg width="100%" height="100%" style={{ borderRadius: '8px' }} viewBox="0 0 800 400">
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
                  stroke="#9ca3af"
                  strokeWidth="3"
                />
              );
            }
            return null;
          })}

          {/* Nodes */}
          {tree.nodes.map((node) => {
            let fillColor = '#3b82f6';
            let strokeColor = '#2563eb';
            
            if (tree.current === node.id) {
              fillColor = '#ef4444';
              strokeColor = '#dc2626';
            } else if (tree.visited.includes(node.id)) {
              fillColor = '#22c55e';
              strokeColor = '#16a34a';
            }

            return (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="15"
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth="3"
                  style={{ transition: 'all 0.3s ease' }}
                />
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        padding: '16px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#374151' }}>Algorithm: </label>
          <select 
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              backgroundColor: 'white',
              color: '#374151',
              cursor: 'pointer'
            }}
          >
            <option value="bfs">BFS (Level Order)</option>
            <option value="dfs">DFS (Pre-order)</option>
            <option value="postorder">Post-order</option>
            <option value="inorder">In-order</option>
          </select>
        </div>
        
        <div style={{ fontSize: '14px', color: '#6b7280' }}>
          <strong>Path:</strong> {tree.path.map(id => tree.nodes.find(n => n.id === id)?.label).join(' → ')}
        </div>
      </div>
    </div>
  );
};

export default TreeVisualizer;
