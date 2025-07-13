import React from 'react';
import './SortingVisualizer.css';

const SortingVisualizer = ({
  array,
  comparing,
  swapping,
  sorted,
  algorithm,
  setAlgorithm,
  generateArray,
}) => {
  console.log('SortingVisualizer render - array:', array, 'length:', array.length);

  return (
    <div className="sorting-container">
      {/* Bars Display */}
      <div className="bars-container">
        {array.length === 0 ? (
          <div className="empty-state">
            Click "Generate New Array" to start
          </div>
        ) : (
          array.map((value, index) => {
            let bgColor = '#3b82f6';
            let borderColor = '#2563eb';

            if (sorted.includes(index)) {
              bgColor = '#22c55e';
              borderColor = '#16a34a';
            } else if (swapping.includes(index)) {
              bgColor = '#ef4444';
              borderColor = '#dc2626';
            } else if (comparing.includes(index)) {
              bgColor = '#f59e0b';
              borderColor = '#d97706';
            }

            return (
              <div
                key={index}
                className={`bar ${sorted.includes(index) ? 'bar-sorted' : swapping.includes(index) ? 'bar-swapping' : comparing.includes(index) ? 'bar-comparing' : 'bar-unsorted'}`}
                style={{
                  height: `${value}px`,
                  width: '20px'
                }}
                title={`Value: ${value}`}
              >
                {value}
              </div>
            );
          })
        )}
      </div>

      {/* Controls */}
      <div className="controls-container">
        <div className="algorithm-selector">
          <label className="algorithm-label">Algorithm:</label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="algorithm-select"
          >
            <option value="bubble">Bubble Sort</option>
            <option value="quick">Quick Sort</option>
          </select>
        </div>

        <button
          onClick={() => {
            console.log('Generate New Array button clicked');
            generateArray();
          }}
          className="generate-button"
        >
          Generate New Array
        </button>
      </div>
    </div>
  );
};

export default SortingVisualizer;
