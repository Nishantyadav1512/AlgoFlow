import React from 'react';
import './Legend.css';

const Legend = ({ type }) => {
  const getLegendItems = () => {
    if (type === 'sorting') {
      return [
        { color: '#3b82f6', label: 'Unsorted' },
        { color: '#f59e0b', label: 'Comparing' },
        { color: '#ef4444', label: 'Swapping' },
        { color: '#22c55e', label: 'Sorted' },
      ];
    }

    if (type === 'graph' || type === 'tree') {
      return [
        { color: '#3b82f6', label: 'Unvisited' },
        { color: '#ef4444', label: 'Current' },
        { color: '#22c55e', label: 'Visited' },
      ];
    }

    return [];
  };

  return (
    <div className="legend-container">
      <h4 className="legend-title">Legend:</h4>
      <div className="legend-items">
        {getLegendItems().map((item, index) => (
          <div key={index} className="legend-item">
            <div
              className={`legend-color ${type === 'sorting' ? 'legend-color-sorting' : `legend-color-${type}`}`}
              style={{ backgroundColor: item.color }}
            />
            <span className="legend-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
